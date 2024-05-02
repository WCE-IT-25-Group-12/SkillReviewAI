import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="627696384756-jo50qt9mjsvjakmv3dden5o76tcj3go4.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    
  </React.StrictMode>,
)
