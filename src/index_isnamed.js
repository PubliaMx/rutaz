import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import useIsNamed from './Hooks/isNamed';
//import Nombrado from './Components/NombrarUsuario';
import reportWebVitals from './reportWebVitals';
import NombrarUsuario from './Components/NombrarUsuario';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NombrarUsuario />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();