/*
** To-Do Plus
** Auth.tsx
** @author Miroslav Safar (xsafar23)
*/

import React, { Fragment, ReactElement, ReactNode, useEffect } from "react"
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../data/user_actions";

export interface AuthProps {
    children?: ReactNode
}

/**
 * Auth Component
 * Children cannot be accessed without authorization.
 * If the user is not log in, it forwards to login page
 * @component
 */
const Auth = (props: AuthProps) : ReactElement => {

    const auth = isAuthenticated();

    if(!auth) {
        return <Navigate to="/login" />
    }

    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}


export default Auth
