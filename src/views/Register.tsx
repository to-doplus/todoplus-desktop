// To-Do Plus
// Register.tsx
// @author Miroslav Safar (xsafar23)

import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import CenterWrapper from "../components/CenterWrapper";
import Loading from "../components/Loading";
import { isAuthenticated, loadAuthTokenFromKeyTar, register } from "../data/user_actions";
import { useInput } from "../hooks/input";
import { history } from "../store"

const Login = (): ReactElement => {
    const [username, setUsername, bindUsername] = useInput("");
    const [email, setEmail, bindEmail] = useInput("");
    const [password, setPassword, bindPassword] = useInput("");

    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const handleRegisterButton = useCallback(async () => {
        const success: boolean = await register(username, email, password);
        if (success) {
            history.push("/");
            return;
        }
        setError(true);
    }, [username, password]);

    const auth = isAuthenticated();

    useEffect(() => {
        (async () => {
            if (auth || await loadAuthTokenFromKeyTar()) {
                await history.push("/")
                return;
            }
            setLoading(false);
        })()
    }, [])

    if (isLoading) {
        return (
            <div className="loading">
                <CenterWrapper>
                    <Loading />
                </CenterWrapper>
            </div>
        )
    }

    return (
        <div className="login-layout">
            <form className="login-form" onSubmit={(e) => {e.preventDefault();handleRegisterButton()}}>
                <div className="logo-img"/>
                <h1 style={{textAlign: "center"}}>Registrace</h1>
                <input className="login-input" placeholder="Uživatelské jméno" {...bindUsername}></input>
                <input className="login-input" placeholder="E-Mail" {...bindEmail}></input>
                <input className="login-input" placeholder="Heslo" type="password" {...bindPassword}></input>
                <button className="login-button" onClick={handleRegisterButton}>Zaregistrovat se</button>
                <Link to="/login" className="small-text">Už máš účet? Přihlaš se!</Link>
            </form>
        </div>
    )
}


export default Login