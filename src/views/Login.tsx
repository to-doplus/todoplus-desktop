import React, { Fragment, ReactElement, useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useInput } from "../../src/hooks/input";
import CenterWrapper from "../components/CenterWrapper";
import Loading from "../components/Loading";
import Overlay from "../components/Overlay";
import { isAuthenticated, loadAuthTokenFromKeyTar, login } from "../data/actions";
import { history } from "../store"

const Login = (): ReactElement => {
    const [username, setUsername, bindUsername] = useInput("");
    const [password, setPassword, bindPassword] = useInput("");
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const handleLoginButton = useCallback(async () => {
        const success: boolean = await login(username, password);
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
            <div className="login-form">
                <div className="logo-img" />
                <h1 style={{ textAlign: "center" }}>Přihlášení</h1>
                <input className="login-input" placeholder="Uživatelské jméno" {...bindUsername}></input>
                <input className="login-input" placeholder="Heslo" type="password" {...bindPassword}></input>
                {error ? <div>Nesprávné uživatelské jméno nebo heslo.</div> : <Fragment />}
                <button className="login-button" onClick={handleLoginButton}>Přihlásit se</button>
                <Link to="/register" className="small-text">Nemáš ještě účet? Zaregistruj se!</Link>
            </div>
        </div>
    )
}


export default Login