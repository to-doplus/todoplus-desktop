/*
** To-Do Plus
** Home.tsx
** @author Michaela Pařilová (xparil04)
*/

import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import TaskListList from "../components/layout/TaskListList";
import TaskDetails from "../components/taskDetails/TaskDetails";
import NewTaskListButton from "../components/layout/NewTaskListButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = (): ReactElement => {
    return (
        <Layout backgroundClass="taskListViewBg" >
            <div className="titles">
                <h1>To-Do Plus</h1>
                <h2>I made a huge to do list for today. I just can't figure out who's going to do it.</h2>
                <div className="subtitles">
                    <h3>Getting started:</h3>
                    <div className="newTaskList">
                        <NewTaskListButton />
                    </div>
                    <h3>Current version:</h3>
                    <span className="version">
                        1.0.0. - {window.navigator.platform}
                    </span>
                    <h3>Tips:</h3>
                    <span className="tips">
                        The color of your task list icon can be changed by clicking the left mouse button on the  <FontAwesomeIcon icon={["fas", "ellipsis-h"]} size={"lg"} /> icon and selecting color change option.
                    </span>
                </div>
            </div>

        </Layout>
    );
}

export default Home
