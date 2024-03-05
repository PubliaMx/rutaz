// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyDDGPmEbb3FNUO15ZGSj-7ScobGknSy7xM",
  authDomain: "chat-fe582.firebaseapp.com",
  projectId: "chat-fe582",
  storageBucket: "chat-fe582.appspot.com",
  messagingSenderId: "736298726656",
  appId: "1:736298726656:web:efd2d5c3098bcd4e362fe5",
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
