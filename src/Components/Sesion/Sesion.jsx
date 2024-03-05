import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import './sesion.css';

function Sesion() {

    const {isAuthenticated} = useAuth0()
    

    return (
        <div>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>

    )

}

export default Sesion;