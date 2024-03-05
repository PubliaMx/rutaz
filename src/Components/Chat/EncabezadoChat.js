import React from "react";

import {
  Notifications,
  Room,
  PeopleAlt,
  Search,
  Send,
  Help,
} from "@material-ui/icons";

function EncabezadoChat({ nombreCanal }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash"> #</span>
          {nombreCanal}
        </h3>
      </div>

      
    </div>
  );
}

export default EncabezadoChat;
