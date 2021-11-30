import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useInput } from "../../src/hooks/input";

const Login = (): ReactElement => {
    const [username, setUsername, bindUsername] = useInput("");
    const [password, setPassword, bindPassword] = useInput("");


    return (
        <div className="login-layout">
            <div className="login-form">
                <div className="logo-img"/>
                <h1 style={{textAlign: "center"}}>Přihlášení</h1>
                <input className="login-input" placeholder="Uživatelské jméno" {...bindUsername}></input>
                <input className="login-input" placeholder="Heslo" {...bindPassword}></input>
                <button className="login-button">Přihlásit se</button>
                <Link to="/register" className="small-text">Nemáš ještě účet? Zaregistruj se!</Link>
            </div>
        </div>
    )
}


export default Login