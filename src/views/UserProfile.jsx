// UserProfile.jsx
import React from "react";
import { Avatar } from "@material-ui/core";

function UserProfile({ usuario }) {
  return (
    <div className="sidebar__profile">
      <Avatar src={usuario.picture} />
      <div className="sidebar__profileInfo">
        <h3>{usuario.name}</h3>
        <p>Identificador</p>
      </div>
    </div>
  );
}

export default UserProfile;
