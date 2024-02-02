import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Context/userContext.jsx'
import DarkmodeProvider from './Context/darkmodeContext.jsx'
import "./Scss/color.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <DarkmodeProvider>
        <App />
      </DarkmodeProvider>
    </UserProvider>
  </BrowserRouter>,
)
