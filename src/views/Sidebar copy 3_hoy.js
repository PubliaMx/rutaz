import React, { useState, useEffect } from "react";
import { Avatar, Divider } from "@material-ui/core";
import { ExpandMore, Add } from "@material-ui/icons";
import CanalEnSidebar from "../Components/Chat/CanalEnSidebar";
import axios from "axios";
import io from "socket.io-client"; // Importa el cliente de Socket.IO

import useApi from "../Hooks/connApi";
import useApiConsulta from "../Hooks/useApiConsulta"; // Importa el hook



const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT; 


const socket = io('http://localhost:3300'); // Establece la conexión con el servidor de Socket.IO

function Sidebar({ usuario, setCanalActivo }) {
  const { apiUrl, apiPort } = useApi();
  const apiPath = `${apiUrl}:${apiPort}/juego/api/textChat.php`;
  const [canales, setCanales] = useState([]);

  useEffect(() => {
    obtenerCanales();
  }, []);

  // Función para obtener la lista de canales desde la API
  const obtenerCanales = async () => {
    try {
      const apiPat = `${apiUrl}:${apiPort}/juego/api/textChat.php`;
      const response = await axios.post(
        "http://localhost:80/juego/api/textChat.php",
        { type: "canales_chat" }
      );
      console.log("******* Iniciando api consulta");
      console.log("Canales:", response.data);
      setCanales(response.data.canales);
    } catch (error) {
      console.error("Error al obtener los canales:", error);
    }
  };

  // Función para agregar un canal
  const agregarCanal = async () => {
    const nombreCanal = prompt("Ingresa un #Nombre para el Salón del Juego");
    if (nombreCanal) {
      let montoApuesta;
      while (true) {
        montoApuesta = prompt("Ingresa el monto a apostar");
        if (!montoApuesta || isNaN(montoApuesta) || parseInt(montoApuesta) <= 50) {
          alert("El monto de la apuesta debe ser una cantidad válida (superior a $50).");
        } else {
          break;
        }
      }
      console.log("Monto de la apuesta:", montoApuesta);
      // Emitir un evento 'chat_new_channel' al servidor de Socket.IO
      socket.emit('chat_new_channel', {
        nombre_canal: nombreCanal,
        apuesta: 200, //parseInt(montoApuesta),
        timestamp: 'mas',
        creador: usuario.name,
        // Puedes incluir más datos relevantes del canal aquí si lo necesitas
      });
      console.log('emitiendo canal nuevo');
      try {
        const timeChanelCreated = new Date().toISOString(); // Guarda la fecha y hora actual en formato ISO 8601

        const response = await axios.post(
          "http://localhost:80/juego/api/crear_canal_chat.php",
          {
            type: "agregar_canal_chat",
            nombre_can: nombreCanal,
            apuesta: parseInt(montoApuesta),
            creador: usuario.name,
            creador_mail: usuario.email,
            timestamp: timeChanelCreated, // Obtiene la fecha y hora actual en formato ISO 8601
          }
        );
        console.log("Respuesta al agregar canal:", response.data);
        console.log("creador:", usuario.name);
        console.log("fecha y hora", timeChanelCreated);
        console.log('debi decir la hora');
        
        if (response.data.success) {
          obtenerCanales(); // Actualizar la lista de canales después de agregar uno nuevo
        } else {
          console.error("Error al agregar canal:", response.data.message);
        }
      } catch (error) {
        console.error("Error al agregar canal:", error);
      }
    }
  };

  return (
    <div className="sidebar zidebar">
      <div className="separador"></div>
      <div className="sidebar__top">Juegos</div>
      <div className="sidebar__channels">
        <div className="sidebar__chanelsHeader">
          <div className="sidebar__header">
            <ExpandMore />
            <h4>Estancia de Ingreso</h4>
          </div>
            <a className="creaCanalText" href="#" onClick={agregarCanal}>
              <Add className="sidebar__addChannel" />
              Crear Salón para Juego
            </a>
        </div>
        <div className="sidebar__channelsList">
          {/* Mostrar la lista de canales si canales es un array */}
          {Array.isArray(canales) && canales.length > 0 ? (
          <>
          {canales.map((canal, index) => (
          <div onClick={()=> setCanalActivo(canal)}>
              <CanalEnSidebar nombre_cann={canal} id={index} />
          </div>
          ))}
          </>
      ) : (
        <p>No hay canales disponibles</p>
      )}
        </div>

        <div className="sidebar__profile">
          <Avatar src={usuario.picture} />
          <div className="sidebar__profileInfo">
            <h3>{usuario.name}</h3>
            <p>Identificador</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
