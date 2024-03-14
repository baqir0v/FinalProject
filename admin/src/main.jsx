import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import DarkmodeProvider from './Context/darkmodeContext.jsx'
import { UserProvider } from './Context/userContext.jsx'
import {HelmetProvider} from "react-helmet-async"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <DarkmodeProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </DarkmodeProvider>
    </UserProvider>
  </BrowserRouter>,
)
