import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import Login from "../views/Login";
import ChatScreen from "../views/ChatScreen";
import Cabecera from "../Components/Topbar/Cabecera";
import Sidebar from "../views/Sidebar";

function ChatPage() {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="app">
            <Cabecera />
            {/* {isAuthenticated ? (
                <div>
                    
                    <ChatScreen canalActivo="hola" />
                </div>
            ) : (
                <Login />
            )} */}

<ChatScreen canalActivo="hola" />


        </div>
    );
}

export default ChatPage;
