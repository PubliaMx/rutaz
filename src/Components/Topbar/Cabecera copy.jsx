//import React from 'react';
import './cabeceras.css';
import './versos.css';
import ModoLink from '../Poleana/ModoLink';
import LoginModal from '../Sesion/LoginModal';
import LoginButton from '../Sesion/LoginButton';
import Sesion from '../Sesion/Sesion';
import logo from '../../assets/images/logo.png';
import dinero from '../../assets/images/dinero.gif';
import texto from '../../assets/images/texto.jpg';
import topbar from '../../assets/images/topbar.png';
import acumulado from '../../assets/images/acumulado.png';

import React, { useEffect, useState } from 'react';

function Cabecera() {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Lato';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="fixed-sections">
      <header>
        <div className="overlayMarca">

          <div className="marca">

            <h1>Poleana.Mx</h1>
          
          </div>
        </div>

        <div className="logo avatarLogo brilloCont">
          <a href="/"><img className="encimaLogoFlotante brillando" src={logo} alt="Logo de Poleana" /></a>
        </div>

        <div className="acumulado">
          <img src={acumulado} alt="Acumulado" />
        </div>
        
        <div className="acumuladoContainer">
          <span className="acumulado acumulado_texto">Tu Acumulado:</span>
          <span className="acumulado acumulado_saldo"><span className="moneda">$  </span> 0 </span>
        </div>
      
      </header>
      
      <div className="barra-top-menu">
        <nav>
          <ul className="Cabecera-ul nav">
            <li className="Cabecera-li"><a href="http://localhost/juego/home.html" className="Cabecera-a">Inicio</a></li>
            <li className="Cabecera-li"><ModoLink className="Cabecera-a" /></li>
            <li className="Cabecera-li"><a href="http://localhost:3000/invierte" className="Cabecera-a">Invierte y Gana</a></li>
            <li className="Cabecera-li"><a href="http://localhost:3000/contexto" className="Cabecera-a">Contexto</a></li>
            <li className="Cabecera-li"><Sesion className="Cabecera-a" /></li>
          </ul>
        </nav>
        
      </div>
    </div>
  );
}

export default Cabecera;
