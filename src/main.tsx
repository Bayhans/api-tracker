import React from 'react'
import ReactDOM from 'react-dom/client'
import ApiTracker from './ApiTracker'
import DataProvider from './components/DataProvider'
import './style.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <ApiTracker/>
    </DataProvider>
  </React.StrictMode>
)
