import React from "react";
import { Avatar } from "@material-ui/core";

function Mensaje({ mensajeFirebase }) {
  // Función para formatear el timestamp y obtener el identificador único del mensaje
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString();
    const mensajeId = `mensaje-${timestamp}`; // Identificador único del mensaje
    console.log("Identificador único del mensaje:", mensajeId); // Imprimir el identificador en la consola
    return formattedDate;
  };

  // Obtener el timestamp formateado
  const formattedTimestamp = formatTimestamp(mensajeFirebase.id);

  return (
    <div className="message">
      <Avatar src={mensajeFirebase.foto} />
      <div className="message__info">
        <h4>
          {mensajeFirebase.usuario}
          <span className="message__timestamp">
            {formattedTimestamp}
          </span>
        </h4>
        <p>{mensajeFirebase.mensaje}</p>
      </div>
    </div>
  );
}

export default Mensaje;
