import React, {Fragment, ReactElement} from "react"
import TaskListRow from "./TaskListRow";

const BuildInTaskLists = () : ReactElement => {
    return (
        <div>
            <TaskListRow displayName="Můj den" color="#AAAAA" taskListId={-1} url="/myday" icon="far fa-sun" />
            <TaskListRow displayName="Důležité" color="#c83741" taskListId={-1} url="/important" icon="far fa-star"/>
        </div>
    )
}

export default BuildInTaskLists;