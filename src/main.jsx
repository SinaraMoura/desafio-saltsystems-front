import React from 'react'
import ReactDOM from 'react-dom/client'
import MainRouter from './router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRouter />
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
)
