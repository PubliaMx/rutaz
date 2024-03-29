import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function CargarSaldo() {
    const [cantidad, setCantidad] = useState('');
    const [saldoRestante, setSaldoRestante] = useState('');
    const [error, setError] = useState('');
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (cantidad !== '') {
            const tarifaStripe = calcularTarifaStripe(parseFloat(cantidad));
            const saldo = parseFloat(cantidad) - tarifaStripe;
            setSaldoRestante(saldo.toFixed(2));
        }
    }, [cantidad]);

    const handlePagar = async () => {
        if (!isAuthenticated) {
            loginWithRedirect();
            return;
        }

        try {
            if (cantidad < 50) {
                setError('El monto mínimo a cargar es de $50');
                return;
            }

            const res = await fetch('http://localhost:3033/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: cantidad })
            });
            const data = await res.json();
            console.log('Respuesta de la API de Stripe:', data);

            if (data.error) {
                setError(data.error);
                return;
            }

            // Redirigir al usuario al checkout de Stripe
            window.location.href = data.session.url;

        } catch (error) {
            console.error('Error al cargar saldo:', error);
            setError('Error al cargar saldo. Inténtelo de nuevo más tarde.');
        }
    };

    const handleChangeCantidad = (event) => {
        setCantidad(event.target.value);
    };

    const calcularTarifaStripe = (monto) => {
        const tarifa = monto * 0.036 + 3.00;
        return tarifa;
    };

    return (
        <div>
            {!isAuthenticated && (
                <div>
                    <p>Por favor inicia sesión para cargar saldo.</p>
                    <button onClick={() => loginWithRedirect()}>Iniciar sesión</button>
                </div>
            )}
            {isAuthenticated && (
                <div>
                    <input 
                        type="number" 
                        id="cantidad" 
                        placeholder="Cantidad a pagar" 
                        value={cantidad} 
                        onChange={handleChangeCantidad} 
                    />
                    <button id="checkout" onClick={handlePagar}>
                        Pagar
                    </button>
                    {error && <p>{error}</p>}
                    <div>
                        <h1>Usuario: {user && user.email}</h1>
                        <p>Saldo restante después de la tarifa de Stripe: ${saldoRestante}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CargarSaldo;
