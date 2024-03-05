import React, { useState } from "react";

import Login from "../views/Login";
//import Sidebar from "../views/Sidebar";
import ChatScreen from "../views/ChatScreen";

import firebaseApp from "../firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);
const canalActivo = 'hola';

function ChatPage() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  const [canalActivo, setCanalActivo] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    //revisar si se inició o se cerró sesión
    if (usuarioFirebase) {
      setUsuarioGlobal(usuarioFirebase);
      console.log("sesión iniciada");
    } else {
      setUsuarioGlobal(null);
    }
  });


  // <ChatScreen canalActivo="{canalActivo}" usuario={usuarioGlobal} />{" "}
  return (
    
    <div className="app">
      {usuarioGlobal ? (
        <>
          {" "}
          
          <ChatScreen canalActivo="hola" usuario={usuarioGlobal} />{" "}
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default ChatPage;
