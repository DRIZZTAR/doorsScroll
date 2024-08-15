import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import Overlay from './components/Overlay'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
    <img 
      src="/logo.svg" 
      alt="Logo" 
      style={{ position: 'absolute', bottom: 25, left: 30, width: 60 }} 
    />
  </>
)