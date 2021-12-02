import React, { Fragment, ReactElement, ReactNode, useEffect } from "react"
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../data/actions";

export interface AuthProps {
    children?: ReactNode
}

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