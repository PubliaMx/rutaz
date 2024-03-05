import React, { useState, useEffect } from "react";
import { Avatar, Divider } from "@material-ui/core";
import { ExpandMore, Add } from "@material-ui/icons";
import CanalEnSidebar from "../Components/Chat/CanalEnSidebar";
import axios from "axios";
import io from "socket.io-client"; // Importa el cliente de Socket.IO
import TuSaldo from "../Components/Saldo/TuSaldo";

const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT; 

const socket = io('http://localhost:3300'); // Establece la conexión con el servidor de Socket.IO

function Sidebar({ usuario, setCanalActivo }) {
  const [canales, setCanales] = useState([]);
  const [canalActivoNombre, setCanalActivoNombre] = useState(""); 

  useEffect(() => {
    obtenerCanales();
  }, []);

  // Función para obtener la lista de canales desde la API
  const obtenerCanales = async () => {
    try {
      const response = await axios.post(
        "http://localhost:80/juego/api/textChat.php",
        { type: "canales_chat" }
      );
      setCanales(response.data.canales);
    } catch (error) {
      console.error("Error al obtener los canales:", error);
    }
  };

  // Función para agregar un canal
  const agregarCanal = async () => {
    const nombreCanal = prompt("Ingresa un #Nombre para el Salón del Juego");
    if (!nombreCanal) {
      return; // Si el usuario presiona Cancelar, salir de la función
    }

    let montoApuesta;
    while (true) {
      montoApuesta = prompt("Ingresa el monto a apostar");
      if (montoApuesta === null) {
        return; // Si el usuario presiona Cancelar, salir de la función
      } else if (isNaN(montoApuesta) || parseInt(montoApuesta) <= 50) {
        alert("El monto de la apuesta debe ser una cantidad válida (superior a $50).");
      } else {
        break;
      }
    }

    let colorSeleccionado;
    while (true) {
      const colorInput = prompt("Selecciona un color para el canal:\n1. Amarillo\n2. Azul\n3. Verde\n4. Naranja");
      if (!colorInput) {
        return; // Si el usuario presiona Cancelar, salir de la función
      }
      const opcion = parseInt(colorInput);
      if (opcion < 1 || opcion > 4) {
        alert("Por favor, ingresa un número válido entre 1 y 4.");
      } else {
        switch (opcion) {
          case 1:
            colorSeleccionado = "fichaamarilla";
            break;
          case 2:
            colorSeleccionado = "fichaazul";
            break;
          case 3:
            colorSeleccionado = "fichaverde";
            break;
          case 4:
            colorSeleccionado = "fichanaranja";
            break;
          default:
            break;
        }
        break;
      }
    }

    // Emitir un evento 'chat_new_channel' al servidor de Socket.IO
    socket.emit('chat_new_channel', {
      nombre_canal: nombreCanal,
      apuesta: parseInt(montoApuesta),
      ficha: colorSeleccionado, // Agregar la propiedad 'ficha' con el color seleccionado
      timestamp: 'mas',
      creador: usuario.name,
      
      // Puedes incluir más datos relevantes del canal aquí si lo necesitas
    });

    try {
      const timeChanelCreated = new Date().toISOString(); // Guarda la fecha y hora actual en formato ISO 8601

      const response = await axios.post(
        "http://localhost:80/juego/api/crear_canal_chat.php",
        {
          type: "agregar_canal_chat",
          nombre_can: nombreCanal,
          apuesta: parseInt(montoApuesta),
          ficha: colorSeleccionado, // Agregar la propiedad 'ficha' con el color seleccionado
          creador: usuario.name,
          creador_mail: usuario.email,
          timestamp: timeChanelCreated, // Obtiene la fecha y hora actual en formato ISO 8601
          creador_picture: usuario.picture,
        }
      );

      if (response.data.success) {
        obtenerCanales(); // Actualizar la lista de canales después de agregar uno nuevo
      } else {
        console.error("Error al agregar canal:", response.data.message);
      }
    } catch (error) {
      console.error("Error al agregar canal:", error);
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
                <div onClick={() => { setCanalActivo(canal); setCanalActivoNombre(canal); }}> {/* Actualizar el nombre del canal activo al seleccionar un nuevo canal */}
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
            {/* Muestra el saldo del usuario */}
            <TuSaldo />
          </div>
        </div>
      </div>
    </div>
  );
}
//
export default Sidebar;
