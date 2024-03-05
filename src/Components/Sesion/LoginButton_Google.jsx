import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import LoginModal from './LoginModal';
import guest from '../../assets/guest.webp'


function LoginButton() {
    const { loginWithRedirect } = useAuth0()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClick = () => {
        loginWithRedirect();
        handleShow();
    }

    return (
        <>
        <span>
        <button onClick={handleClick}>Acceder</button>
        <LoginModal show={show} handleClose={handleClose} />
        </span>
        <span>
        <img className="circular-image" src={guest} />
    </span>
        </>
    )

}

export default LoginButton;