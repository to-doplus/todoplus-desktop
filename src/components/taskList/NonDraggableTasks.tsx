/*
** To-Do Plus
** NonDraggableTasks.tsx
** @author Michaela Parilova (xparil04)
*/

import React, { MouseEvent, ReactElement, useState, MouseEventHandler } from "react";
import { createNewTask } from "../../data/actions";
import Button from "../Button";
import { useInput } from "../..//hooks/input";
import { Task, TaskList } from "../../../lib/models";
import TasksBoxes from "./TasksBoxes"
import { sendIpcMessage } from "../../renderer";
import { openTaskPropsMenuMessage } from "../../ipc/ipcMessages";


export interface NonDraggableTasksProps {
    className?: string,
    tasks: Task[],
    onClick?: MouseEventHandler<HTMLDivElement>,
    select: (e: MouseEvent, taskId: number) => void
    selected: number
}

const showTaskPopupMenu = (e: MouseEvent, task: Task) => {
    e.preventDefault();
    e.stopPropagation();
    sendIpcMessage(window.electron.ipcRenderer, openTaskPropsMenuMessage(task));
}

const NonDraggableTasks = (props: NonDraggableTasksProps): ReactElement => {

    return (
        <div>
            {
                props.tasks.map(task => (
                    <div key={task.id} onClick={(e) => { props.select(e, task.id) }} onContextMenu={(e: MouseEvent) => showTaskPopupMenu(e, task)} >
                        <TasksBoxes className={`${task.completeTime ? "taskBoxCompleted" : "taskBox"} ${task.id === props.selected ? "selected" : ""}`} task={task} key={task.id}></TasksBoxes>
                    </div>
                ))
            }
        </div>
    )
}


export default NonDraggableTasks;
