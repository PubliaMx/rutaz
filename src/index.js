import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
//import './index.css';
//import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Topbar from './Components/Topbar/Cabecera';
import Cabecera from './Components/Topbar/HamburguerMenu';
import Home from './routes/Home';
import Jugar from './routes/Jugar';
import InvierteRoute from './routes/Calculadora';
import SaldoRoute from './routes/Saldo';
import CuentaRoute from './routes/Cuenta';
import CargaExitosa from './routes/CargaExitosa';

//import ChatRoute from './routes/Chat';
import { Auth0Provider } from '@auth0/auth0-react';
import ChatRoute from './routes/Chat';
import CargaExitosaRoute from './routes/CargaExitosa';
//import MovementsRoute from './routes/Movements';
//import Topbar from './Components/Topbar/Topbar';
//import "./styles/global.css";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: '/contexto',
    element: <h1>Acá va el contexto</h1>,
  },
  {
    path: '/jugar',
    element: <Jugar />,
  },
  {
    path: '/saldo',
    element: <SaldoRoute />,
  },
  {
    path: '/cuenta',
    element: <CuentaRoute />,
  },
  {
    path: '/invierte',
    element: <InvierteRoute />,
  },
  {
    path: '/chat',
    element: <ChatRoute />,
  },
  {
    path: '/cargar',
    element: <SaldoRoute />,
  },
  {
    path: '/cargaExitosa',
    element: <CargaExitosaRoute />,
  }
  
]);

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const client = process.env.REACT_APP_AUTH0_CLIENT_ID;
const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

console.log('aplicación iniciada en dominio: '+domain)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider 
      domain={domain} 
      clientId={client} 
      redirectUri={window.location.origin}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);

//reportWebVitals();
