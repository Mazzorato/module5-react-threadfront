import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //j'ai enlevé le strict mode pour eviter le double appel des useEffect en developpement
  // <StrictMode>
    <App />
  
)
