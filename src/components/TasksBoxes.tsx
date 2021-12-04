// autor: Misa

import React, { MouseEvent, ReactElement, useCallback } from "react";
import { setImportance } from "../data/taskActions";
import { completeTask, removeTaskFromMyDay, uncompleteTask } from "../data/subtask_actions";
import { Importance, Task, TaskStatus } from "../../lib/models";
import TaskCompleteIcon from "./taskdetails/TaskCompleteIcon";
import TaskImportanceIcon from "./taskdetails/TaskImportanceIcon";
import { addTaskToMyDay } from "../data/actions";
import { setTaskImportance, getTaskImportanceIconColor } from "./taskdetails/TaskImportanceIcon";

export interface TasksBoxesProps {
  className: string,
  task: Task,
}

const TasksBoxes = (props: TasksBoxesProps): ReactElement => {

  const setTaskCompleted = useCallback(async (e: MouseEvent, task: Task) => {
    e.stopPropagation();
    const success = props.task.status === "INPROGRESS" ? await completeTask(props.task.taskListId, task.id) : await uncompleteTask(props.task.taskListId, task.id)
    if (!success) {
      alert("Something went wrong!");
    }
  }, [props.task.status, props.task.taskListId, props.task.id]);

  const changeMyDay = useCallback(async () => {
    let ret;
    if (props.task.myDay === false) {
      ret = await addTaskToMyDay(props.task.taskListId, props.task.id);
    } else {
      ret = await removeTaskFromMyDay(props.task.taskListId, props.task.id);
    }
    if (!ret) {
      console.error("ERROR: Adding or removing a task from My day failed.");
      alert("Something went wrong!");
    }
  }, [props.task.myDay, props.task.taskListId, props.task.id]);

  return (
    <div className={props.className}>
      <div className="icon">
        <TaskCompleteIcon status={props.task.status} className="taskDetailsTaskComplete" onClick={(e: MouseEvent) => setTaskCompleted(e, props.task)} />
      </div>
      <div className="content">
        {props.task.title}
      </div>
      <div className="taskButtons">
        <div className={`buttonMyDay ${props.task.myDay ? "buttonMyDayToggle" : ""}`}
          onClick={(e) => { e.stopPropagation(); changeMyDay() }}>
          <i className="buttonMyDayIcon fas fa-sun fa-lg" />
        </div>
        <div className="buttonSetImportance">
          <TaskImportanceIcon className="taskImportanceIcon" 
              taskImportance={props.task.importance} 
              color={getTaskImportanceIconColor(props.task)} 
              onClick={(e: MouseEvent) => setTaskImportance(e, props.task)} />
        </div>
      </div>
    </div>

  )
}


export default TasksBoxes;
