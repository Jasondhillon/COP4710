import React, { Component } from 'react'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import store from './store'
import AppNavbar from './components/AppNavbar'
import Location from './components/Location'

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="App">
        <video className="videoparallax" loop muted >
          <source src={require('./source.webm')} type="video/webm"/>
        </video>
          <AppNavbar/>
          <Location />
        </div>
      </Provider>
    )
  }
}

export default App;
