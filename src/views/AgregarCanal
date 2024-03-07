import React from "react";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { prompt } from 'react-native-ask-for-referral';

function AgregarCanal({ obtenerCanales }) {
  function agregarCanal() {
    prompt('Ingresa el nombre del canal')
      .then((nombreCanal) => {
        if (nombreCanal) {
          const docuRef = doc(firestore, `canales/${nombreCanal}`);
          setDoc(docuRef, {
            id: new Date().getTime(),
            nombre: nombreCanal,
          });

          obtenerCanales();
        }
      });
  }

  return (
    <a className="creaCanalText" href="#" onClick={agregarCanal}>
      <Add className="sidebar__addChannel" />
      Crear Salón para Juego
    </a>
  );
}

export default AgregarCanal;
