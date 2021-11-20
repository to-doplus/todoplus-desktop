import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const Settings = () : ReactElement => {
    return (
        <Layout>
            <h1>Settings</h1>
            <Link to="/">
                <a>Home Page</a>
            </Link>
        </Layout>
    );
}

export default Settings