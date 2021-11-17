import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTaskLists } from "../client";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TaskListListProps {

}

const TaskListList = (props: TaskListListProps) : ReactElement => {
    const { isLoading, isError, data: taskLists} = useTaskLists();

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error</div>
    }

    return (
        <div>
            {taskLists.map(taskList => {
                return (
                    <Link to={`/tasklists/${taskList.id}`}>{taskList.displayName}</Link>
                )
            })}
        </div>
    );
}

export default TaskListList