import React, { useEffect, useState } from 'react';
import './cabecera.css';
import './cabecera_movil.css';
import './versos.css';
import './HamburguerMenu.css';
import logo from '../../assets/images/poleana.png';
import Sesion from '../Sesion/Sesion';
import LoginModal from '../Sesion/LoginModal';
import LoginButton from '../Sesion/LoginButton';
import ModoLink from '../Poleana/ModoLink';

import TuSaldo from '../Saldo/TuSaldo';


import dinero from '../../assets/images/dinero.gif';
import texto from '../../assets/images/texto.jpg';
import topbar from '../../assets/images/topbar.png';
import acumulado from '../../assets/images/acumulado.png';
import imagen_texto from '../../assets/poelana_el_juego_de_la_libertad.png';
import menuimagen from '../../assets/menu.png';
import TuSaldoFormateado from '../Saldo/TuSaldoFormateado';

const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;


function Cabecera() {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };



  const [ menux , setMenux ] = useState( false )

  const toggleMenux = () => {
      setMenux( !menux )
  }


  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css?family=Lato';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
      icon.addEventListener('click', (event) => {
        icon.classList.toggle("open");
      });
    });
  });

  return (
    <div>
    <div className="fixed-sections wrapper">       



 
    
<header className='Cabecera'>
        <div className="overlayMarca">

        <div className="imagen_textox"><img src={imagen_texto} width="55%" height="77px"></img></div>
        <button 
            onClick={ toggleMenux }
         className="Cabecera-button"><img src={menuimagen} width="60px"></img>
        <svg className='Cabecera-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
        </button>

          <div className="marca">

            <h1>Poleana.Mx</h1>
          
          </div>
        </div>
        
        <div className="logo avatarLogo brilloCont">
          <a href="/"><img className="encimaLogoFlotante brillando" src={logo} alt="Logo de Poleana" /></a>
        </div>

        <div className="acumulado">
          <span className='adquirirSaldo'><a href='/cargar' className='adquirirSaldoLink'>Adquirir Saldo</a></span>
          <img src={acumulado} alt="Acumulado" />
        </div>
        
        <div className="acumuladoContainer">
          <span className="acumulado acumulado_texto">Tu Acumulado:</span>
          <span className="acumulado acumulado_saldo"><span className="moneda">$  </span> <TuSaldoFormateado /> </span>
        </div>
      


      
      
      <div className="barra-top-menu">
        <nav className={ `nav-bar nav Cabecera-nav ${ menux ? 'isActive' : '' }` }>
          <ul className="Cabecera-ul nav">
            <li className="Cabecera-li"><a href="/" className="Cabecera-a">Inicio</a></li>
            <li className="Cabecera-li"><ModoLink className="Cabecera-a" /></li>
            <li className="Cabecera-li"><a href="/invierte" className="Cabecera-a">Invierte y Gana</a></li>
            <li className="Cabecera-li"><a href="/contexto" className="Cabecera-a">Gana Gratis</a></li>
            <li className="Cabecera-li"><Sesion className="Cabecera-a" /></li>
          </ul>
        </nav>

        
        
      </div>
      
      
      </header>
      
    </div>
    
    <div className='separador'></div>
      <div className='separador'></div>


    </div>


  );
}

export default Cabecera;
