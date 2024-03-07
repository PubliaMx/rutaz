// SidebarHeader.jsx
import React, { useState } from "react";
import { ExpandMore, Add } from "@material-ui/icons";
import CanalEnSidebar from "../Components/Chat/CanalEnSidebar";

function SidebarHeader({ onAddChannel, canalActivo }) {

  const [canales, setCanales] = useState([]);
  const [setCanalActivo] = useState(""); // Variable de estado para el nombre del canal activo
  
  return (
    <div className="sidebar__chanelsHeader">
      <div className="sidebar__top">
        
        <h4>Usuarios en: {canalActivo} </h4>

        <ExpandMore />
      </div>




    <div className="sidebar__channelsList">
          <ul>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>

          {/* <UsuariosJuego canalActivo={canalActivo} /> */}

          </ul>
        </div>





      
    </div>
  );
}

export default SidebarHeader;
