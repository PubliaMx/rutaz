import React from "react";
import guest from '../../assets/guest.webp';

function CanalEnSidebar({ nombre_cann, id }) {
  return (
    <div className="sidebarChannel">
      
      <div className="canalEnListaContenedor">
        <div className="nombreCanal">
          <span className="sidebarChannel__hash">#</span>
          <span className="primerasCincoLetras">{nombre_cann.substring(0, 5)}</span>
        </div>
        <div className="apuestaJuego">
          <h3>$200</h3>
        </div>
        <div className="userOfGamePic">
          <span className="userOfGamePicItem">
            <img width="24px" src={guest} alt="User" />
          </span>
          <span className="userOfGamePicItem">
            <img width="24px" src={guest} alt="User" />
          </span>
          <span className="userOfGamePicItem">
            <img width="24px" src={guest} alt="User" />
          </span>
          <span className="userOfGamePicItem">
            <img width="24px" src={guest} alt="User" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default CanalEnSidebar;
