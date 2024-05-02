import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'normalize.css'
import './index.css'
import './context/theme.css'
import { PopUpContextProvider } from '@/context/PopUpContext/PopUpContext.tsx'
import { NotificationContextProvider } from '@/context/NotificationContext/NotificationContext.tsx'
import { FirebaseContextProvider } from './context/FirebaseContext/FirebaseContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopUpContextProvider>
      <NotificationContextProvider>
        <FirebaseContextProvider>
          <App />
        </FirebaseContextProvider>
      </NotificationContextProvider>
    </PopUpContextProvider>
  </React.StrictMode>,
)
