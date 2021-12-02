import React, { ReactElement, useState } from "react";
import { logout } from "../../data/actions";
import Divider from "../Divider";
import BuildInTaskLists from "./BuildInTaskLists";
import NewTaskListButton from "./NewTaskListButton";
import TaskListList from "./TaskListList";
import {history} from "../../store"

const handleLogout = async () => {
    await logout()
    history.push("/login");
}

const Sidebar = () : ReactElement => {
    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <div>
                    <div onClick={() => handleLogout()}>Logout</div>
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