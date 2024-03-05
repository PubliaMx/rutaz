import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

function TuSaldo() {
    const { user } = useAuth0();
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {
        const fetchSaldo = async () => {
            try {
                const response = await axios.post('http://localhost:80/juego/api/saldo.php', {
                    mail: user.email,
                    type: 'cuanto_efectivo'
                });
                const data = response.data;
                if (data.exists) {
                    setSaldo(data.balance);
                } else {
                    console.log('El usuario no existe');
                }
            } catch (error) {
                console.error('Error al obtener el saldo:', error);
            }
        };

        if (user && user.email) {
            fetchSaldo();
        }
    }, [user]);

    return (
        saldo
    );
}

export default TuSaldo;
