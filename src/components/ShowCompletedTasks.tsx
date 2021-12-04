// autor: Misa

import React, { MouseEvent, ReactElement, useState, MouseEventHandler } from "react";
import { createNewTask } from "../data/actions";
import Button from "./Button";
import { useInput } from "../hooks/input";
import { Task, TaskList } from "../../lib/models";
import TasksBoxes from "./TasksBoxes"


export interface ShowCompletedTasks {
    className?: string,
    completedTasks: Task[],
    onClick?: MouseEventHandler<HTMLDivElement>,
    select: (e: MouseEvent, taskId: number) => void
}

const ShowCompletedTasks = (props: ShowCompletedTasks): ReactElement => {

    return (
        <div>
            {
                props.completedTasks.map(task => (
                    <div key={task.id} onClick={(e) => { props.select(e, task.id) }} >
                        <TasksBoxes className="taskBoxCompleted" task={task}></TasksBoxes>
                    </div>
                ))
            }
        </div>
    )
}


export default ShowCompletedTasks;
