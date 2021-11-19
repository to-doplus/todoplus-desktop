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

    let taskDetails = <Fragment />
    if(selected != null) {
        taskDetails = <TaskDetails task={tasks[0]} />
    }

    return (
        <div>
            {tasks.filter(task => !task.completeTime).map(task => (
                <div key={task.id}>
                    {task.title}
                </div>
            ))}
            {taskDetails}
        </div>
    )

}

export default Tasks;