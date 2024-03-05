import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth0 } from '@auth0/auth0-react';
import './modal.css';

const ModoModal = ({ show, handleClose }) => {
    const { loginWithRedirect } = useAuth0();

    const handleLoginClick = () => {
        loginWithRedirect();
    };

    return (
        <Modal className='modal-container' show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title className='modal-title'>Hola</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body-text'>
                Ok este es es el texto del moda
                <p>
                 <a href="/jugar"><h1> Jugar Ya !! </h1></a>   
                
                 <a href="/chat"><h1> Ir al Chat !! </h1></a>   
                </p>


                </Modal.Body>

        </Modal>
    );
};

export default ModoModal;
