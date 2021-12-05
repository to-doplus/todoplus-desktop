// To-Do Plus
// LogoutButton.tsx
// @author Miroslav Safar (xsafar23)

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

/**
 * LogoutButton Component
 * Styled button that forwards to logout page to logout
 * @component
 */
const LogoutButton = () => {
    return (
        <Link to={"/logout"}>
            <div className="logout-button">
                <div className="icon" style={{ color: `white` }}><FontAwesomeIcon icon="sign-out-alt" /></div>
                Logout
            </div>
        </Link>
    )
}

export default LogoutButton