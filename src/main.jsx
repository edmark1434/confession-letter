import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import RouterConfig from './RouterConfig.jsx'  // Changed from App.jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  </StrictMode>,
)