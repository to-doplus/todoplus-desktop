import React, { ReactElement, useState } from "react";
import Divider from "../Divider";
import BuildInTaskLists from "./BuildInTaskLists";
import NewTaskListButton from "./NewTaskListButton";
import TaskListList from "./TaskListList";

const Sidebar = () : ReactElement => {
    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <div>
                    <BuildInTaskLists />
                    <Divider/>
                    <TaskListList />
                </div>
                <NewTaskListButton />
            </div>
        </div>
    )
}

export default Sidebar