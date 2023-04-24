import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import NavBar from './NavBar'
import CoinList from './CoinList'
import cc from 'cryptocompare'
import _ from 'lodash'
import Search from './Search'
import {ConfirmButton} from './Button'
import fuzzy from 'fuzzy'
import Dashboard from './Dashboard'
import moment from 'moment'
const Content = styled.div``
const AppLayout = styled.div`
padding:40px;
`
export const CenterDiv = styled.div`
  display:grid;
  justify-content:center;
`
export const SelectedFav = styled.div`
  margin-top: 40px;
`
export const NotFound = styled.div`
  padding-left: 140px;
  color: red;
`
const checkFirstVisit=()=>{
  let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'))
  if(!cryptoDashData){
    return {
      firstVisit:true,
      page:'settings'
    }
  }
  let {favorites, currentFavorite} = cryptoDashData;
  return {
    favorites,
    currentFavorite
  }
}
const MAX_FAVORITES = 10
const TIME_UNITS =10
class App extends Component {
  state = {
    page: 'dashboard',
    notFound:false,
    favorites: ['ETH', 'BTC', 'XMR', 'DOGE', 'EOS'],
    timeInterval: 'months',
    ...checkFirstVisit()
  };
  componentDidMount=()=>{
    this.fetchHistorical()
    this.fetchCoins()
    this.fetchPrice()
  }
  validateFavorites=(coinList)=>{
    let validateFavorites=[]
    this.state.favorites.forEach(favorite=>{
      if(coinList[favorite]){
        validateFavorites.push(favorite)
      }
    })
    return validateFavorites
  }
  fetchPrice=async()=>{
    if(this.state.firstVisit) return
    let prices
    try{
      prices= await this.prices()
      //prices = prices.filter(item=>Object.keys(item).length)
    } catch(e){
      this.setState({error:true})
    }
    this.setState({prices})
  }
  fetchHistorical=async()=>{
    if(this.state.firstVisit) return
      let result = await this.historical()
      let historical=[{
        name:this.state.currentFavorite,
        data:result.map((ticker,index)=>[moment().subtract({[this.state.timeInterval]:TIME_UNITS - index}).valueOf(), ticker.USD])
      }]
      this.setState({historical})
  }
  historical=()=>{
    let promises =[]
    for(let units = TIME_UNITS; units>0; units--){
      promises.push(cc.priceHistorical(this.state.currentFavorite,['USD'], moment().subtract({[this.state.timeInterval]:units}).toDate()))
    }
    return Promise.all(promises)
  }
  prices=async ()=>{
    // let promises=[];
    // this.state.favorites.forEach(sym=>{
    //   promises.push(cc.priceFull(sym,'USD')
    //   )
    // })
    // return Promise.all(promises)
    let returnData =[];
    for(let i=0;i<this.state.favorites.length;i++){
      try{
        let priceData = await cc.priceFull(this.state.favorites[i], 'USD')
        returnData.push(priceData)
      } catch(e){
        console.warn('Fetch price error', e)
      }
    }
    return returnData
  }
  fetchCoins= async ()=>{
    let coinList = (await cc.coinList()).Data
    this.setState({coinList, favorites:this.validateFavorites(coinList)})
  }

  displayingDashboard = () =>this.state.page === 'dashboard'
  displayingSettings = () =>this.state.page === 'settings'
  firstVisitMessage=()=>{
    if(this.state.firstVisit){
      return <div>Welcome to CryptoDash, please select your favorite coins to begin.</div>
    }
  }
  confirmFavorites=()=>{
    let currentFavorite = this.state.favorites[0]
    this.setState({
      firstVisit:false,
      page:'dashboard',
      prices:null,
      currentFavorite,
      historical:null
    },()=>{
      this.fetchPrice()
      this.fetchHistorical()
    })
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites:this.state.favorites,
      currentFavorite
    }));
  }
  settingsContent =()=>{
    return <div>
      {this.firstVisitMessage()}
      <div>
      <SelectedFav>Selected Favorites</SelectedFav>  
      {CoinList.call(this, true)}
      <CenterDiv>
        {this.state.favorites && this.state.favorites.length >0 &&  <ConfirmButton onClick={this.confirmFavorites}>
        Confirm Favorites
      </ConfirmButton>}
      </CenterDiv>
      {Search.call(this)}
      {this.state.notFound && <NotFound>No coin found</NotFound>}
      {CoinList.call(this)}
      </div>
    </div>
  }
  loadingContent=()=>{
    if(!this.state.coinList){
      return <div>Loading coin...</div>
    }
    if(!this.state.firstVisit && !this.state.prices){
      return <div>Loading prices...</div>
    }
  }
  addCointToFavorites =(key)=>{
    let favorites = [...this.state.favorites]
    if(favorites.length < MAX_FAVORITES){
      favorites.push(key)
      this.setState({favorites})
    }
  }
  removeCoinFromFavorites=(key)=>{
    if(!this.state.favorites){
      this.setState({firstVisit:true})
    } else {
      let favorites = [...this.state.favorites]
      this.setState({favorites:_.pull(favorites, key)})
    }
    
  }
  isInFavorites =(key)=> _.includes(this.state.favorites,key)
  handleFilter=_.debounce((inputValue)=>{
    let coinSymbols = Object.keys(this.state.coinList)
    let coinNames = coinSymbols.map(sym=>this.state.coinList[sym].CoinName)
    let allStringsToSearch = coinSymbols.concat(coinNames)
    let fuzzyResults = fuzzy.filter(inputValue, allStringsToSearch, {}).map(result =>result.string)
    let filteredCoins = _.pickBy(this.state.coinList, (result, symkey)=>{
      let coinName = result.CoinName
      return _.includes(fuzzyResults, symkey) || _.includes(fuzzyResults, coinName)
    })
    if(filteredCoins && Object.keys(filteredCoins).length === 0 ){
      this.setState({notFound:true})
    } else {
      this.setState({notFound:false})
    }
    this.setState({filteredCoins})
  }, 100)
  filterCoins=(e)=>{
    let inputValue=_.get(e, 'target.value')
    if(!inputValue){
      this.setState({
        filteredCoins:null
      })
      return;
    }
    this.handleFilter(inputValue)
  }
  render() {
    return (
      <AppLayout>
        {NavBar.call(this)}
      {this.loadingContent() ||<Content>
        {this.displayingSettings() && this.settingsContent()}
        {this.displayingDashboard() && Dashboard.call(this)}
      </Content>}
    </AppLayout>
    );
  }
}

export default App;
