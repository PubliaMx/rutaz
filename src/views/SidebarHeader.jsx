// SidebarHeader.jsx
import React from "react";
import { ExpandMore, Add } from "@material-ui/icons";

function SidebarHeader({ onAddChannel }) {
  return (
    <div className="sidebar__chanelsHeader">
      <div className="sidebar__header">
        <ExpandMore />
        <h4>Poleana</h4>
      </div>
      <Add className="sidebar__addChannel" onClick={onAddChannel} />
    </div>
  );
}

export default SidebarHeader;
