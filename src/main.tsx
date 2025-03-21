import 'normalize.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@Style'
import '@Theme'
import '@Window'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@App/index'

console.clean();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
