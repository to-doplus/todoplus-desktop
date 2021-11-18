import React, { ReactElement } from "react";
import { useTasksByTaskList } from "../data/hooks";

export interface TasksProps {
    taskListId: number
}

const Tasks = (props: TasksProps) : ReactElement => {
    const {isLoading, isError, data: tasks} = useTasksByTaskList(Number(props.taskListId));

    if(isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {tasks.filter(task => !task.completeTime).map(task => (
                <div key={task.id}>
                    {task.title}
                </div>
            ))}
        </div>
    )

}

export default Tasks;