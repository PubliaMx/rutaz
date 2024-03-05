import { useState } from 'react';
import axios from 'axios';

function useIsNamed() {
  const [isNamed, setIsNamed] = useState(true);

  const checkIsNamed = async () => {
    try {
      // Hacemos la solicitud a la API
      const response = await axios.post('http://localhost:80/juego/poleana_api.php', {
        auth: 'abcd' // Cambia 'abc' por el valor que desees verificar
      });
  
      // Verificamos la respuesta de la API
      if (response.data.exists) {
        // Si el usuario existe, verificamos si tiene un nombre
        setIsNamed(response.data.hasName);
      } else {
        // Si el usuario no existe, establecemos isNamed en false
        setIsNamed(true);
      }
    } catch (error) {
      console.error('Error al llamar a la API:', error);
      setIsNamed(true); // Si hay un error, establecemos isNamed en false
    }
  };

  return isNamed;
}

export default useIsNamed;
