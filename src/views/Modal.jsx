// Modal.js
import React from 'react';
import '../styles/fichas.css'; // Importa los estilos CSS del modal si los tienes

const Modal = ({ show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
      </section>
    </div>
  );
};


//ejemplo en segunda rama
export default Modal;
