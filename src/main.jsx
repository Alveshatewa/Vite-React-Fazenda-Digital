import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './Contexts/AuthContext/AuthContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(

   <AuthProvider>
      <App />
   </AuthProvider>,

   <StrictMode>
      < App />
  </StrictMode>,
)
