import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import useApi from "../Hooks/connApi";

const SidebarUsers = ({ usuario, canalActivoNombre }) => {
  const { apiUrl, apiPort } = useApi();
  const apiPath = `${apiUrl}:${apiPort}/juego/api/canalInfo.php`; // Endpoint para obtener información del canal

  const [canalInfo, setCanalInfo] = useState(null);

  useEffect(() => {
    console.log("*************** Montando componente SidebarUsers...");
    obtenerInfoCanal();
  }, []);

  const obtenerInfoCanal = async () => {
    try {
      console.log("*************** Iniciando solicitud de información del canal...");
      const response = await axios.post(apiPath, { type: "CanalInfo", JuegoId: 1, nombre_cann: canalActivoNombre });
      console.log("*************** Respuesta de la API:", response.data);
      setCanalInfo(response.data);
    } catch (error) {
      console.error("*************** Error al obtener la información del canal:", error);
    }
  };

  console.log("*************** Canal activo:", canalActivoNombre);
  console.log("*************** Canal info:", canalInfo);

  return (
    <div className="sidebar">
      <div className="sidebar__top">Usuarios en {canalActivoNombre}</div>
      <div className="sidebar__channelsList">
        {/* Mostrar información de los usuarios */}
        {canalInfo && canalInfo.usuarios && (
          <>
            <div>
              <p>Apuesta: {canalInfo.apuesta}</p>
              <p>Usuarios:</p>
              {canalInfo.usuarios.map((usuario, index) => (
                <div key={index}>
                  <Avatar src={usuario.foto} />
                  <span>{usuario.nombre}</span>
                  {usuario.ficha && <span>{usuario.ficha}</span>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SidebarUsers;
