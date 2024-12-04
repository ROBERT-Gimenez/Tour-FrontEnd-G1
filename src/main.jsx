import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './utils/GlobalContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ContextProvider>
        <App/>
      </ContextProvider>
  </BrowserRouter>
)
