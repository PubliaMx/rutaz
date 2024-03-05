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
    const [canalActivo, setCanalActivo] = useState(null); // Cambiado a canalActivo
    // También deberías definir el estado para el canal activo

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
                    <div>

                        
                        <div>
                    <Sidebar 
                        setCanalActivo={setCanalActivo} // Cambiado a setCanalActivo
                        usuario={user}
                    />
                    </div>
                    <div>
                    <SidebarUsers 
                        setCanalActivo={setCanalActivo} // Cambiado a setCanalActivo
                        usuario={user}
                        canalActivo={canalActivo} // Cambiado a canalActivo
                    />
                    </div>
                    </div>

                    

                    
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default ChatPage;
