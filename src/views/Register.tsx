/*
** To-Do Plus
** Register.tsx
** @author Miroslav Safar (xsafar23)
*/

import React, { Fragment, ReactElement, useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import CenterWrapper from "../components/CenterWrapper";
import Loading from "../components/Loading";
import { isAuthenticated, loadAuthTokenFromKeyTar, register } from "../data/user_actions";
import { useInput } from "../hooks/input";
import { history } from "../store"

/**
 * Register Page
 * @component
 */
const Register = (): ReactElement => {
    const [username, setUsername, bindUsername] = useInput("");
    const [email, setEmail, bindEmail] = useInput("");
    const [password, setPassword, bindPassword] = useInput("");

    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const handleRegisterButton = useCallback(async () => {
        if (!username || username === "") {
            setError("Please fill username.");
            return;
        } else if (!email || email === "") {
            setError("Please fill email.");
            return;
        } else if (!password || password === "") {
            setError("Please fill password.");
            return;
        }
        const success: boolean = await register(username, email, password);
        if (success) {
            history.push("/");
            return;
        }
        setError("Username is already taken.");
    }, [username, password]);

    const auth = isAuthenticated();

    // Redirect user to home page, if he is logged in
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
            <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleRegisterButton() }}>
                <div className="logo-img" />
                <h1 style={{ textAlign: "center" }}>Sign up!</h1>
                <input className="login-input" placeholder="Username" {...bindUsername}></input>
                <input className="login-input" placeholder="E-Mail" {...bindEmail}></input>
                <input className="login-input" placeholder="Password" type="password" {...bindPassword}></input>
                {error ? <div>{error}</div> : <Fragment />}
                <button className="login-button" type="submit">Sign up</button>
                <Link to="/login" className="small-text">Have an account? Log In here!</Link>
            </form>
        </div>
    )
}


export default Register
