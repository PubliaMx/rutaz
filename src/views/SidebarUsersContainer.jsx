// SidebarUsersContainer.jsx
import React, { useState, useEffect } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarChannelList from "./SidebarChannelList";
import UserProfile from "./UserProfile";
import axios from "axios";
import io from "socket.io-client";
import useApi from "../Hooks/connApi";

const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

const socket = io("http://localhost:3300");

function SidebarUsersContainer({ usuario, setCanalActivo }) {
  const { apiUrl, apiPort } = useApi();
  const apiPath = `${apiUrl}:${apiPort}/juego/api/textChat.php`;
  const [canales, setCanales] = useState([]);
  const [canalActivoNombre, setCanalActivoNombre] = useState("");

  useEffect(() => {
    obtenerCanales();
  }, []);

  const obtenerCanales = async () => {
    try {
      const response = await axios.post(apiPath, { type: "canales_chat" });
      setCanales(response.data.canales);
    } catch (error) {
      console.error("Error al obtener los canales:", error);
    }
  };

  const agregarCanal = async () => {
    const nombreCanal = prompt("Por favor, ingrese el nombre del canal");
    if (nombreCanal) {
      socket.emit("chat_new_channel", {
        nombre_canal: "hola",
        timestamp: "mas",
      });
      try {
        const response = await axios.post(apiPath, {
          type: "agregar_canal_chat",
          nombre_can: nombreCanal,
        });

        if (response.data.success) {
          obtenerCanales();
        } else {
          console.error("Error al agregar canal:", response.data.message);
        }
      } catch (error) {
        console.error("Error al agregar canal:", error);
      }
    }
  };

  return (
    <div className="sidebar">
      <SidebarHeader onAddChannel={agregarCanal} />
      <div className="sidebar__channels">
        <SidebarChannelList
          canales={canales}
          setCanalActivo={setCanalActivo}
          setCanalActivoNombre={setCanalActivoNombre}
        />
        <UserProfile usuario={usuario} />
      </div>
    </div>
  );
}

export default SidebarUsersContainer;
