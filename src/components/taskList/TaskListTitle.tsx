/*
** To-Do Plus
** TaskListTitle.tsx
** @author Michaela Parilova (xparil04)
*/

import React, { useState, useEffect, MouseEventHandler, ReactElement, useRef, useImperativeHandle, forwardRef } from "react";
import { setTaskListTitle } from "../../data/taskActions";

export interface TaskListTitleProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
    className?: string;
    displayName: string;
    taskListId: number;
}

/**
** @brief Lose focus of a form after it is submitted
*/
const loseFocus = () => {
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
    }
}

/**
** TaskListTitle component
** Input field which changes task list title by submitting new
** title
**
** @component
*/
const TaskListTitle = (props: TaskListTitleProps): ReactElement => {

    /*
    ** States
    */
    const [taskListName, setTaskTitle] = useState(props.displayName);

    useEffect(() => {
        setTaskTitle(props.displayName);
    }, [props.displayName])

    /**
    ** @brief Rename task list title
    **
    ** @param e: Form Event
    */
    const renameTaskList = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.displayName !== taskListName) {
            console.log("Changing subtask title from '" + props.displayName + "' to '" + taskListName + "'");
            const success = await setTaskListTitle(props.taskListId, taskListName);
            if (!success) {
                alert("Something went wrong!");
            }
        }
    }

    if (props.taskListId !== -1) {

        /*
        ** Rendering
        */
        return (
            <div className={`button ${props.className ? props.className : ""}`}>
                <form className="taskFormBox"
                    onSubmit={(e) => { renameTaskList(e); loseFocus() }}>
                    <input type="text"
                        required value={taskListName}
                        spellCheck="false"
                        onChange={(e) => { setTaskTitle(e.target.value) }} ></input>
                </form>
            </div>
        )
    }

    //Builtin tasks lists does not have editable task list name
    else {

        /*
        ** Rendering
        */
        return (
            <h1>{props.displayName}</h1>
        )
    }
}

export default TaskListTitle;
