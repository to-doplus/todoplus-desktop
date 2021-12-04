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
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const ShowCompletedTasks = (props: ShowCompletedTasks): ReactElement => {

    const [selected, setSelected] = useState<number>(-1);

    const select = (e: MouseEvent, taskId: number) => {
        e.stopPropagation();
        if (selected === taskId) {
            setSelected(-1);
            return;
        }
        setSelected(taskId);
    };


    return (
        <div>
            {
                props.completedTasks.map(task => (
                    <div key={task.id} onClick={(e) => { select(e, task.id) }} >
                        <TasksBoxes className="taskBoxCompleted" task={task} />
                    </div>
                ))
            }
        </div>
    )
}


export default ShowCompletedTasks;
