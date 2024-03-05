import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NombrarUsuario() {
  const [message, setMessage] = useState('Verificando usuario...');
  const [userExists, setUserExists] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Hacemos la solicitud a la API
        const response = await axios.post('http://localhost:80/juego/poleana_api.php', {
          auth: 'abc' // Cambia 'asd' por el valor que desees verificar
        });
        console.log(response); // Agrega esto para ver la respuesta en la consola
  
        // Verificamos si existe el usuario en la respuesta de la API
        const exists = response.data.exists;
  
        // Actualizamos el estado de acuerdo a la respuesta de la API
        if (exists) {
          setMessage('El usuario existe');
          setUserExists(true);
          // Si el usuario existe, establecemos el nombre
          setUserName(response.data.name);
        } else {
          setMessage('El usuario no existe');
          setUserExists(false);
        }
      } catch (error) {
        console.error('Error al llamar a la API:', error);
        setMessage('Error al verificar usuario');
      }
    };

    // Llamamos a la función de verificación de usuario al cargar el componente
    checkUser();
  }, []); // La dependencia es un arreglo vacío para que solo se ejecute una vez al cargar el componente

  return (
    <div>
      <button>{userExists ? `Existe el usuario: ${userName}` : 'No existe el usuario'}</button>
      <span>{message}</span>
    </div>
  );
}

export default NombrarUsuario;
