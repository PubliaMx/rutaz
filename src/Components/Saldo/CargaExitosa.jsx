import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function CargaExitosa() {
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const stripeDataString = searchParams.get('stripeData');

        try {
            const stripeData = JSON.parse(stripeDataString);
            console.log('Datos devueltos por Stripe:', stripeData);
            
            // Aquí puedes agregar cualquier otra lógica que necesites con los datos de Stripe
        } catch (error) {
            console.error('Error al parsear los datos de Stripe:', error);
        }
    }, [location]);

    return (
        <div>
            <h1>Carga Exitosa</h1>
            {/* Aquí puedes agregar cualquier otra información o diseño que desees mostrar */}
        </div>
    );
}

export default CargaExitosa;
