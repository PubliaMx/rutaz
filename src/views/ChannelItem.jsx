// ChannelItem.jsx
import React from "react";
import CanalEnSidebar from "../Components/Chat/CanalEnSidebar";

function ChannelItem({ canal, setCanalActivo, setCanalActivoNombre }) {
  const handleClick = () => {
    setCanalActivo(canal);
    setCanalActivoNombre(canal);
  };

  return (
    <div onClick={handleClick}>
      <CanalEnSidebar nombre_cann={canal} />
    </div>
  );
}

export default ChannelItem;
