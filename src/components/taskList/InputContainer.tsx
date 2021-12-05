/*
** To-Do Plus
** InputContainer.tsx
** @author Michaela Parilova (xparil04)
*/

import React, { MouseEvent, ReactElement } from "react";
import { createNewTask } from "../../data/actions";
import Button from "../Button";
import { useInput } from "../../hooks/input";


export interface InputContainerProps {
    className: string,
    taskListId: number,
}

/**
** Input container component determined for adding single task consisting of 'add button'
** and an input field, task is being submitted by hitting ENTER or pressing an
** 'add button'
**
** @component
*/
const InputContainer = (props: InputContainerProps): ReactElement => {

    const [taskName, setName, bindName] = useInput("");

    /**
    ** @brief Creates a new task with a task name that the user put in
    **
    ** @param e: Form Event
    */    
    const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Task name: " + taskName + " , id: " + props.taskListId);
        e.preventDefault();
        const success = await createNewTask(props.taskListId, taskName);
        if (success) {
            setName("");
        }
    }

    /**
    ** @brief Creates a new task with by clicking on button with task name that the user put in
    */  
    const createTaskByButton = async () => {
        console.log("Task name: " + taskName + " , id: " + props.taskListId);
        const success = await createNewTask(props.taskListId, taskName);
        if (success) {
            setName("");
        }
    }

    /*
    ** Rendering
    */

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
                    spellCheck="false"
                    {...bindName}
                    onChange={(e) => { setName(e.target.value) }}
                >
                </input>
            </form>
        </div>

    )
}


export default InputContainer;
