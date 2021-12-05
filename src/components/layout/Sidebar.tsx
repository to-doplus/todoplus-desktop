// To-Do Plus
// Sidebar.tsx
// @author Miroslav Safar (xsafar23)

import React, { ReactElement, useState } from "react";
import Divider from "../Divider";
import BuildInTaskLists from "./BuildInTaskLists";
import NewTaskListButton from "./NewTaskListButton";
import TaskListList from "./TaskListList";

import Settings from "../Settings";
import LogoutButton from "./LogoutButton";

const Sidebar = () : ReactElement => {
    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <div> {/* Div for separation of body of sidebar and the footer button */}
                    <LogoutButton />
                    <Settings />
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
