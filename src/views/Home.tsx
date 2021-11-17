import React, { ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskListList from "../components/TaskListList";
import { useTaskLists } from "../client";
const Home = () : ReactElement => {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/settings">
                Settings Page
            </Link>
            <TaskListList />
        </div>
    );
}

export default Home