import React, { Fragment, MouseEvent, ReactElement, useState, useCallback, useEffect } from "react";
import { deleteTask, setImportance, setTaskListTitle } from "../data/taskActions";
import { Importance, Task, TaskList, TaskStatus } from "../../lib/models";
import { useTasksByTaskList } from "../data/hooks";
import TaskDetails from "./TaskDetails";
import { useInput } from "../hooks/input";
import Button from "./Button";
import TaskCompleteIcon from "./taskdetails/TaskCompleteIcon";
import TaskImporatnceIcon from "./taskdetails/TaskImportanceIcon";
import MenuList from "./MenuList";
import TaskListTitle from "./TaskListTitle";
import { createNewTask } from "../data/actions";
import { completeTask, uncompleteTask } from "../data/subtask_actions";
import CenterWrapper from "./CenterWrapper";
import Loading from "./Loading";
import { openTaskListPropsMenuMessage, openTaskPropsMenuMessage } from "../ipc/ipcMessages";
import { sendIpcMessage } from "../renderer";

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

    const setTaskCompleted = async (e: MouseEvent, taskId: number, taskStatus: string) => {
        e.stopPropagation();
        const task = props.tasks.find(tsk => tsk.id == taskId);
        if (!task) return;

        if (taskStatus === "INPROGRESS") {
            console.log("Task completed!");
            const success = await completeTask(task.taskListId, taskId);
            if (!success) {
                alert("Something went wrong!");
            }
        } else {
            console.log("Task uncompleted!");
            const success = await uncompleteTask(task.taskListId, taskId);
            if (!success) {
                alert("Something went wrong!");
            }
        }

    }

    // co delat s low importance?
    const setTaskImportance = async (e: MouseEvent, taskId: number, taskImportance: Importance) => {
        e.stopPropagation();
        const task = props.tasks.find(tsk => tsk.id == taskId);
        if (!task) return;

        if (taskImportance === "NORMAL") {
            const success = await setImportance(task.taskListId, taskId, "HIGH");
            if (!success) {
                alert("Something went wrong!");
            }
        }
        else if (taskImportance === "HIGH") {
            const success = await setImportance(task.taskListId, taskId, "NORMAL");
            if (!success) {
                alert("Something went wrong!");
            }
        }
        console.log("Importance of task id: " + taskId + " is " + taskImportance);

    }

    const getTaskImportanceIcon = (taskId: number, taskImportance: Importance): ReactElement => {
        const color: string = taskImportance === "HIGH" ? "goldenrod" : "white";
        return (
            <TaskImporatnceIcon taskImportance={taskImportance} color={color} className="taskImportanceIcon" onClick={(e: MouseEvent) => setTaskImportance(e, taskId, taskImportance)} />
        )
    }

    const selectedTask: Task = props.tasks.find(tsk => tsk.id === selected);
    console.log(selectedTask);

    return (
        <div className="taskListLayout">
            <div className="taskListPage" onClick={(e: MouseEvent) => { select(e, -1) }}>
                <div className="taskNameAndList">
                    <TaskListTitle className="taskTitleRenameBox" displayName={props.taskList.displayName} taskListId={props.taskList.id}></TaskListTitle>
                    <div className="taskMenuList" onClick={(e: MouseEvent) => showPopupMenu(e, props.taskList)}>
                        {/*
                        <MenuList taskListId={1}></MenuList>
                        */}
                    </div>
                </div>
                <button onClick={(e: MouseEvent) => showPopupMenu(e, props.taskList)}>Popup Menu YAY!</button>
                <h4>{props.taskList.description}</h4>
                {progressTasks.map(task => (
                    <div className="taskBox" key={task.id} onClick={(e: MouseEvent) => { select(e, task.id) }} onContextMenu={(e: MouseEvent) => { showTaskPopupMenu(e, task) }}>
                        <div className="icon">
                            <TaskCompleteIcon status={task.status} className="taskDetailsTaskComplete" onClick={(e: MouseEvent) => setTaskCompleted(e, task.id, task.status)} />
                        </div>
                        <div className="content">
                            {task.title}
                        </div>
                        <div className="buttonSetImportance">
                            {getTaskImportanceIcon(task.id, task.importance)}
                        </div>
                    </div>
                ))}
                {completedTasks.map(task => (
                    <div className="taskBoxCompleted" key={task.id} onClick={(e: MouseEvent) => { select(e, task.id) }}>
                        <div className="icon">
                            <TaskCompleteIcon status={task.status} className="taskDetailsTaskComplete" onClick={(e: MouseEvent) => setTaskCompleted(e, task.id, task.status)} />
                        </div>
                        <div className="content">
                            {task.title}
                        </div>
                        <div className="buttonSetImportance">
                            <TaskImporatnceIcon taskImportance={task.importance} color={"grey"} className="taskImportanceIcon" />
                        </div>
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
