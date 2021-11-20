import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { createNewTaskList } from "../../data/actions";
import { useInput } from "../../hooks/input";
import { useTaskLists } from "../../data/hooks";
import Button from "../Button";
import TaskListRow from "./TaskListRow";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TaskListListProps {

}

const TaskListList = (props: TaskListListProps) : ReactElement => {
    const { isLoading, isError, data: taskLists} = useTaskLists();
    //const [ taskListName, setName, bindName ] = useInput("");

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error</div>
    }

   /* const create = async () => {
        const success = await createNewTaskList(taskListName);
        if(success) {
            setName("");
        }
    }*/

    return (
        <div>
            {taskLists.map(taskList => {
                return (
                    <TaskListRow taskListId={taskList.id} color={taskList.color} displayName={taskList.displayName} />
                )
            })}
           {/* <div>
                <input name={"taskListName"} type="text"
                        className={``}
                        id="taskListName-input" placeholder={"Nový seznam"} {...bindName}></input>
                <Button onClick={create}>+</Button>
            </div>
           */}
        </div>
    );
}

export default TaskListList
