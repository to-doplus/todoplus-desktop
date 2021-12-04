// autor: Misa

import React, { MouseEvent, ReactElement } from "react";
import { createNewTask } from "../data/actions";
import Button from "./Button";
import { useInput } from "../hooks/input";


export interface InputContainerProps {
    className: string,
    taskListId: number,
}

const InputContainer = (props: InputContainerProps): ReactElement => {

    const [taskName, setName, bindName] = useInput("");

    const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Task name: " + taskName + " , id: " + props.taskListId);
        e.preventDefault();
        const success = await createNewTask(props.taskListId, taskName);
        if (success) {
            setName("");
        }
    }

    const createTaskByButton = async () => {
        console.log("Task name: " + taskName + " , id: " + props.taskListId);
        const success = await createNewTask(props.taskListId, taskName);
        if (success) {
            setName("");
        }
    }


    return (
        <div className={props.className}>
            <div className="icon">
                <Button className="hiddenButton" onClick={createTaskByButton}><i className="fas fa-plus"></i></Button>
            </div>
            <form onSubmit={(e) => { createTask(e) }}>
                <input
                    type="text"
                    name="taskName"
                    className="taskAddTask"
                    placeholder="Add task..."
                    {...bindName}
                    onChange={(e) => { setName(e.target.value) }}
                >
                </input>
            </form>
        </div>

    )
}


export default InputContainer;