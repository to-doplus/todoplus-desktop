/*
** To-Do Plus
** Logout.tsx
** @author Miroslav Safar (xsafar23)
*/

import React, { useEffect, useState } from "react"
import { Navigate } from "react-router"
import CenterWrapper from "../components/CenterWrapper"
import Loading from "../components/Loading"
import { logout } from "../data/user_actions"

/**
 * Logout page
 * Logouts user and redirects to Login page
 * @component
 */
const Logout = () => {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await logout();
            setLoading(false);
        })();
    });

    if (isLoading) {
        return (
            <div className="loading">
                <CenterWrapper>
                    <Loading />
                </CenterWrapper>
            </div>
        )
    }

    return <Navigate to={"/login"} />
}

export default Logout
