import React, { Fragment, ReactElement, useState } from "react";
import { Task } from "../../lib/models";
import { useTasksByTaskList } from "../data/hooks";
import TaskDetails from "./TaskDetails";

export interface TasksProps {
    taskListId: number
}

const Tasks = (props: TasksProps) : ReactElement => {
    const {isLoading, isError, data: tasks} = useTasksByTaskList(Number(props.taskListId));
    const [selected, setSelected] = useState<number>(-1);


    if(isLoading) {
        return <div>Loading...</div>
    }

    {/*
      * let taskDetails = <Fragment />
      * if(selected != null) {
      *     let taskDetails = <TaskDetails task={tasks[0]} />
      * }
      */}
    const select = (taskId: number) => {
        if(selected === taskId){
            setSelected(-1);
            return;
        }
        setSelected(taskId);
    }

    const selectedTask : Task = tasks.find(tsk => tsk.id === selected);

    return (
        <div>
            {tasks.filter(task => !task.completeTime).map(task => (
                <div key={task.id} onClick={() => {select(task.id)}}>
                    {task.title}
                </div>
            ))}
            {selectedTask ? <TaskDetails taskListId={props.taskListId} task={selectedTask}/> : <Fragment />}
            
        </div>
    )

}

export default Tasks;
