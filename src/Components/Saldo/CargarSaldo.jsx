import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function CargarSaldo() {
    const [cantidad, setCantidad] = useState('');
    const [saldoRestante, setSaldoRestante] = useState('');
    const [stripeData, setStripeData] = useState(null);
    const [error, setError] = useState('');
    const { isAuthenticated, user, loginWithRedirect } = useAuth0();

    const handlePagar = async () => {
        if (!isAuthenticated) {
            loginWithRedirect();
            return;
        }

        try {
            if (cantidad < 50) {
                alert('El monto mínimo a cargar es de $50');
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
            console.log('Respuesta de Stripe:', data);
            setStripeData(data);
            window.location.href = data.url;
        } catch (error) {
            console.error('Error al cargar saldo:', error);
            setError('Error al cargar saldo. Inténtelo de nuevo más tarde.');
        }
    };

    const handleChangeCantidad = (event) => {
        const cantidadIngresada = parseFloat(event.target.value);
        setCantidad(cantidadIngresada);

        const tarifaStripe = calcularTarifaStripe(cantidadIngresada);
        const saldo = cantidadIngresada - tarifaStripe;
        setSaldoRestante(saldo.toFixed(2));
    };

    const calcularTarifaStripe = (monto) => {
        const tarifa = monto * 0.036 + 3.00;
        return tarifa;
    };

    useEffect(() => {
        const fetchData = async () => {
            if (stripeData) {
                try {
                    const response = await fetch('http://localhost:80/juego/api/agregar_saldo.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            type: 'abono',
                            cuanto_efectivo: stripeData.amountNet,
                            mail: user.email
                        })
                    });
                    const data = await response.json();
                    console.log('Respuesta de la API:', data);
                    // Almacena los datos de Stripe en el estado
                    setStripeData(data);

                    if (data.success !== true) {
                        alert('Error al guardar en la base de datos.');
                    }
                } catch (error) {
                    console.error('Error al cargar saldo en nuestra API:', error);
                    setError('Error al cargar saldo en nuestra API. Inténtelo de nuevo más tarde.');
                }
            }
        };

        fetchData();
    }, [stripeData]);

    useEffect(() => {
        console.log('Datos de Stripe:', stripeData);
    }, [stripeData]);

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
