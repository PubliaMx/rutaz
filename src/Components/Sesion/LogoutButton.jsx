import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';



const LogoutButton = () => {

    const {logout} = useAuth0()
    const {user} = useAuth0();

    return (
        <>
        <span>
            <button className='logout' onClick={() => logout()}>
                Cerrar Sesión
            </button>
        </span>
        <span>
        <img className="circular-image-sesion" src={user.picture} />
    </span>
    </>
    )

}


export default LogoutButton;