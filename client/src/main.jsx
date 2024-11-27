import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {CssBaseLine} from '@mui/material'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseLine/>
    <App />
  </StrictMode>,
)
