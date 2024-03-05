import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import Jugar from '../../routes/Jugar';


const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const Modo = ({ show, handleClose }) => {
    const { loginWithRedirect } = useAuth0();

    const handleLoginClick = () => {
        loginWithRedirect();
    };

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Selecciona un Modo de Juego</Modal.Title>
            </Modal.Header>
            <Modal.Body>Chat</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleLoginClick}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Jugar;
