import React, { Fragment, ReactElement, useState, ChangeEvent } from "react";
import { createNewTask } from "../data/actions";
import { Task } from "../../lib/models";
import { useTasksByTaskList } from "../data/hooks";
import TaskDetails from "./TaskDetails";
import { useInput } from "../hooks/input";
import Button from "./Button";

export interface TasksProps {
    taskListId: number
}

const Tasks = (props: TasksProps): ReactElement => {
    const { isLoading, isError, data: tasks } = useTasksByTaskList(Number(props.taskListId));
    const [selected, setSelected] = useState<number>(-1);
    const [taskName, setName, bindName] = useInput("");


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


    const getTaskIcon = (taskStatus: string): ReactElement => {
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

    const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Adding a new subtask: " + taskName + " , id: " + props.taskListId);
        e.preventDefault();
        const success = await createNewTask(props.taskListId, taskName);
        if (success) {
            setName("");
        }
      }




    const selectedTask: Task = tasks.find(tsk => tsk.id === selected);

    return (
        <div>
            {tasks.filter(task => !task.completeTime).map(task => (
                <div className="taskBox" key={task.id} onClick={() => { select(task.id) }}>
                    <div className="icon">
                        {getTaskIcon(task.status)}
                    </div>
                    <div className="content">
                        {task.title}
                    </div>
                </div>
            ))}
            {selectedTask ? <TaskDetails taskListId={props.taskListId} task={selectedTask} /> : <Fragment />}
            {<div className="inputContainer">
                <div className="icon">
                    <i className="fas fa-plus"></i>
                </div>
                <form onSubmit={(e) => {createTask(e)}}>
                <input
                    type="text"
                    name="taskName"
                    className="taskAddTask"
                    placeholder="Add task..."
                    {...bindName}
                    onChange={(e) => {setName(e.target.value)}}
                    >
                </input>
                </form>

            </div>}

        </div>
    )

}

export default Tasks;
