import React from 'react';
import parse from 'html-react-parser';
import './Poleana.css';
//import {width} from '../AnchoPagina';

import useWindowWidth from '../AnchoPagina';


function Poleana() {

  

  const width = useWindowWidth();
  console.log('componente poleana cargado');
  console.log(width);
  
  let ancho;
  let alto;

  if (width < 800) {
    ancho = 480;
    alto = 460;
    console.log('fue menor');
  }

  else {
    ancho = 800;
    alto = 800;
  }
  
  //const htmlString = '<iframe src="http://localhost/juego/" width="1000" height="600">';
  //const parsedHtml = parse(htmlString);

  return (
    
    <div className='madre'>
  <br></br>
    <iframe
    title="test"
    /* className="zoomed-iframe" */
    src="http://localhost/juego/juega.php?color=verde"
    sandbox="allow-forms allow-scripts allow-same-origin"
    allow="microphone; camera"
    width={ancho}
    height={alto}
  />
  </div>
  );
}

export default Poleana;

