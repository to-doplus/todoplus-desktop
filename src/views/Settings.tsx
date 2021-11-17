import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

const Settings = () : ReactElement => {
    return (
        <div>
            <h1>Settings</h1>
            <Link to="/">
                <a>Home Page</a>
            </Link>
        </div>
    );
}

export default Settings