import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@App/App.tsx'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'normalize.css'
import '@/index.css'
import '@Context/theme.css'
import { PopUpContextProvider } from '@Context/PopUpContext/PopUpContext.tsx'
import { NotificationContextProvider } from '@Context/NotificationContext/NotificationContext.tsx'
import { FirebaseContextProvider } from '@Context/FirebaseContext/FirebaseContext';
import { UtilsContextProvider } from '@Context/UtilsContext/UtilsContext';
import '@/window.ts';

console.clean();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PopUpContextProvider>
      <NotificationContextProvider>
        <FirebaseContextProvider>
          <UtilsContextProvider>
            <App />
          </UtilsContextProvider>
        </FirebaseContextProvider>
      </NotificationContextProvider>
    </PopUpContextProvider>
  </React.StrictMode>,
)
