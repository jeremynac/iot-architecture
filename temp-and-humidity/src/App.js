import './App.css'
import { Page } from './components/Page'
import React from 'react'
require('dotenv').config()

function App () {
  return (
    <div className="App">
      <Page />
    </div>
  )
}

export default App
