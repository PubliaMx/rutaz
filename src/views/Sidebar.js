import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import CanalEnSidebar from "../Components/Chat/CanalEnSidebar";
import axios from "axios";
import TuSaldo from "../Components/Saldo/TuSaldo";
import AgregarCanal from '../Components/Chat/AgregarCanal'; // Importa el componente AgregarCanal

import { ExpandMore } from "@material-ui/icons"; // Importa el icono ExpandMore de Material-UI

import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore"; // Importa las funciones de Firestore

const firestore = getFirestore(firebaseApp); // Inicializa Firestore con la configuración de Firebase

const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

function Sidebar({ usuario, setCanalActivo }) {
  const [canales, setCanales] = useState([]);

  useEffect(() => {
    obtenerCanales();
  }, []);

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
          {/* Renderiza el componente AgregarCanal y pasa las propiedades necesarias */}
          <AgregarCanal usuario={usuario.name} obtenerCanales={obtenerCanales}  />
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
