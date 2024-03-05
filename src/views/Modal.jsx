import React from 'react';
import '../styles/fichas.css'; // Importa los estilos CSS del modal si los tienes

const Modal = ({ show, onClose, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName} onClick={onClose}>
      <section className="modal-main" onClick={(e) => e.stopPropagation()}>
        {children}
      </section>
    </div>
  );
};

export default Modal;
