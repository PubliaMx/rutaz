// SidebarChannelList.jsx
import React from "react";
import CanalEnSidebar from "../Components/Chat/CanalEnSidebar";
import ChannelItem from "./ChannelItem";

function SidebarChannelList({ canales, setCanalActivo, setCanalActivoNombre }) {
  return (
    <div className="sidebar__channelsList">
      {canales.length > 0 ? (
        canales.map((canal, index) => (
          <ChannelItem
            key={index}
            canal={canal}
            setCanalActivo={setCanalActivo}
            setCanalActivoNombre={setCanalActivoNombre}
          />
        ))
      ) : (
        <p>No hay canales disponibles</p>
      )}
    </div>
  );
}

export default SidebarChannelList;
