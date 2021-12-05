/*
** To-Do Plus
** TaskListDescription.tsx
** @author Michaela Parilova (xparil04)
*/

import React, { useState, useEffect, MouseEventHandler, ReactElement, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import { setTaskListDescription } from "../../data/taskActions";
import { useInput } from "../../hooks/input";

export interface TaskListDescriptionProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
    className?: string;
    displayDescription: string;
    taskListId: number;
    editable: boolean
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
** TaskListDescription component
** Input field which changes task list description by submitting new
** description
**
** @component
*/
const TaskListDescription = (props: TaskListDescriptionProps): ReactElement => {
    const [taskDescription, setTaskDescription, bindTaskDescription] = useInput(props.displayDescription || "");

    useEffect(() => {
        setTaskDescription(props.displayDescription || "");
    }, [props.displayDescription])

    /**
    ** @brief Change task list description
    **
    ** @param e: Form Event
    */
    const renameTaskListDescription = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.displayDescription !== taskDescription) {
            console.log("Changing subtask title from '" + props.displayDescription + "' to '" + taskDescription + "'");
            const success = await setTaskListDescription(props.taskListId, taskDescription);
            if (!success) {
                alert("Something went wrong!");
            }
        }
    }, [props.taskListId, taskDescription]);

    //Builtin tasks lists does not have editable task description
    if(!props.editable) {

        /*
        ** Rendering
        */
        return (
            <h4>{props.displayDescription}</h4>
        )
    }

    /*
    ** Rendering
    */
    return (
        <div className={`button ${props.className ? props.className : ""}`}>
            <form className="taskFormBox"
                onSubmit={(e) => { renameTaskListDescription(e); loseFocus() }}>
                <input type="text" required spellCheck="false" placeholder="Add task list description..." {...bindTaskDescription} />
            </form>
        </div>
    )
}

export default TaskListDescription;
