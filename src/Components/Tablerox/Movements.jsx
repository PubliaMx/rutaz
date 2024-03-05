import React, { useEffect, useState } from 'react';
//import  './grid.css';
//import './display.css';
//import './navbar.css';
/*
import $ from 'jquery';
import './inicializar.js';
import './play.js';
import './dados.js';
import './display.js';
*/



function Poleana() {
  const [casillas, setCasillas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:80/juego/poleana_api.php?obj=board');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCasillas(data); // Assuming data is an array of casillas
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []); // Empty dependency array means this effect runs once after the component mounts

  return (
    <div className='posicionando'>
    <div id="hijo">
      <section className="grid-layers">
        {casillas.map((casilla, index) => (
          <div key={index}>
            <span dangerouslySetInnerHTML={{__html: `${casilla.apertura}`}}></span>
            <span dangerouslySetInnerHTML={{__html: `${casilla.cierre}`}}></span>
          </div>
        ))}
      </section>
    </div>

    </div>

  );
}

export default Poleana;
