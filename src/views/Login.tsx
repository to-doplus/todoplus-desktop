// To-Do Plus
// Login.tsx
// @author Miroslav Safar (xsafar23)

import React, { Fragment, ReactElement, useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useInput } from "../../src/hooks/input";
import CenterWrapper from "../components/CenterWrapper";
import Loading from "../components/Loading";
import { isAuthenticated, loadAuthTokenFromKeyTar, login } from "../data/user_actions";
import { history } from "../store"

const Login = (): ReactElement => {
    const [username, setUsername, bindUsername] = useInput(""); // Username input handler
    const [password, setPassword, bindPassword] = useInput(""); // Password input handler
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

    // If user if already logged in, redirect him to home page
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
            <form className="login-form" onSubmit={(e) => {e.preventDefault();handleLoginButton()}}>
                <div className="logo-img" />
                <h1 style={{ textAlign: "center" }}>Log In</h1>
                <input className="login-input" placeholder="Username" {...bindUsername}></input>
                <input className="login-input" placeholder="Password" type="password" {...bindPassword}></input>
                {error ? <div>Invalid username or password.</div> : <Fragment />}
                <button className="login-button" onClick={handleLoginButton}>Log In</button>
                <Link to="/register" className="small-text">Do not have an account? Register here!</Link>
            </form>
        </div>
    )
}


export default Login