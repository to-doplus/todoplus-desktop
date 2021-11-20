import React, { Fragment, ReactElement, useState } from "react";
import { useTasksByTaskList } from "../data/hooks";
import TaskDetails from "./TaskDetails";

export interface TasksProps {
    taskListId: number
}

const Tasks = (props: TasksProps) : ReactElement => {
    const {isLoading, isError, data: tasks} = useTasksByTaskList(Number(props.taskListId));
    const [selected, setSelected] = useState(null);


    if(isLoading) {
        return <div>Loading...</div>
    }

    {/*
      * let taskDetails = <Fragment />
      * if(selected != null) {
      *     let taskDetails = <TaskDetails task={tasks[0]} />
      * }
      */}

    return (
        <div>
            {tasks.filter(task => !task.completeTime).map(task => (
                <div key={task.id}>
                    {task.title}
                </div>
            ))}
            <TaskDetails taskListId={props.taskListId} task={tasks.filter(task => task.id === 1)[0]}/>
        </div>
    )

}

export default Tasks;
