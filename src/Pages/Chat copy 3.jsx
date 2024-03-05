import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Login from "../views/Login";
import ChatScreen from "../views/ChatScreen";
import Cabecera from "../Components/Topbar/Cabecera";
import Sidebar from "../views/Sidebar";
import '../styles/chat.css';

function ChatPage() {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [canal, setCanal] = useState('hola');

    if (isLoading) {
        // Muestra algún indicador de carga mientras se verifica la autenticación del usuario
        return <div>Loading...</div>;
    }

    return (
        <div className="app">
            <Cabecera />
            {isAuthenticated ? (
                <>
                {""}
                <Sidebar 
                setCanalActivo={setCanalActivo}
                usuario={user}
                />{""}

                
                    <ChatScreen canalActivo={canalActivo} usuario={user} />
                    
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default ChatPage;
