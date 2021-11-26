import React, { Fragment, ReactElement, useState } from "react";
import { createNewTask } from "../data/actions";
import { Task } from "../../lib/models";
import { useTasksByTaskList } from "../data/hooks";
import TaskDetails from "./TaskDetails";

export interface TasksProps {
    taskListId: number
}

const Tasks = (props: TasksProps): ReactElement => {
    const { isLoading, isError, data: tasks } = useTasksByTaskList(Number(props.taskListId));
    const [selected, setSelected] = useState<number>(-1);


    if (isLoading) {
        return <div>Loading...</div>
    }

    {/*
      * let taskDetails = <Fragment />
      * if(selected != null) {
      *     let taskDetails = <TaskDetails task={tasks[0]} />
      * }
      */}
    const select = (taskId: number) => {
        if (selected === taskId) {
            setSelected(-1);
            return;
        }
        setSelected(taskId);
    }
  

    const getTaskCompleteIcon = (taskStatus: string): ReactElement => {
        let icon;
        if (taskStatus === "INPROGRESS") {
            icon = "fa-circle";
        } else {
            icon = "fa-check-circle";
        }
        return (
            <div className="taskDetailsTaskComplete">
                <i className={`far fa-lg ${icon}`} />
            </div>
        )
    }


    

    const selectedTask: Task = tasks.find(tsk => tsk.id === selected);

    return (
        <div>
            {tasks.filter(task => !task.completeTime).map(task => (
                <div className="taskBox" key={task.id} onClick={() => { select(task.id) }}>
                    <div className="icon">
                        {getTaskCompleteIcon(task.status)}
                    </div>
                    <div className="content">
                        {task.title}
                    </div>
                </div>
            ))}
            {selectedTask ? <TaskDetails taskListId={props.taskListId} task={selectedTask} /> : <Fragment />}
            <div className="inputContainer">
                    <div className="icon">
                        <i className="fas fa-plus"></i>
                    </div>
                    <input
                        type="text"
                        className="taskAddTask"
                        placeholder="Add task..."

                    />
                </div>

        </div>
    )

}

export default Tasks;
