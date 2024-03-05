import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import LoginModal from './LoginModal';
import guest from '../../assets/guest.webp';

function LoginButton({ onUserLoaded }) {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClick = () => {
        loginWithRedirect();
        handleShow();
    }

    // Estado local para almacenar los datos del usuario autenticado
    
    const [userData, setUserData] = useState({
        name: "",
        picture: ""
    });
    console.log('iniziando autenticación');
    console.log('usuario', isAuthenticated);


    // Efecto para actualizar los datos del usuario cuando cambie el usuario autenticado
    useEffect(() => {
        if (isAuthenticated) {
            console.log('que si');
            setUserData({
                name: user.name,
                picture: user.picture || guest, // Si no hay imagen, se usa la de invitado
                mail: user.email
            });
            console.log('autenticacion correcta');
            // Llamamos a la función proporcionada para pasar los datos del usuario al componente padre
            onUserLoaded(user);
            
            // Realizar la petición a la API para verificar si el usuario existe en la base de datos

            console.log('petición a la API');
            const fetchUserData = async () => {
                try {
                    console.log('hoy ya vamos aca');
                    const response = await axios.post(
                        "http://localhost:80/juego/api/user_auth.php",
                        { "mail": user.email }
                    );
                    if (response.data.exists) {


                        console.log('hoy vamos aca');
                        // Si el usuario existe en la base de datos, guardar los datos de la foto del perfil y el correo electrónico
                        // Aquí puedes ajustar los nombres de los campos según corresponda en tu base de datos
                        await axios.post(
                            "http://localhost:80/juego/api/user_auth.php",
                            {
                                "mail": user.email,
                                "pic": user.picture || guest,
                                "name": user.name
                            }
                        );
                    }
                } catch (error) {
                    console.error("Error al verificar el usuario en la base de datos:", error);
                }
            };
            fetchUserData();
        } else {
            console.log('que no');
            setUserData({
                name: "",
                picture: "",
                mail: ""
            });
        }
    }, [isAuthenticated, user, onUserLoaded]);

    return (
        <>
        { isAuthenticated ? (
            <span>
                <span>{userData.name}</span>
                <img className="circular-image" src={userData.picture} alt="User" />
            </span>
        ) : (
            <span>
                <button onClick={handleClick}>Acceder</button>
                {/* <LoginModal show={show} handleClose={handleClose} /> */}
            </span>
        )}
        </>
    )
}

export default LoginButton;
