import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Citric from 'citric';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Citric>
      <App />
    </Citric>
  </React.StrictMode>
)
