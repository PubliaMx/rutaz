import React from "react";
import { io } from "socket.io-client";
import { useState } from "react";
import { useEffect } from "react";
import { UlMensajes, LiMensaje } from './MovementsUl';


//import the server and port for the movements communication from the .env file
const server = process.env.REACT_APP_MOVEMENTS_SERVER;
const port = process.env.REACT_APP_MOVEMENTS_PORT;

//creating the socket connection
const socket = io(`${server}:${port}`);


function Movements(){

    const [isConnected, setIsConnected] = useState(false); 
    const [newMovement, setNewMovement] = useState('');
    const [movements, setMovements] = useState([]);


    useEffect(() => {

        socket.on('connect', () => setIsConnected(true));
        socket.on('stream_movement', (data)=> {
        setMovements(movements => [...movements, data]);
        });

        return () => {
            socket.off('connect');
            socket.off('stream_movement');
        }

        
     }, [] );

     const sendMovement = () => {
        socket.emit('stream_movement', {
            user: socket.id,
            movement: newMovement
        });
     }

    return (
        <div>
                <br></br><br></br><br></br><br></br><br></br><br></br>
            <h2>Movimientos</h2>
            <h2>{isConnected ? 'Conectado' : 'No conectado'}
            </h2>
            <UlMensajes>
                {movements.map(movement => (
                    <LiMensaje>{movement.user}: {movement.movement}</LiMensaje>
                ))}
                
            </UlMensajes>
            <input
                type="text"
                onChange={e => setNewMovement(e.target.value)}
            />
            <button onClick={sendMovement}>Enviar</button>

        </div>
    );
}

export default Movements;