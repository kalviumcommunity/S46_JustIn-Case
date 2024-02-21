import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Entity from './components/Entity'

function App() {

  return (
    <div className='App'>
    <header>
      <div className='logo-sign' >
      <h1>
        JustIn Case
      </h1>
      <button id='logbtn'>
        Login/SignUp
      </button>
      </div>

     <p>
     The idea of the project Justin Case is to create a comprehensive list of dad jokes which will entertain the readers. This list will serve as a go-to resource just in case anyone is in a need for a good chuckle or eye-roll-inducing pun.
     </p>
      <hr />
    </header>
    <div className='body'>
    <Entity/>
    </div>
    </div>
  )
}

export default App
