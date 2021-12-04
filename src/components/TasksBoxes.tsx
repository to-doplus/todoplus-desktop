// autor: Misa

import React, { MouseEvent, ReactElement, useCallback } from "react";
import { setImportance } from "../data/taskActions";
import { completeTask, removeTaskFromMyDay, uncompleteTask } from "../data/subtask_actions";
import { Importance, Task, TaskStatus } from "../../lib/models";
import TaskCompleteIcon from "./taskdetails/TaskCompleteIcon";
import TaskImporatnceIcon from "./taskdetails/TaskImportanceIcon";
import { addTaskToMyDay } from "../data/actions";

export interface TasksBoxesProps {
  className: string,
  taskListId: number,
  taskId: number,
  taskStatus: TaskStatus,
  taskImportance: Importance,
  taskMyDay: boolean,
  taskTitle: string,
}

const TasksBoxes = (props: TasksBoxesProps): ReactElement => {

  const setTaskImportance = async (e: MouseEvent) => {
    e.stopPropagation();

    if (props.taskImportance === "LOW") {
      const success = await setImportance(props.taskListId, props.taskId, "NORMAL");
      if (!success) {
        alert("Something went wrong!");
      }
    }
    else if (props.taskImportance === "NORMAL") {
      const success = await setImportance(props.taskListId, props.taskId, "HIGH");
      if (!success) {
        alert("Something went wrong!");
      }
    }
    else if (props.taskImportance === "HIGH") {
      const success = await setImportance(props.taskListId, props.taskId, "LOW");
      if (!success) {
        alert("Something went wrong!");
      }
    }
    console.log("Importance of task id: " + props.taskId + " is " + props.taskImportance);

  }

  const getTaskImportanceIcon = (taskId: number, taskImportance: Importance, taskStatus: TaskStatus): ReactElement => {
    let color;
    if (taskStatus === "INPROGRESS") {
      if (taskImportance === "LOW") {
        color = "white";
      } else if (taskImportance === "NORMAL") {
        color = "goldenrod";
      } else if (taskImportance === "HIGH") {
        color = "darkred";
      }
    } else {
      if (taskImportance === "LOW") {
        color = "grey";
      } else if (taskImportance === "NORMAL") {
        color = "grey";
      } else if (taskImportance === "HIGH") {
        color = "black";
      }
    }

    return <TaskImporatnceIcon taskImportance={taskImportance} color={color} className="taskImportanceIcon" onClick={(e: MouseEvent) => setTaskImportance(e)} />
  }

  const setTaskCompleted = useCallback(async (e: MouseEvent, taskId: number, taskStatus: string) => {
    e.stopPropagation();
    const success = props.taskStatus === "INPROGRESS" ? await completeTask(props.taskListId, taskId) : await uncompleteTask(props.taskListId, taskId)
    if (!success) {
      alert("Something went wrong!");
    }
  }, [props.taskStatus, props.taskListId, props.taskId]);

  const changeMyDay = useCallback(async () => {
    let ret;
    if (props.taskMyDay === false) {
      ret = await addTaskToMyDay(props.taskListId, props.taskId);
    } else {
      ret = await removeTaskFromMyDay(props.taskListId, props.taskId);
    }
    if (!ret) {
      console.error("ERROR: Adding or removing a task from My day failed.");
      alert("Something went wrong!");
    }
  }, [props.taskMyDay, props.taskListId, props.taskId]);

  return (
    <div className={props.className}>
      <div className="icon">
        <TaskCompleteIcon status={props.taskStatus} className="taskDetailsTaskComplete" onClick={(e: MouseEvent) => setTaskCompleted(e, props.taskId, props.taskStatus)} />
      </div>
      <div className="content">
        {props.taskTitle}
      </div>
      <div className="taskButtons">
        <div className={`buttonMyDay ${props.taskMyDay ? "buttonMyDayToggle" : ""}`}
          onClick={(e) => { e.stopPropagation(); changeMyDay() }}>
          <i className="buttonMyDayIcon fas fa-sun fa-lg" />
        </div>
        <div className="buttonSetImportance">
          {getTaskImportanceIcon(props.taskId, props.taskImportance, props.taskStatus)}
        </div>
      </div>
    </div>

  )
}


export default TasksBoxes;
