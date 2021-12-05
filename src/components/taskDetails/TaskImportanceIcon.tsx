/*
** To-Do Plus
** TaskImportanceIcon.tsx
** @author: Patrik Skaloš (xskalo01)
** @author: Michaela Pařilová (xparil04)
*/

import React, { MouseEvent, MouseEventHandler, ReactElement } from "react"
import { Task, Importance } from "../../../lib/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { setImportance } from "../../data/taskActions";
import Tooltip from "@material-ui/core/Tooltip";

export interface TaskImportanceIconProps {
  taskImportance: Importance,
  color: string,
  size?: SizeProp,
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

/**
** @brief Change importance of a task (based on the previous state)
**
** @param e: Mouse event
** @param task: task of which the importance is to be changed
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

/**
** @brief Get a color for the task importance icon based on the importance
** setting
**
** @param task
**
** @return string represeting a color
*/
export const getTaskImportanceIconColor = (task: Task) : string => {
  if(task.status === "INPROGRESS"){
    if(task.importance === "LOW"){
      return "white";
    } else if (task.importance === "NORMAL"){
      return "goldenrod";
    } else if (task.importance === "HIGH"){
      return "darkred";
    }
  }else{
    if(task.importance === "LOW"){
      return "grey";
    } else if (task.importance === "NORMAL"){
      return "grey";
    } else if (task.importance === "HIGH"){
      return "black";
    }
  }
}

/**
** An icon representing tasks importance (clicking changes the state between
** LOW, NORMAL and HIGH importance). Also acts as a button to change that state
**
** @author Patrik Skaloš (xskalo01)
** @author Michaela Pařilová (xparil04)
*/
const TaskImportanceIcon = (props: TaskImportanceIconProps): ReactElement => {
  return (
    <Tooltip title="Change task importance" enterDelay={500} arrow>
      <div className={props.className || "taskImportanceIcon"} onClick={props.onClick}>
        {props.taskImportance == "LOW" ? <FontAwesomeIcon icon={["far", "star"]} color={props.color} size={props.size || "lg"}/> : <FontAwesomeIcon icon={["fas", "star"]} color={props.color} size={props.size || "lg"}/>}
      </div>
    </Tooltip>
  );
}

export default TaskImportanceIcon;
