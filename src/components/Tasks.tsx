import React, { Fragment, MouseEvent, ReactElement, useState, useCallback, useEffect } from "react";

import { deleteTask, setImportance, setTaskListTitle } from "../data/taskActions";
import { Importance, Task, TaskList, TaskStatus } from "../../lib/models";
import { useTasksByTaskList } from "../data/hooks";
import TaskDetails from "./TaskDetails";
import { useInput } from "../hooks/input";
import Button from "./Button";
import MenuList from "./MenuList";
import TaskListTitle from "./TaskListTitle";
import { createNewTask } from "../data/actions";
import CenterWrapper from "./CenterWrapper";
import Loading from "./Loading";
import { openTaskListPropsMenuMessage, openTaskPropsMenuMessage } from "../ipc/ipcMessages";
import { sendIpcMessage } from "../renderer";
import TasksBoxes from "./TasksBoxes"

//TODO: rozclenit na komponenty

export interface TasksProps {
    taskList: TaskList,
    isLoading: boolean,
    isError: boolean,
    tasks: Task[],
}

const showPopupMenu = (e: MouseEvent, taskList: TaskList) => {
    e.preventDefault();
    e.stopPropagation();
    sendIpcMessage(window.electron.ipcRenderer, openTaskListPropsMenuMessage(taskList));
}

const showTaskPopupMenu = (e: MouseEvent, task: Task) => {
    e.preventDefault();
    e.stopPropagation();
    sendIpcMessage(window.electron.ipcRenderer, openTaskPropsMenuMessage(task));
}

const Tasks = (props: TasksProps): ReactElement => {
    const [selected, setSelected] = useState<number>(-1);
    const [taskName, setName, bindName] = useInput("");


    //TODO Nějakej state, podle čeho budeme řadit

    if (props.isLoading) {
        return (
            <CenterWrapper>
                <Loading />
            </CenterWrapper>
        )
    }

    if (props.isError) {
        return <div>Error??</div>
    }

    const completedTasks: Task[] = props.tasks.filter(task => task.completeTime).sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));
    const progressTasks: Task[] = props.tasks.filter(task => !task.completeTime).sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));

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
    };

    const createTask = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Task name: " + taskName + " , id: " + props.taskList.id);
        e.preventDefault();
        const success = await createNewTask(props.taskList.id, taskName);
        if (success) {
            setName("");
        }
    }

    const createTaskByButton = async () => {
        console.log("Task name: " + taskName + " , id: " + props.taskList.id);
        const success = await createNewTask(props.taskList.id, taskName);
        if (success) {
            setName("");
        }
    }

    const selectedTask: Task = props.tasks.find(tsk => tsk.id === selected);
    console.log(selectedTask);

        //TODO: komponenta pro ongoing tasks a pro completed tasks 
    return (
        <div className="taskListLayout">
            <div className="taskListPage" onClick={(e: MouseEvent) => { select(e, -1) }}>
                <div className="taskNameAndList">
                    <TaskListTitle className="taskTitleRenameBox" displayName={props.taskList.displayName} taskListId={props.taskList.id}></TaskListTitle>
                    <div className="taskMenuList">
                        <button onClick={(e: MouseEvent) => showPopupMenu(e, props.taskList)}>···</button>
                    </div>
                </div>
                <h4>{props.taskList.description}</h4>
                {progressTasks.map(task => (
                <div key={task.id} onClick={(e: MouseEvent) => { select(e, task.id) }} onContextMenu={(e: MouseEvent) => showTaskPopupMenu(e, task)}>
                <TasksBoxes className="taskBox" tasks={props.tasks} taskId={task.id} taskStatus={task.status} taskImportance={task.importance} taskTitle={task.title} ></TasksBoxes>
                </div>
                ))}
                {completedTasks.map(task => (
                    <div key={task.id} onClick={(e: MouseEvent) => { select(e, task.id) }} >
                <TasksBoxes className="taskBoxCompleted" tasks={props.tasks} taskId={task.id} taskStatus={task.status} taskImportance={task.importance} taskTitle={task.title}></TasksBoxes>
                </div>
                ))}
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
            {selectedTask ? <TaskDetails key={selectedTask.id} taskListId={selectedTask.taskListId} task={selectedTask} /> : <Fragment />}
        </div>
    )

}

export default Tasks;
