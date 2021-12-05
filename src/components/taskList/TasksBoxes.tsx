// autor: Misa

import React, { MouseEvent, ReactElement, useCallback } from "react";
import { setImportance } from "../../data/taskActions";
import { completeTask, removeTaskFromMyDay, uncompleteTask } from "../../data/subtask_actions";
import { Importance, Task, TaskStatus } from "../../../lib/models";
import TaskCompleteIcon from "../taskDetails/TaskCompleteIcon";
import TaskImportanceIcon, { getTaskImportanceIconColor, setTaskImportance } from "../taskDetails/TaskImportanceIcon";
import { addTaskToMyDay } from "../../data/actions";
import Tooltip from "@material-ui/core/Tooltip";

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


  const getSubtasksCompleted = (): number => {
    return props.task.subTasks.filter(subtask => subtask.status === "COMPLETED").length;
  }

  const getSubtasksInprogress = (): number => {
    return props.task.subTasks.filter(subtask => subtask.status === "INPROGRESS").length;
  }

  const getPercentSubtasksCompleted = (): number => {
    const completed = getSubtasksCompleted();
    const inprogress = getSubtasksInprogress();
    let total = completed + inprogress;
    // Just to avoid dividing by zero:
    if(completed === 0){
      total = 1;
    }
    return Math.round(100 * completed / total);
  }

  return (
    <div className={props.className}>
      <div className="icon">
        <TaskCompleteIcon status={props.task.status} className="taskDetailsTaskComplete" onClick={(e: MouseEvent) => setTaskCompleted(e, props.task)} />
      </div>
      <div className="content">
        {props.task.title}
      </div>
      <div className="taskInfo">

        <Tooltip title="Subtasks completed" enterDelay={500} arrow>
          <div className="subtasksCompletedFraction">
            <sup>{getSubtasksCompleted()}</sup>/<sub>{getSubtasksCompleted() + getSubtasksInprogress()}</sub>
          </div>
        </Tooltip>

        <Tooltip title="Add or remove from My day" enterDelay={500} arrow>
          <div className={`buttonMyDay ${props.task.myDay ? "buttonMyDayToggle" : ""}`}
            onClick={(e) => { e.stopPropagation(); changeMyDay() }}>
            <i className="buttonMyDayIcon fas fa-sun fa-lg" />
          </div>
        </Tooltip>

        <div className="buttonSetImportance">
          <TaskImportanceIcon className="taskImportanceIcon" 
              taskImportance={props.task.importance} 
              color={getTaskImportanceIconColor(props.task)} 
              onClick={(e: MouseEvent) => setTaskImportance(e, props.task)} />
        </div>
      </div>
      {/*
        * <hr className="taskProgressBar" style={{width: getPercentSubtasksCompleted().toString() + "%"}}/>
        */}
    </div>

  )
}


export default TasksBoxes;
