import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@material-ui/core";

function Login() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://picsum.photos/420" alt="" />
            </div>
            <Button onClick={() => loginWithRedirect()}>Acceder con Auth0</Button>
        </div>
    );
}

export default Login;
