import React, { Fragment, ReactElement, useState } from "react";
import { createNewTask, completeTask, uncompleteTask, deleteTask } from "../data/actions";
import { Task, TaskStatus } from "../../lib/models";
import { useTasksByTaskList } from "../data/hooks";
import TaskDetails from "./TaskDetails";
import { useInput } from "../hooks/input";
import Button from "./Button";

export interface TasksProps {
    taskListId: number,
    displayName: string,
    description: string
}

const Tasks = (props: TasksProps): ReactElement => {
    const { isLoading, isError, data: tasks } = useTasksByTaskList(Number(props.taskListId));
    const [selected, setSelected] = useState<number>(-1);
    const [taskName, setName, bindName] = useInput("");

    //TODO Nějakej state, podle čeho budeme řadit

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error??</div>
    }

    const progressTasks : Task[] = tasks.filter(task => !task.completeTime).sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));
    const completedTasks : Task[] = tasks.filter(task => task.completeTime).sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));

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

    const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Task name: " + taskName + " , id: " + props.taskListId);
        e.preventDefault();
        const success = await createNewTask(props.taskListId, taskName);
        if (success) {
            setName("");
        }
    }

    const createTaskByButton = async () => {
        console.log("Task name: " + taskName + " , id: " + props.taskListId);
        const success = await createNewTask(props.taskListId, taskName);
        if (success) {
            setName("");
        }
    }


    const getTaskIcon = (taskId: number, taskStatus: string): ReactElement => {
        let icon;
        if (taskStatus === "INPROGRESS") {
            icon = "fa-circle";
        } else {
            //nefunguje
            icon = "fa-check-circle";
        }
        return (
            <div className="taskDetailsTaskComplete" onClick={() => setTaskCompleted(taskId, taskStatus)}>
                <i className={`far fa-lg ${icon}`} />
            </div>
        )
    }

    const setTaskCompleted = async (taskId: number, taskStatus: string) => {
        if (taskStatus === "INPROGRESS") {
            console.log("Task completed!");
            const success = await completeTask(props.taskListId, taskId);
            if (success) {
                //TODO
            }
        } else {
            console.log("Task uncompleted!");
            //uncompleteTask neni implementovana
            const success = await uncompleteTask(props.taskListId, taskId);
            if (success) {
                //TODO
            }
        }

    }

    const taskDelete = async (taskId: number) => {
        console.log("Deleting task id: " + taskId);
        const success = await deleteTask(props.taskListId, taskId)
        if (success) {
            //TODO
        }

    }


    const selectedTask: Task = tasks.find(tsk => tsk.id === selected);

    return (
        <div className="taskListPage">
            <h1>{props.displayName}</h1>
            <h4>{props.description}</h4>
            {progressTasks.map(task => (
                <div className="taskBox" key={task.id} onClick={() => { select(task.id) }}>
                    <div className="icon">
                        {getTaskIcon(task.id, task.status)}
                    </div>
                    <div className="content">
                        {task.title}
                    </div>
                    <div className="buttonToDelete">
                        <Button className="hiddenButtonDelete" onClick={() => taskDelete(task.id)}>x</Button>
                    </div>
                </div>
            ))}
            {completedTasks.map(task => (
                <div className="taskBox" key={task.id} onClick={() => { select(task.id) }}>
                    <div className="icon">
                        {getTaskIcon(task.id, task.status)}
                    </div>
                    <div className="content">
                        {task.title}
                    </div>
                    <div className="buttonToDelete">
                        <Button className="hiddenButtonDelete" onClick={() => taskDelete(task.id)}>x</Button>
                    </div>
                </div>
            ))}
            {selectedTask ? <TaskDetails taskListId={props.taskListId} task={selectedTask} /> : <Fragment />}
            {<div className="inputContainer">
                <div className="icon">
                    <Button className="hiddenButton" onClick={createTaskByButton}><i className="fas fa-plus"></i></Button>
                </div>
                <form onSubmit={(e) => { createTask(e) }}>
                    <input
                        type="text"
                        name="taskName"
                        className="taskAddTask"
                        placeholder="Add task..."
                        {...bindName}
                        onChange={(e) => { setName(e.target.value) }}
                    >
                    </input>
                </form>


            </div>}

        </div>
    )

}

export default Tasks;
