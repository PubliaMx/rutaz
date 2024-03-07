import React from "react";

const CrearCanal = ({ className }) => {
  const handleCreateRoom = () => {
    // Aquí iría la lógica para crear el salón de juego
    console.log("Creando salón de juego...");
  };

  return (
    <a href="#" className={className} onClick={handleCreateRoom}>
      Crear Salón para Juego
    </a>
  );
}

export default CrearCanal;
