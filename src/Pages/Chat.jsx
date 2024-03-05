import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Login from "../views/Login";
import ChatScreen from "../views/ChatScreen";
import Cabecera from "../Components/Topbar/Cabecera";
import Sidebar from "../views/Sidebar";
import SidebarUsers from "../views/SidebarUsers";
import Modal from "../views/Modal"; // Importa el componente Modal
import '../styles/chat.css';

function ChatPage() {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [canalActivo, setCanalActivo] = useState("Ingreso");
    const [showModal, setShowModal] = useState(true); // Cambiamos el estado inicial para mostrar el modal

    useEffect(() => {
        console.log("useEffect ejecutado");
    }, []); // Dejamos el arreglo de dependencias vacío para que se ejecute solo una vez

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
    };

    console.log("Estado de showModal:", showModal);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app">
            <Cabecera />
            {isAuthenticated ? (
                <>
                    <ChatScreen canalActivo={canalActivo} usuario={user} />
                    <div className="sidebarsContainer">
                        <Sidebar 
                            setCanalActivo={setCanalActivo}
                            usuario={user}
                        />
                        <SidebarUsers 
                            setCanalActivo={setCanalActivo}
                            usuario={user}
                            canalActivo={canalActivo}
                        />
                    </div>
                    {/* Modal para seleccionar el color */}
                    <Modal onClose={closeModal} show={showModal}>
                        <h2>Selecciona un color:</h2>
                        {/* Contenido del modal */}
                    </Modal>
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default ChatPage;
