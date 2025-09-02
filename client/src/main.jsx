import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from './login.jsx'
import Home from './home.jsx'
import Create from './create.jsx'

const router = createBrowserRouter( [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',   
    element:<Login />
  },
  {
    path: '/create',
    element:<Create />

  },

] );

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

  </StrictMode>,
)
