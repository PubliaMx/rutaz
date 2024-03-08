import React, { useState, useEffect } from "react";
import { Add } from "@material-ui/icons";
import axios from "axios"; 
import io from "socket.io-client"; 

const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

const socket = io('http://localhost:3300');

function AgregarCanal({ obtenerCanales, usuario, usuarioName, setCanalActivo }) {
  const [canales, setCanales] = useState([]);

  useEffect(() => {
    obtenerCanales();
  }, []);

  const agregarCanal = async () => {
    const nombreCanal = prompt("Ingresa un #Nombre para el Salón del Juego");
    if (!nombreCanal) {
      return;
    }

    let montoApuesta;
    while (true) {
      montoApuesta = prompt("Ingresa el monto a apostar");
      if (montoApuesta === null) {
        return;
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
        return;
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

    try {
      const timeChanelCreated = new Date().toISOString();

      const response = await axios.post(
        "http://localhost:80/juego/api/crear_canal_chat.php",
        {
          type: "agregar_canal_chat",
          nombre_can: nombreCanal,
          apuesta: parseInt(montoApuesta),
          ficha: colorSeleccionado,
          creador: usuario.name,
          creador_mail: usuario.email,
          timestamp: timeChanelCreated,
          creador_picture: usuario.picture,
        }
      );

      if (response.data && response.data.success) {
        obtenerCanales();
        setCanalActivo(nombreCanal);
        alert('Canal creado con éxito.');
      } else {
        alert('Error al agregar canal. Por favor, intenta de nuevo.');
        console.error("Error al agregar canal:", response.data ? response.data.message : "Respuesta inválida del servidor");
      }
    } catch (error) {
      alert('Error al agregar canal. Por favor, intenta de nuevo.');
      console.error("Error al agregar canal:", error);
    }
  };

  return (
    <a className="creaCanalText" href="#" onClick={agregarCanal}>
      <Add className="sidebar__addChannel" />
      Crear Salón para Juego
    </a>
  );
}

export default AgregarCanal;
