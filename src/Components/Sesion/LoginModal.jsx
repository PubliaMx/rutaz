import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth0 } from '@auth0/auth0-react';

const LoginModal = ({ show, handleClose }) => {
    const { loginWithRedirect } = useAuth0();

    const handleLoginClick = () => {
        loginWithRedirect();
    };

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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

export default LoginModal;
