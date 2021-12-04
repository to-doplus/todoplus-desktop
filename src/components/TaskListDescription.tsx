// autor: Misa

import React, { useState, useEffect, MouseEventHandler, ReactElement, useRef, useImperativeHandle, forwardRef } from "react";
import { setTaskListDescription} from "../data/taskActions";

export interface TaskListDescriptionProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
    className?: string;
    displayDescription: string;
    taskListId: number;
}

const loseFocus = () => {
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
    }
}


const TaskListDescription = (props: TaskListDescriptionProps): ReactElement => {

    const [taskDescription, setTaskDescription] = useState(props.displayDescription);

    useEffect(() => {
        setTaskDescription(props.displayDescription);
    }, [props.displayDescription])

    const renameTaskListDescription = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.displayDescription !== taskDescription) {
            console.log("Changing subtask title from '" + props.displayDescription + "' to '" + taskDescription+ "'");
            const success = await setTaskListDescription(props.taskListId, taskDescription);
            if (!success) {
                alert("Something went wrong!");
            }
        }
    }

    if (props.taskListId !== -1) {
        return (
            <div className={`button ${props.className ? props.className : ""}`}>
                <form className="taskFormBox"
                    onSubmit={(e) => { renameTaskListDescription(e); loseFocus() }}>
                    <input type="text"
                        required value={taskDescription}
                        spellCheck="false"
                        placeholder="Add task list description..."
                        onChange={(e) => { setTaskDescription(e.target.value) }} ></input>
                </form>
            </div>
        )
    }
    else {
        return (
            <h4>{props.displayDescription}</h4>
        )
    }
}

export default TaskListDescription;