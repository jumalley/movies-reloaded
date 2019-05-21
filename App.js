// App.js

import React from 'react'
import Navigation from './Navigation/Navigation.js'

export default class App extends React.Component {
  render() {
    console.log("movies-reloaded v1.3.5");
    return (
      <Navigation/>
    )
  }
}