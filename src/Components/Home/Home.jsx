import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import acumulado from '../../assets/acumulado.png';
import poleana from '../../assets/poleana.gif';
import Sesion from '../Sesion/Sesion';
import ModoLink from '../Poleana/ModoLink';
import dados from '../../assets/dados.gif';
import dinero from '../../assets/dinero.gif';   

function Home() {
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

        
      <div class="scrollable-sections">
        
        <div className='separador'><br></br><br></br></div>
  
          <div className="video-container">
        
            <img src={poleana} alt="GIF de Poleana"></img>
          </div>
    
            <section className="info">

                <div className="scrollable-sections">                
                
                    <div className="overlayCuadroMenu">

                        <div className="container">

    
                            <h3>
                                <span className="preverso">
                                    Juega
                                </span>
                                <div className="lista">
                                    <div className="item">
                                        Ahora
                                    </div>
                                    <div className="item">
                                        y Gana !!
                                    </div>
                                    <div className="item">
                                        ya !!
                                    </div>
                                    <div className="item">
                                        a la Poleana
                                    </div>
                                    <div className="item">
                                        Libertad
                                    </div>
                                    <div className="item">
                                        a la Mexicana
                                    </div>
                    
                                </div>
                            </h3>
                        </div>


                        <div className="dado gif-container">
                            <img src={dados} alt="GIF 1"></img>
                            <img src={dinero} alt="GIF 2"></img>
                        </div>


                        

                        





                        <div className="contenedorLuminoso bajar">
                            <div className="bordeLuminoso">

                               <h2 className="canal"> <a href="#" class="links">Gran Torneo Semanal</a> </h2>

                            </div>    

                        </div>


                        <div className="contenedorLuminoso">
                            <div className="bordeLuminosoInverso">

                               <h2 className="canal"> <a href="#">Encontrartrar Adversario en Chat</a> </h2>

                            </div>    

                        </div>


                        <div className="contenedorLuminoso">
                            <div className="bordeLuminoso">

                               <h2 className="canal"> <a href="#">Jugar Gratis (Mirando Anuncios) </a> </h2>

                            </div>    

                        </div>


                       
                    </div>
                

                <div className="cuerpo">

                        
            
                    <section className="info"> 
                        
                        

                        <div className="card">
                            <img src="como-jugar.jpg" alt="Cómo Jugar"></img>
                            <h2><a href="#">Cómo Jugar</a></h2>
                            <p>Aprende las reglas básicas de Poleana y conviértete en un maestro del juego.</p>
                        </div>
                        <div className="card">
                            <img src="historia.jpg" alt="Historia del Juego"></img>
                            <h2>Historia del Juego</h2>
                            <p>Descubre la fascinante historia detrás de Poleana y su evolución a lo largo del tiempo.</p>
                        </div>
                        <div className="card">
                            <img src="preguntas-frecuentes.jpg" alt="Preguntas Frecuentes"></img>
                            <h2>Preguntas Frecuentes</h2>
                            <p>Encuentra respuestas a las preguntas más comunes sobre Poleana.</p>
                        </div>
                    </section>

                    <section className="info">
                        <div className="card">
                            <img src="como-jugar.jpg" alt="Cómo Jugar"></img>
                            <h2>Cómo Jugar</h2>
                            <p>Aprende las reglas básicas de Poleana y conviértete en un maestro del juego.</p>
                        </div>
                        <div className="card">
                            <img src="historia.jpg" alt="Historia del Juego"></img>
                            <h2>Historia del Juego</h2>
                            <p>Descubre la fascinante historia detrás de Poleana y su evolución a lo largo del tiempo.</p>
                        </div>
                        <div className="card">
                            <img src="preguntas-frecuentes.jpg" alt="Preguntas Frecuentes"></img>
                            <h2>Preguntas Frecuentes</h2>
                            <p>Encuentra respuestas a las preguntas más comunes sobre Poleana.</p>
                        </div>
                    </section>

                    <section className="info">
                        <div className="card">
                            <img src="como-jugar.jpg" alt="Cómo Jugar"></img>
                            <h2>Cómo Jugar</h2>
                            <p>Aprende las reglas básicas de Poleana y conviértete en un maestro del juego.</p>
                        </div>
                        <div className="card">
                            <img src="historia.jpg" alt="Historia del Juego"></img>
                            <h2>Historia del Juego</h2>
                            <p>Descubre la fascinante historia detrás de Poleana y su evolución a lo largo del tiempo.</p>
                        </div>
                        <div className="card">
                        <img src="preguntas-frecuentes.jpg" alt="Preguntas Frecuentes"></img>
                            <h2>Preguntas Frecuentes</h2>
                            <p>Encuentra respuestas a las preguntas más comunes sobre Poleana.</p>
                        </div>
                    </section>

                </div>

            
            </div>
        </section>

            

    <hr></hr>
    <div className="avatarLogo">
		<a href="https://codepen.io/MarioDesigns/">
			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/751678/skytsunami.png" alt="Skytsunami" />
		</a>
	  </div></div>
    );
  }
  
  export default Home;
  