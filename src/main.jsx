import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './components/Home.jsx'
import CustomerList from './components/customer.jsx'
import TrainingList from './components/training.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//import './index.css'


const router = createBrowserRouter([


  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customer",
        element: <CustomerList />,
      },
      {
        path: "training",
        element: <TrainingList />
      }
    ]
  }

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
