import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function CargarSaldo() {
    const [cantidad, setCantidad] = useState('');
    const [saldoRestante, setSaldoRestante] = useState('');
    const { isAuthenticated, isLoading, user } = useAuth0();

    const handlePagar = async () => {
        try {
            const res = await fetch('http://localhost:3033/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity: cantidad }) // Include user's nick in the request body
            });
            const data = await res.json();
            console.log(data);
            window.location.href = data.url;
        } catch (error) {
            console.error('Error al cargar saldo:', error);
        }
    };

    const handleChangeCantidad = (event) => {
        const cantidadIngresada = parseFloat(event.target.value);
        setCantidad(cantidadIngresada);

        // Calcula el saldo restante después de la tarifa de Stripe
        const tarifaStripe = calcularTarifaStripe(cantidadIngresada);
        const saldo = cantidadIngresada - tarifaStripe;
        setSaldoRestante(saldo.toFixed(2)); // Redondea a 2 decimales
    };

    // Función para calcular la tarifa de Stripe
    const calcularTarifaStripe = (monto) => {
        const tarifa = monto * 0.036 + 3.00;
        return tarifa;
    };

    return (
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
            <div>
                <h1>Usuario: {user && user.email}</h1>
                <p>Saldo restante después de la tarifa de Stripe: ${saldoRestante}</p>
            </div>
        </div>
    );
}

export default CargarSaldo;
