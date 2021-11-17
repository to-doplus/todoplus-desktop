import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Layout from "../../src/components/Layout";
import TaskListList from "../components/TaskListList";
const Home = () : ReactElement => {
    return (
        <Layout>
            <h1>Home</h1>
            <Link to="/settings">
                Settings Page
            </Link>
            <TaskListList />
        </Layout>
    );
}

export default Home