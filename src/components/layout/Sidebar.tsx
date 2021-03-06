/*
** To-Do Plus
** Sidebar.tsx
** @author Miroslav Safar (xsafar23)
*/

import React, { ReactElement, useState } from "react";
import Divider from "../Divider";
import BuildInTaskLists from "./BuiltInTaskLists";
import NewTaskListButton from "./NewTaskListButton";
import TaskListList from "./TaskListList";

import Settings from "../settings/Settings";
import LogoutButton from "./LogoutButton";

/**
 * Sidebar Component
 * Component that contains logout button, settings,
 * buildtasks links and tasklist with new tasklist button
 * @component
 */
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
