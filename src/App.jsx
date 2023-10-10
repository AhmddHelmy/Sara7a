import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import SendMessage from './Components/SendMessage/SendMessage';
import Notfound from './Components/Notfound/Notfound';
import CounterContextProvider from './Context/counter';
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/tokenContext';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';

function App() {
  let { setToken } = useContext(tokenContext)

  useEffect(
    () => {
      if (localStorage.getItem('userToken')) {
        setToken(localStorage.getItem('userToken'))
      }
    }, []
  )

  const routes = createBrowserRouter([{
    path: '', element: <Layout />, children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'profile', element: <ProtectedRoutes> <Profile /> </ProtectedRoutes> },
      { path: '*', element: <Notfound /> }
    ]
  }, { path: 'message/:userId', element: <SendMessage /> },
  ])
  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App;
