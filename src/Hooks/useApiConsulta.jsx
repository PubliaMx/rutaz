import { useState, useEffect } from "react";
import axios from "axios";

const useApiConsulta = (ruta, parametros) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(ruta, parametros);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Limpieza del efecto
    return () => {
      // Lógica de limpieza si es necesario
    };
  }, [ruta, parametros]);

  return { data, loading, error };
};

export default useApiConsulta;
