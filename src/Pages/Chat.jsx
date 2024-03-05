import React, { useState } from "react";
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
    const [showModal, setShowModal] = useState(false); // Nuevo estado para controlar la visibilidad del modal

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Función para abrir el modal
    const openModal = () => {
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
    };

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
                            openModal={openModal} // Pasa la función para abrir el modal como prop
                        />
                        <SidebarUsers 
                            setCanalActivo={setCanalActivo}
                            usuario={user}
                            canalActivo={canalActivo}
                        />
                    </div>
                    {/* Modal para seleccionar el color */}
                    {showModal && (
                        <Modal onClose={closeModal}>
                            <h2>Selecciona un color:</h2>
                            {/* Contenido del modal */}
                        </Modal>
                    )}
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default ChatPage;
