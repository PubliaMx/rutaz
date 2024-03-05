import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import ModoModal from './ModoModal';

function ModoLink() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <a className="Cabecera-li" href="#" onClick={handleShow}>Jugar</a>
        <ModoModal show={show} handleClose={handleClose} />
        </>
    )

}

export default ModoLink;