import React, { Fragment, MouseEvent, ReactElement, useState } from "react";
import { createNewTask, completeTask, uncompleteTask, deleteTask } from "../data/actions";
import { Task, TaskStatus } from "../../lib/models";
import { useTasksByTaskList } from "../data/hooks";
import TaskDetails from "./TaskDetails";
import { useInput } from "../hooks/input";
import Button from "./Button";
import TaskCompleteIcon from "./taskdetails/TaskCompleteIcon";

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

    const completedTasks : Task[] = tasks.filter(task => task.completeTime).sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));
    const progressTasks : Task[] = tasks.filter(task => !task.completeTime).sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));

    {/*
      * let taskDetails = <Fragment />
      * if(selected != null) {
      *     let taskDetails = <TaskDetails task={tasks[0]} />
      * }
      */}
    const select = (e: MouseEvent, taskId: number) => {
        e.stopPropagation();
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


    const getTaskIcon = (taskId: number, taskStatus: TaskStatus): ReactElement => {
        return (
            <TaskCompleteIcon status={taskStatus} className="taskDetailsTaskComplete" onClick={(e: MouseEvent) => setTaskCompleted(e, taskId, taskStatus)} />
        )
    }

    const setTaskCompleted = async (e: MouseEvent, taskId: number, taskStatus: string) => {
        e.stopPropagation();
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
    console.log(selectedTask);

    return (
        <div className="taskListPage" onClick={(e: MouseEvent) => { select(e, -1) }}>
            <h1>{props.displayName}</h1>
            <h4>{props.description}</h4>
            {progressTasks.map(task => (
                <div className="taskBox" key={task.id} onClick={(e: MouseEvent) => { select(e, task.id) }}>
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
                <div className="taskBox" key={task.id} onClick={(e: MouseEvent) => { select(e, task.id) }}>
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
            {selectedTask ? <TaskDetails key={selectedTask.id} taskListId={props.taskListId} task={selectedTask} /> : <Fragment />}
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
