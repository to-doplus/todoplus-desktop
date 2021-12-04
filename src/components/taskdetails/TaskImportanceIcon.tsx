//autor: Misa a tedro

import React, { MouseEvent, MouseEventHandler, ReactElement } from "react"
import { Task, Importance } from "../../../lib/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { setImportance } from "../../data/taskActions";

export interface TaskImportanceIconProps {
  taskImportance: Importance,
  color: string,
  size?: SizeProp,
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

/*
** Change importance of a task
*/
export const setTaskImportance = async (e: MouseEvent, task: Task) => {
  e.stopPropagation();
  let ret;
  if (task.importance === "LOW") {
    ret = await setImportance(task.taskListId, task.id, "NORMAL");
  } else if (task.importance === "NORMAL") {
    ret = await setImportance(task.taskListId, task.id, "HIGH");
  } else if (task.importance === "HIGH") {
    ret = await setImportance(task.taskListId, task.id, "LOW");
  }
  console.log("Changing the importance of task: " + task.id);
  if(!ret){
    console.error("ERROR: Changing importance of a task failed.");
    alert("Something went wrong!");
  }
}

/*
** Returns a color for the task importance icon
*/
export const getTaskImportanceIconColor = (task: Task) : string => {
  if(task.importance === "LOW"){
    return "white";
  }
  if(task.status === "INPROGRESS"){
    if (task.importance === "NORMAL"){
      return "goldenrod";
    } else if (task.importance === "HIGH"){
      return "darkred";
    }
  }else{
    if (task.importance === "NORMAL"){
      return "grey";
    } else if (task.importance === "HIGH"){
      return "black";
    }
  }
}

const TaskImportanceIcon = (props: TaskImportanceIconProps): ReactElement => {
  return (
    <div className={props.className || "taskImportanceIcon"} onClick={props.onClick}>
      {props.taskImportance == "LOW" ? <FontAwesomeIcon icon={["far", "star"]} color={props.color} size={props.size || "lg"}/> : <FontAwesomeIcon icon={["fas", "star"]} color={props.color} size={props.size || "lg"}/>}
    </div>
  );
}

export default TaskImportanceIcon;
