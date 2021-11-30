import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import TaskListList from "../components/layout/TaskListList";
import TaskDetails from "../components/TaskDetails";

const Home = () : ReactElement => {
    return (
        <Layout>
            <h1>Home</h1>
            <Link to="/settings">
                Settings Page
            </Link>
            <Link to="/login">
                Login Page
            </Link>
     {/*      <TaskDetails/> --> */}
        </Layout>
    );
}

export default Home
