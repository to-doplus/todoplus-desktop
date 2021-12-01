import React, {Fragment, ReactElement} from "react"
import TaskListRow from "./TaskListRow";

const BuildInTaskLists = () : ReactElement => {
    return (
        <div>
            <TaskListRow displayName="My day" color="#AAAAA" taskListId={-1} url="/myday" icon="far fa-sun" />
            <TaskListRow displayName="Important" color="#c83741" taskListId={-1} url="/important" icon="far fa-star"/>
        </div>
    )
}

export default BuildInTaskLists;