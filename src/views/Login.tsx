import React, { Fragment, ReactElement, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useInput } from "../../src/hooks/input";

const Login = (): ReactElement => {
    const [username, setUsername, bindUsername] = useInput("");
    const [password, setPassword, bindPassword] = useInput("");
    const [error, setError] = useState(null);

    const handleLoginButton = useCallback(async () => {
       // const success : boolean = await (username, password);
       // if(success)
    }, [username, password]);

    return (
        <div className="login-layout">
            <div className="login-form">
                <div className="logo-img" />
                <h1 style={{ textAlign: "center" }}>Přihlášení</h1>
                <input className="login-input" placeholder="Uživatelské jméno" {...bindUsername}></input>
                <input className="login-input" placeholder="Heslo" {...bindPassword}></input>
                {error ? <div>Nesprávné uživatelské jméno nebo heslo.</div> : <Fragment />}
                <button className="login-button" onClick={handleLoginButton}>Přihlásit se</button>
                <Link to="/register" className="small-text">Nemáš ještě účet? Zaregistruj se!</Link>
            </div>
        </div>
    )
}


export default Login