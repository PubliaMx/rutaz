import React, { useState, useEffect } from "react";
import { Avatar, Divider } from "@material-ui/core";
import CanalEnSidebar from "../Components/Chat/CanalEnSidebar";
import axios from "axios";
import io from "socket.io-client"; // Importa el cliente de Socket.IO
import TuSaldo from "../Components/Saldo/TuSaldo";

import { ExpandMore, Add, Mic, Settings, Headset } from "@material-ui/icons";

import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

const socket = io("http://localhost:3300"); // Establece la conexión con el servidor de Socket.IO

function Sidebar({ usuario, setCanalActivo }) {
  const [canales, setCanales] = useState([]);
  const [canalActivoNombre, setCanalActivoNombre] = useState("");

  async function getCanales() {
    const canalesArr = [];
    const collectionRef = collection(firestore, "canales");
    const canalesCifrados = await getDocs(collectionRef);
    canalesCifrados.forEach((canalCifrado) => {
      canalesArr.push(canalCifrado.data());
    });

    setCanales(canalesArr);
  }

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
  function agregarCanal() {
    const nombreCanal = prompt("¿Cuál es el nombre del canal?");
    if (nombreCanal) {
      const docuRef = doc(firestore, `canales/${nombreCanal}`);
      setDoc(docuRef, {
        id: new Date().getTime(),
        nombre: nombreCanal,
      });

      obtenerCanales();
    }
  }

  useEffect(() => {
    obtenerCanales();
  }, []);

  return (
    <div className="sidebar zidebar">
      <div className="separador2"></div>
      <div className="sidebar__top fixed">Juegos</div>
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
                <div
                  key={index}
                  onClick={() => {
                    setCanalActivo(canal);
                    setCanalActivoNombre(canal);
                  }}
                >
                  {/* Agrega la clave única */}
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

export default Sidebar;
