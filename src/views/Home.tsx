import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import TaskListList from "../components/layout/TaskListList";
import TaskDetails from "../components/taskDetails/TaskDetails";
import NewTaskListButton from "../components/layout/NewTaskListButton"

const Home = (): ReactElement => {
    return (
        <Layout backgroundClass="taskListViewBg" >
            <div className="titles">
                <h1>To-Do Plus</h1>
                <h2>I made a huge to do list for today. I just can't figure out who's going to do it.</h2>
                <div className="subtitles">
                    <h3>Getting started:</h3>
                    <NewTaskListButton/>
                    <h3>Tips:</h3>
                    Super important tips haha, changing color etc.
                </div>
            </div>

        </Layout>
    );
}

export default Home
