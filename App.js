// App.js

import React from 'react'
import { Provider } from 'react-redux'
import Store from './Store/ConfigureStore'
import Navigation from './Navigation/Navigation'


export default class App extends React.Component {
  render() {
    console.log("movies-reloaded v1.5.1");
    return (
      <Provider store={Store}>
      <Navigation/>
      </Provider>
    )
  }
}