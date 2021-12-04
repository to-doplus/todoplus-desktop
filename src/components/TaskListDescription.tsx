// autor: Misa

import React, { useState, useEffect, MouseEventHandler, ReactElement, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import { setTaskListDescription } from "../data/taskActions";
import { useInput } from "../hooks/input";

export interface TaskListDescriptionProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
    className?: string;
    displayDescription: string;
    taskListId: number;
    editable: boolean
}

const loseFocus = () => {
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
    }
}

const TaskListDescription = (props: TaskListDescriptionProps): ReactElement => {
    const [taskDescription, setTaskDescription, bindTaskDescription] = useInput(props.displayDescription || "");

    useEffect(() => {
        setTaskDescription(props.displayDescription);
    }, [props.displayDescription || ""])

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

    if(!props.editable) {
        return (
            <h4>{props.displayDescription}</h4>
        )
    }
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