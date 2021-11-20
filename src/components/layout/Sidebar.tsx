import React, { ReactElement, useState } from "react";
import Divider from "../Divider";
import BuildInTaskLists from "./BuildInTaskLists";
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
                <div className="newTaskList">
                    <div className="icon">
                        <i className="fas fa-plus"></i>
                    </div>
                    Nový seznam
                    <div className="icon" style={{marginLeft: "auto"}}>
                        <i className="fas fa-clipboard-list"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar