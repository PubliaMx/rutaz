import React, { useState, useEffect } from "react";
import { Add } from "@material-ui/icons";
import axios from "axios"; // Importa axios para hacer solicitudes HTTP
import io from "socket.io-client"; // Importa el cliente de Socket.IO

const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

const socket = io('http://localhost:3300'); // Establece la conexión con el servidor de Socket.IO

function AgregarCanal({ obtenerCanales, usuario, usuarioName }) {
  const [canales, setCanales] = useState([]);

  useEffect(() => {
    obtenerCanales();
  }, []);

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
      creador: usuario,
      
      // Puedes incluir más datos relevantes del canal aquí si lo necesitas
    });

    try {
      //alert(usuario.name);
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
        //alert('canal creado con éxito succes');
        obtenerCanales(); // Actualizar la lista de canales después de agregar uno nuevo

      } else {
        alert('canal creado con éxito error');
        console.error("Error al agregar canal:", response.data.message);
      }
    } catch (error) {
      //alert('canal creado con éxito error2');
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
