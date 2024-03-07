import React, { useState, useEffect } from "react";
import axios from "axios";
import guest from '../../assets/guest.webp';

function UsuariosJuego ({ nombre_cann }) {
  const [canalInfo, setCanalInfo] = useState(null);
  
  useEffect(() => {
    obtenerInfoCanal();
  }, [nombre_cann]);

  const obtenerInfoCanal = async () => {
    try {
      console.log('************Iniciando la peticion de fotos');
      const response = await axios.post(
        "http://localhost:80/juego/api/canales.php",
        { type: "Canal", nombre_cann: nombre_cann } // Cambiado el tipo a "Canal"
      );

      const { data } = response;
      console.log('*****************data', data, 'fin de la data');
      setCanalInfo(data); // Setear la data recibida del servidor

    } catch (error) {
      console.error("Error al obtener la información del canal:", error);
    }
  };

  return (
    <div className="sidebarChannel">
      <div className="canalEnListaContenedor">
        <div className="nombreCanal">
          <span className="sidebarChannel__hash">#</span>
          <span className="primerasCincoLetras">{nombre_cann}</span>
        </div>
        <div className="apuestaJuego">
          {/* Asegúrate de manejar correctamente los casos en los que los datos pueden ser nulos */}
          <h3>{canalInfo ? canalInfo.apuesta : null}</h3>
        </div>
        <div className="userOfGamePic">
          {canalInfo && canalInfo.usuario_pictures && canalInfo.usuario_pictures.map((picture, index) => (
            <span key={index} className="userOfGamePicItem">
              <img className="circular-image-channel-list" src={picture || guest} alt="User" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsuariosJuego;
