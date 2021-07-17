import React from 'react'
import { Router } from '@reach/router'
import Context from './Context'
import { GlobalStyle } from './styles/GlobalStyles'
import { Logo } from './components/Logo'
import { Home } from './pages/Home'
import { Detail } from './pages/Detail'
import { User } from './pages/User'
import { Favs } from './pages/Favs'
import { NotRegisteredUser } from './pages/NotRegisteredUser'
import { NavBar } from './components/NavBar'

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Logo />
      <Router>
        <Home path='/' />
        <Home path='/pet/:categoryId' />
        <Detail path='/detail/:detailId' />
      </Router>
      <Context.Consumer>
        {
          ({ isAuth }) => isAuth
            ? <Router><User path='/user' /><Favs path='/favs' /></Router>
            : <Router><NotRegisteredUser path='/user' /><NotRegisteredUser path='/favs' /></Router>
        }
      </Context.Consumer>
      <NavBar />
    </>
  )
}
