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
}

const TaskListRow = (props: TaskListRowProps) : ReactElement => {
    return (
        <Link to={`${props.url ? props.url : `/tasklists/${props.taskListId}`}`}>
            <div className="tasklist">
                <div className="icon" style={{color: `${props.color}`}}><i className={`${props.icon ? props.icon : "fas fa-list"}`}></i></div>
                {props.displayName}
            </div>
        </Link>
    )
}

export default TaskListRow