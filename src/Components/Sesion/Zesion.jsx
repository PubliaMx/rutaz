 
 import { useAuth0 } from '@auth0/auth0-react';
 import GoogleLogin from 'react-google-login';
 import ReactDOM from 'react-dom';
 import LoginButton from './LoginButton_Google';
import LogoutButton from './LogoutButton_google';
import './sesion.css';

import React from "react";
import { Button } from "@material-ui/core";

import firebaseApp from "../../firebase/credenciales";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
const auth = getAuth(firebaseApp);
const gProvider = new GoogleAuthProvider();

function Sesion() {
  function logInConGoogle() {
    signInWithRedirect(auth, gProvider);
  }

  return (
    <div className="login">
      <div className="login__logo">
        <img src="https://picsum.photos/420" alt="" />
      </div>
      <Button onClick={logInConGoogle}>Acceder con Google</Button>
    </div>
  );
}

export default Sesion;