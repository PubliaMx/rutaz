import React, { useState, useEffect } from "react";
import axios from "axios";
import guest from '../../assets/guest.webp';

function CanalEnSidebar({ nombre_cann, id }) {
  const [canalInfo, setCanalInfo] = useState(null);
  

  useEffect(() => {
    obtenerInfoCanal();
  }, []);

  const obtenerInfoCanal = async () => {
    try {
      const response = await axios.post(
        "http://localhost:80/juego/api/canales.php",
        { type: "Ingreso" }
      );
      const canales = response.data.canales;
      // Encuentra el canal correspondiente en la lista de canales
      const canal = canales.find((canal) => canal.nombre_cann.toLowerCase() === nombre_cann.toLowerCase());
      setCanalInfo(canal);
    } catch (error) {
      console.error("Error al obtener la información del canal:", error);
    }
  };

  return (
    <div className="sidebarChannel">
      <div className="canalEnListaContenedor">
        <div className="nombreCanal">
          <span className="sidebarChannel__hash">#</span>
          <span className="primerasCincoLetras">{nombre_cann.substring(0, 5)}</span>
        </div>
        <div className="apuestaJuego">
          <h3>{canalInfo ? `$${canalInfo.apuesta}` : null}</h3>
        </div>
        <div className="userOfGamePic">
          {canalInfo && canalInfo.usuario_pictures && canalInfo.usuario_pictures.map((picture, index) => (
            <span key={index} className="userOfGamePicItem">
              <img className="circular-image-channel-list" width="24px" src={picture || guest} alt="User" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CanalEnSidebar;
