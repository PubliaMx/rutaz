import React, { useState, useEffect } from "react";
import axios from "axios";
import { Add } from "@material-ui/icons"; // Importa el icono Add de Material-UI

// Importaciones de Firebase
import firebaseApp from "../../firebase/credenciales";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

// Inicialización de Firebase
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Variables de entorno
const api_URL = process.env.REACT_APP_API_URL;
const api_port = process.env.REACT_APP_API_PORT;

function AgregarCanal({ obtenerCanales }) {
  const [canales, setCanales] = useState([]);

  useEffect(() => {
    obtenerCanales();
  }, []);

  function AgregarCanal() {
    const nombreCanal = window.prompt('Ingresa el nombre del canal');
    if (nombreCanal) {
      const docuRef = doc(firestore, `canales/${nombreCanal}`);
      setDoc(docuRef, {
        id: new Date().getTime(),
        nombre: nombreCanal,
      }).then(() => {
        obtenerCanales();
      }).catch(error => {
        console.error("Error al agregar canal:", error);
      });
    }
  }

  return (
    <a className="creaCanalText" href="#" onClick={AgregarCanal}>
      <Add className="sidebar__addChannel" /> {/* Utiliza el icono Add aquí */}
      Crear Salón para Juego
    </a>
  );
}

export default AgregarCanal;
