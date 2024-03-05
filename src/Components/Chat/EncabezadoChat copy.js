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
const nombreCanale = 'hola';
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash"> #</span>
          {nombreCanale}
        </h3>
      </div>

      
    </div>
  );
}

export default EncabezadoChat;
