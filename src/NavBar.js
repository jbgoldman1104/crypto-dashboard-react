import React from 'react';
import styled, {css} from 'styled-components'
const Logo = styled.div`
  font-size:1.5em;
`
const ControlButton = styled.div`
  cursor: pointer;
  line-height: 30px;
${props=>props.active && css`
  text-shadow: 0px 0px 60px #03ff03;
`}
`
const NavBar = styled.div`
  margin-bottom:40px;
  display:grid;
  grid-template-columns:180px auto 100px 100px;
`
export default function(){
    return <NavBar>
          <Logo>
            CryptoDash
          </Logo>
          <div></div>
          {!this.state.firstVisit && this.state.favorites && this.state.favorites.length >0 &&<ControlButton onClick={()=>{this.setState({page:'dashboard'})}} active={this.displayingDashboard()}>
            Dashboard
          </ControlButton>}
          <ControlButton onClick={()=>{this.setState({page:'settings'})}} active={this.displayingSettings()}>
            Settings
          </ControlButton>
        </NavBar>
}