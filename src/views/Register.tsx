import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useInput } from "../hooks/input";

const Login = (): ReactElement => {
    const [username, setUsername, bindUsername] = useInput("");
    const [email, setEmail, bindEmail] = useInput("");
    const [password, setPassword, bindPassword] = useInput("");


    return (
        <div className="login-layout">
            <div className="login-form">
                <div className="logo-img"/>
                <h1 style={{textAlign: "center"}}>Registrace</h1>
                <input className="login-input" placeholder="Uživatelské jméno" {...bindUsername}></input>
                <input className="login-input" placeholder="E-Mail" {...bindEmail}></input>
                <input className="login-input" placeholder="Heslo" {...bindPassword}></input>
                <button className="login-button">Zaregistrovat se</button>
                <Link to="/login" className="small-text">Už máš účet? Přihlaš se!</Link>
            </div>
        </div>
    )
}


export default Login