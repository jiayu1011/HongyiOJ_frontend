import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import http from "./utils/http";
import {IProps} from "./config/interfaces";


export const App:React.FC<IProps> = () => {
  const [count, setCount] = useState(0)

  const [member, setMember] = useState('');

  function getMember(){
    http.post('getTeam/').then(res => {
      console.log(res);
      setMember(res.data.team);

    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          <button onClick={() => getMember}>getMember</button>
        </p>
        <p>{member}</p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

