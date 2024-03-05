import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Login from "../views/Login";
import ChatScreen from "../views/ChatScreen";
import Cabecera from "../Components/Topbar/Cabecera";
import Sidebar from "../views/Sidebar";
import SidebarUsers from "../views/SidebarUsers";
import '../styles/chat.css';

function ChatPage() {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [canalActivo, setCanalActivo] = useState("Ingreso"); // Cambiado a canalActivo y configurado por defecto como "Ingreso"

    if (isLoading) {
        // Muestra algún indicador de carga mientras se verifica la autenticación del usuario
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
                            setCanalActivo={setCanalActivo} // Cambiado a setCanalActivo
                            usuario={user}
                        />
                        <SidebarUsers 
                            setCanalActivo={setCanalActivo} // Cambiado a setCanalActivo
                            usuario={user}
                            canalActivo={canalActivo} // Cambiado a canalActivo
                        />
                    </div>
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default ChatPage;
