import React, { useEffect, useState, useRef } from "react";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";
import EncabezadoChat from "../Components/Chat/EncabezadoChat";
import Mensaje from "../Components/Chat/Mensaje";
import { AddCircle } from "@material-ui/icons";
import firebaseApp from "../firebase/credenciales";

const firestore = getFirestore(firebaseApp);

function ChatScreen({ canalActivo, usuario }) {
  const [inputMensaje, setInputMensaje] = useState("");
  const [listaMensajes, setListaMensajes] = useState([]);
  const anchor = useRef();

  function filtrarContenido(textoOriginal) {
    const groserías = ["tonto", "hdp", "mk"];
    const array = textoOriginal.split(" ");
    array.forEach((palabra, index) => {
      if (groserías.includes(palabra)) {
        array[index] = "****";
      }
    });
    return array.join(" ");
  }

  function enviarMensaje(e) {
    e.preventDefault();
    const mensajeFiltrado = filtrarContenido(inputMensaje);
    const nuevoMensaje = {
      foto: usuario.picture,
      usuario: usuario.name,
      mensaje: mensajeFiltrado,
      id: new Date().getTime(),
    };

    // Actualizar el estado localmente agregando el nuevo mensaje
    setListaMensajes((prevMensajes) => [...prevMensajes, nuevoMensaje]);

    // Guardar el nuevo mensaje en la base de datos
    const docuRef = doc(
      firestore,
      `canales/${canalActivo}/mensajes/${nuevoMensaje.id}`
    );
    setDoc(docuRef, nuevoMensaje)
      .then(() => console.log('Mensaje guardado en la base de datos'))
      .catch((error) => console.error('Error al guardar el mensaje:', error));

    setInputMensaje("");
    anchor.current.scrollIntoView({ behavior: "smooth" });
  }

  async function getListaMensajes() {
    console.log('Iniciando consulta de mensajes...');
    const mensajesArr = [];
    const coleccionRef = collection(
      firestore,
      `canales/${canalActivo}/mensajes`
    );
    const mensajesJeroglificos = await getDocs(coleccionRef);
    mensajesJeroglificos.forEach((mensaje) => {
      mensajesArr.push(mensaje.data());
    });
    setListaMensajes([...mensajesArr]);
    console.log('Consulta de mensajes finalizada');
  }

  useEffect(() => {
    getListaMensajes();
  }, [canalActivo]);

  useEffect(() => {
    console.log('Iniciando verificación de usuario...');
    // Aquí realiza la verificación de usuario con Stripe y obtén los datos necesarios
    console.log('Verificación de usuario finalizada');

    // Aquí realiza la llamada a la API de la base de datos
    console.log('Iniciando llamada a la API de la base de datos...');
    // Llama a tu API para obtener los datos
    // Supongamos que la respuesta de la API es un objeto llamado `datosBD`
    const datosBD = {
      // datos obtenidos de la base de datos
    };
    if (Object.keys(datosBD).length === 0) {
      console.log('No se encontraron datos devueltos por la API de la base de datos');
    } else {
      console.log('Datos obtenidos de la API de la base de datos:', datosBD);
    }
  }, []);

  return (
    <div className="chat">
      <EncabezadoChat nombreCanal={canalActivo || "Ingreso"} />
      <div className="chat__messages">
        {listaMensajes ? (
          listaMensajes.map((mensaje) => {
            return <Mensaje key={mensaje.id} mensajeFirebase={mensaje} />;
          })
        ) : (
          <p>No hay mensajes</p>
        )}
        <div ref={anchor} style={{ marginBottom: "75px" }}></div>
      </div>
      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form onSubmit={enviarMensaje}>
          <input
            type="text"
            disabled={!canalActivo}
            value={inputMensaje}
            onChange={(e) => setInputMensaje(e.target.value)}
            placeholder={`Enviar mensaje a #${canalActivo || ""}`}
          />
          {/* Expresión ternaria para renderizar el botón "Unirme al juego" dependiendo del valor de canalActivo */}
          {canalActivo !== "Ingreso" && (
            <button
              disabled={!canalActivo}
              className="chat__inputButton"
              type="submit"
            >
              <h4> Unirme al juego !! </h4>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ChatScreen;
