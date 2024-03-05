import React, { useState, useEffect } from "react";
import { Avatar, Divider } from "@material-ui/core";
import { ExpandMore, Add } from "@material-ui/icons";
import CanalEnSidebar from "../Components/Chat/CanalEnSidebar";
import axios from "axios";
import io from "socket.io-client"; // Importa el cliente de Socket.IO
import TuSaldo from "../Components/Saldo/TuSaldo";
import '../styles/fichas.css';
import Modal from "./Modal"; // Importa el componente Modal

const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT; 

const socket = io('http://localhost:3300'); // Establece la conexión con el servidor de Socket.IO

function Sidebar({ usuario, setCanalActivo }) {
  const [canales, setCanales] = useState([]);
  const [canalActivoNombre, setCanalActivoNombre] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

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

  const mostrarModalColores = () => {
    const nombreCanal = prompt("Ingresa un #Nombre para el Salón del Juego");
    if (!nombreCanal) {
      console.log('El usuario canceló la operación.');
      return; // Si el usuario presiona Cancelar, salir de la función
    }
    console.log('Nombre del canal ingresado:', nombreCanal);
    let montoApuesta;
    while (true) {
      montoApuesta = prompt("Ingresa el monto a apostar");
      if (!montoApuesta) {
        console.log('El usuario canceló la operación.');
        return; // Si el usuario presiona Cancelar, salir de la función
      } else if (isNaN(montoApuesta) || parseInt(montoApuesta) <= 50) {
        alert("El monto de la apuesta debe ser una cantidad válida (superior a $50).");
      } else {
        console.log('Monto de apuesta válido:', montoApuesta);
        setShowModal(true); // Si todo está bien, mostrar el modal para seleccionar el color
        break;
      }
    }
  };

  const handleAgregarCanal = (color) => {
    setShowModal(false);
    setSelectedColor(color);
    agregarCanal(color);
  };

  // Función para agregar un canal
  const agregarCanal = async (colorSeleccionado) => {
    // Aquí va la lógica para agregar el canal
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
            <a className="creaCanalText" href="#" onClick={mostrarModalColores}>
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

      {/* Modal para seleccionar el color */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Selecciona un color:</h2>
        <div className="color-options">
          <div
            className="color-option fichaamarilla"
            onClick={() => handleAgregarCanal("fichaamarilla")}
          >
            Amarilla
          </div>
          <div
            className="color-option fichaazul"
            onClick={() => handleAgregarCanal("fichaazul")}
          >
            Azul
          </div>
          <div
            className="color-option fichaverde"
            onClick={() => handleAgregarCanal("fichaverde")}
          >
            Verde
          </div>
          <div
            className="color-option fichanaranja"
            onClick={() => handleAgregarCanal("fichanaranja")}
          >
            Naranja
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Sidebar;
