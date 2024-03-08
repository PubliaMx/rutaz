import React, { useState, useEffect } from "react";
import axios from "axios";

function SidebarUsers({ nombre_cann, id }) {
  const [canalInfo, setCanalInfo] = useState(null);
  const JuegoEstatico = "buenisimo";

  useEffect(() => {
    obtenerInfoCanal();
  }, []);

  const obtenerInfoCanal = async () => {
    try {
      const response = await axios.post(
        "http://localhost:80/juego/api/juegoInfo.php",
        { type: "CanalInfo", JuegoId: JuegoEstatico }
      );
      const canalInfoData = response.data;

      // Procesar los datos del canal antes de guardarlos en el estado
const processedCanalInfo = {
  ...canalInfoData,
  usuarios: Array.isArray(canalInfoData.usuarios) ? canalInfoData.usuarios : [],
  usuario_pictures: Array.isArray(canalInfoData.usuario_pictures) ? canalInfoData.usuario_pictures : [],
  fichas: Array.isArray(canalInfoData.fichas) ? canalInfoData.fichas : [],
  usuarios: canalInfoData.usuarios.map((usuario, index) => ({
    ...usuario,
    colorFicha: canalInfoData.fichas[index] === "fichaverde" ? "verdes" :
                canalInfoData.fichas[index] === "fichaanaranja" ? "naranjas" :
                canalInfoData.fichas[index] === "fichaazul" ? "azules" :
                canalInfoData.fichas[index] === "fichaamarilla" ? "amarillas" : ""
  }))
};

      


      setCanalInfo(processedCanalInfo);
    } catch (error) {
      console.error("Error al obtener la información del canal:", error);
    }
  };


// Función para formatear la fecha de creación del canal
const formatCreationDate = (fechaCreacion) => {
  const ahora = new Date();
  const creadaEn = new Date(fechaCreacion);
  const diferencia = Math.abs(ahora - creadaEn);
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const meses = Math.floor(dias / 30);
  const años = Math.floor(meses / 12);

  let fechaFormateada = `${creadaEn.toLocaleDateString()} (${años > 0 ? años + " año" + (años !== 1 ? "s" : "") + ", " : ""}${meses > 0 ? meses + " mes" + (meses !== 1 ? "es" : "") + ", " : ""}${dias > 0 ? dias + " día" + (dias !== 1 ? "s" : "") + " " : "hoy"})`;
  return fechaFormateada;
};




  // Función para renderizar la lista de usuarios del canal
  const renderUsersList = () => {
    if (!canalInfo || !canalInfo.usuarios) {
      return null;
    }

    return canalInfo.usuarios.map((usuario, index) => (
      <div key={index} className="sidebar__profileInfo">
        <span className="userOfGamePicItem">
          <img className="circular-image-channel-list" width="32px" src={canalInfo.usuario_pictures[index]} alt={usuario} />
        </span>
        <h3>{usuario}</h3>
        <p>
          <span className={`colorFicha ${usuario.colorFicha}`}>{usuario.colorFicha}</span>
        </p>
      </div>
    ));
  };

  return (
    <div className="sidebarChannel">
      <div className="canalEnListaContenedor">
        {renderUsersList()}
        <div className="sidebar__profileInfo">
          <div className="canalInfo">
            <h3>{canalInfo ? `$${canalInfo.apuesta}` : null}</h3>
            {/* Asegúrate de pasar la fecha de creación del canal a la función formatCreationDate */}
            {/* <p>{formatCreationDate(canalInfo.created_en)}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarUsers;
