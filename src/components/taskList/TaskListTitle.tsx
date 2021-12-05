// autor: Misa

import React, { useState, useEffect, MouseEventHandler, ReactElement, useRef, useImperativeHandle, forwardRef } from "react";
import { setTaskListTitle } from "../../data/taskActions";

export interface TaskListTitleProps {
    onClick?: MouseEventHandler<HTMLDivElement>;
    className?: string;
    displayName: string;
    taskListId: number;
}

const loseFocus = () => {
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
    }
}


const TaskListTitle = (props: TaskListTitleProps): ReactElement => {

    const [taskListName, setTaskTitle] = useState(props.displayName);

    useEffect(() => {
        setTaskTitle(props.displayName);
    }, [props.displayName])

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
    else {
        return (
            <h1>{props.displayName}</h1>
        )
    }
}

export default TaskListTitle;
