import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/styles/styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { reduxStore } from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
