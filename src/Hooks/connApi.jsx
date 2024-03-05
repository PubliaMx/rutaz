// useApi.js
import { useState, useEffect } from 'react';

function useApi() {
  const [apiUrl, setApiUrl] = useState(null);
  const [apiPort, setApiPort] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const apiPort = process.env.REACT_APP_API_PORT;

    setApiUrl(apiUrl);
    setApiPort(apiPort);
  }, []);

  return { apiUrl, apiPort };
}

export default useApi;
