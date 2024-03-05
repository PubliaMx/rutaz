import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function CargarSaldo() {
    const [cantidad, setCantidad] = useState('');
    const [saldoRestante, setSaldoRestante] = useState('');
    const [error, setError] = useState('');
    const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();

    const handlePagar = async () => {
        if (!isAuthenticated) {
            // Redirigir al usuario a la página de inicio de sesión si no está autenticado
            loginWithRedirect();
            return;
        }

        try {
            // Verificar si la cantidad es mayor o igual a 50
            if (cantidad < 50) {
                alert('El monto mínimo a cargar es de $50');
                return;
            }

            const resStripe = await fetch('http://localhost:3033/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: cantidad }) // Incluir el correo electrónico del usuario en el cuerpo de la solicitud
            });
            const dataStripe = await resStripe.json();
            console.log('Respuesta de Stripe:', dataStripe);
            
            const resCargarSaldo = await fetch('http://localhost:80/juego/api/cargar_saldo.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'abono',
                    cuantoefectivo: dataStripe.monto,
                    user: user.email
                })
            });
            const dataCargarSaldo = await resCargarSaldo.json();
            console.log('Respuesta de cargar saldo:', dataCargarSaldo);
            
            // Redirigir a la URL proporcionada por Stripe
            window.location.href = dataStripe.url;
        } catch (error) {
            console.error('Error al cargar saldo:', error);
            setError('Error al cargar saldo. Inténtelo de nuevo más tarde.');
        }
    };

    const handleChangeCantidad = (event) => {
        const cantidadIngresada = parseFloat(event.target.value);
        setCantidad(cantidadIngresada);

        // Calcular el saldo restante después de la tarifa de Stripe
        const tarifaStripe = calcularTarifaStripe(cantidadIngresada);
        const saldo = cantidadIngresada - tarifaStripe;
        setSaldoRestante(saldo.toFixed(2)); // Redondear a 2 decimales
    };

    // Función para calcular la tarifa de Stripe
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
