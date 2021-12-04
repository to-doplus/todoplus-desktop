// autor: Misa

import React, { MouseEvent, ReactElement } from "react";
import { setImportance } from "../data/taskActions";
import { completeTask, uncompleteTask } from "../data/subtask_actions";
import { Importance, Task, TaskStatus } from "../../lib/models";
import TaskCompleteIcon from "./taskdetails/TaskCompleteIcon";
import TaskImporatnceIcon from "./taskdetails/TaskImportanceIcon";



export interface TasksBoxesProps {
    className: string,
    taskId: number,
    taskStatus: TaskStatus,
    taskImportance: Importance,
    taskTitle: string,
    tasks: Task[],
}



const TasksBoxes = (props: TasksBoxesProps): ReactElement => {

    const setTaskImportance = async (e: MouseEvent, taskId: number, taskImportance: Importance) => {
        e.stopPropagation();
        const task = props.tasks.find(tsk => tsk.id == taskId);
        if (!task) return;

        if (taskImportance === "LOW") {
            const success = await setImportance(task.taskListId, taskId, "NORMAL");
            if (!success) {
                alert("Something went wrong!");
            }
        }
        else if (taskImportance === "NORMAL") {
            const success = await setImportance(task.taskListId, taskId, "HIGH");
            if (!success) {
                alert("Something went wrong!");
            }
        }
        else if (taskImportance === "HIGH") {
            const success = await setImportance(task.taskListId, taskId, "LOW");
            if (!success) {
                alert("Something went wrong!");
            }
        }
        console.log("Importance of task id: " + taskId + " is " + taskImportance);

    }

    const getTaskImportanceIcon = (taskId: number, taskImportance: Importance, taskStatus: TaskStatus): ReactElement => {
      let color;
      if(taskImportance === "LOW"){
        color = "white";
      }
      if(taskStatus === "INPROGRESS"){
        if (taskImportance === "NORMAL"){
          color = "goldenrod";
        } else if (taskImportance === "HIGH"){
          color = "darkred";
        }
      }else{
        if (taskImportance === "NORMAL"){
          color = "grey";
        } else if (taskImportance === "HIGH"){
          color = "black";
        }
      }

      return <TaskImporatnceIcon taskImportance={taskImportance} color={color} className="taskImportanceIcon" onClick={(e: MouseEvent) => setTaskImportance(e, taskId, taskImportance)} />
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



    return (
        <div className={props.className}>
            <div className="icon">
                <TaskCompleteIcon status={props.taskStatus} className="taskDetailsTaskComplete" onClick={(e: MouseEvent) => setTaskCompleted(e, props.taskId, props.taskStatus)} />
            </div>
            <div className="content">
                {props.taskTitle}
            </div>
            <div className="buttonSetImportance">
                {getTaskImportanceIcon(props.taskId, props.taskImportance, props.taskStatus)}
            </div>
        </div>

    )
}


export default TasksBoxes;
