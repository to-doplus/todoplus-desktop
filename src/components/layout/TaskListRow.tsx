// To-Do Plus
// TaskListRow.tsx
// @author Miroslav Safar (xsafar23)

import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { TaskList } from "../../../lib/models";

export interface TaskListRowProps {
    taskListId: number
    displayName: string
    color: string
    selected?: boolean,
    icon?: string,
    url?: string
    showPopupMenu?: (e: MouseEvent, taskListId: number) => void
}

const TaskListRow = (props: TaskListRowProps) : ReactElement => {
    let name = props.displayName
    if(name && name.length > 19) {
        name = name.substr(0, 16) + "..."
    }

    return (
        <Link to={`${props.url ? props.url : `/tasklists/${props.taskListId}`}`}>
            <div className="tasklist" onContextMenu={props.showPopupMenu ? (e : any) => {props.showPopupMenu(e, props.taskListId)} : null}>
                <div className="icon" style={{color: `${props.color}`}}><i className={`${props.icon ? props.icon : "fas fa-list"}`}></i></div>
                {name}
            </div>
        </Link>
    )
}

export default TaskListRow