import React, { useState, useEffect } from "react";

import { Avatar } from "@material-ui/core";
import { ExpandMore, Add, Mic, Settings, Headset } from "@material-ui/icons";

import CanalEnSidebar from "../Components/Chat/CanalEnSidebar";

import firebaseApp from "../firebase/credenciales";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

import { getAuth, signOut } from "firebase/auth";

function Sidebar({ usuario }) {
  console.log(usuario);

  function agregarCanal() {
    const nombreCanal = prompt("Por favor, ingrese el nombre del canal");
    if (nombreCanal) {
      const db = getFirestore(firebaseApp);
      const docRef = doc(db, "canales", nombreCanal);
      setDoc(docRef, { nombre: nombreCanal });
    }
  }

  return <div className="sidebar">

    <div className="separador"></div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <div className="sidebar__top">
    </div>
    <div className="sidebar__channels">    
      <div className="sidebar__chanelsHeader">
        <div className="sidebar__header">
          
          <ExpandMore />  
          <h4>Poleana</h4>
    
        </div>

        <Add className="sidebar__addChannel" onClick={agregarCanal}/>
        
      </div>
    
      <div className="sidebar__channelsList">



      </div>
    
      <div className="sidebar__profile">

        <Avatar src={usuario.picture} />
        <div className="sidebar__profileInfo">
          <h3>Nombre de usuario</h3>
          <p>Identificador</p>
          </div>
      </div>

    </div>  



    
  </div>;
}

export default Sidebar; 