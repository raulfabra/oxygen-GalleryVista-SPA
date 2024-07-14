import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/styles/styles.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import MyFavorites from './pages/MyFavorites.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { reduxStore } from './app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/favorites' element={<MyFavorites />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
