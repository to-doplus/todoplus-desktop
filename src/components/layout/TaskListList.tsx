import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { createNewTaskList } from "../../data/actions";
import { useInput } from "../../hooks/input";
import { useTaskLists } from "../../data/hooks";
import Button from "../Button";
import TaskListRow from "./TaskListRow";

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
                    <TaskListRow taskListId={taskList.id} color={taskList.color} displayName={taskList.displayName} key={taskList.id}/>
                )
            })}
        </div>
    );
}

export default TaskListList
