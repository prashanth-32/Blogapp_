import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { UserContextProvider } from './Pages/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </UserContextProvider>
  </StrictMode>,
)
