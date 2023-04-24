import React from 'react'
import styled, {css} from 'styled-components'
import { subtleBoxShadow, greenBoxShadow,redBoxShadow, lightBlueBackground } from './Style';

export const CoinGrid = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr 1fr;
    grid-gap:15px;
    ${props=>props.count && css`
        grid-template-columns:repeat(${props.count >5 ? props.count:5}, 1fr);
    `}
    margin-top:15px;
`
export const CoinTile = styled.div`
    ${subtleBoxShadow}
    ${lightBlueBackground}
    padding:10px;
    ${props=>!props.favorite && css`
    &:hover{
        cursor:pointer;
        ${greenBoxShadow}
    }
    `}
    ${props=>props.dashboardFavorite && css`
        ${greenBoxShadow}
        &:hover{
            pointer-events:none;
        }
    `}
    
    ${props=>props.favorite && css`
    &:hover{
        cursor:pointer;
        ${redBoxShadow} !important;
    }
    `}
    ${props=>props.choosen && !props.favorite && css`
        pointer-events:none;
        opacity:0.4;
    `}
`

export const CoinHeaderGrid = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr;
`
export const CoinSymbol = styled.div`
    justify-self: right;
`
const DeleteIcon = styled.div`
    justify-self: right;
    display:none;
    ${CoinTile}:hover & {
        display:block;
        color:red;
    }
`


export default function(favorites=false){
    console.log(this.state.favorites)
    let coinKeys = favorites ? this.state.favorites:
    ((this.state.filteredCoins && Object.keys(this.state.filteredCoins)) || (Object.keys(this.state.coinList).slice(0,100)))
    return <CoinGrid count={favorites && this.state.favorites && this.state.favorites.length}>
        {coinKeys ? coinKeys.map((coinKey,index)=>
            <CoinTile choosen={this.isInFavorites(coinKey)} favorite={favorites} key={index} onClick={favorites ? ()=>{this.removeCoinFromFavorites(coinKey)}:()=>{this.addCointToFavorites(coinKey)}}>
                <CoinHeaderGrid>
                    <div>{this.state.coinList[coinKey].CoinName}</div>
                    {favorites ? 
                    <DeleteIcon>X</DeleteIcon>:
                    <CoinSymbol>{this.state.coinList[coinKey].Symbol}</CoinSymbol>}
                </CoinHeaderGrid>
            <img style={{height:'50px'}} alt="coin icon" src={`http://cryptocompare.com/${this.state.coinList[coinKey].ImageUrl}`}/>
            </CoinTile>
        ):null}
    </CoinGrid>
}