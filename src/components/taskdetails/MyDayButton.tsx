/*
** To-Do Plus
** MyDayButton.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { TaskList, Task } from "../../../lib/models";
import { removeTaskFromMyDay } from "../../../src/data/subtask_actions";
import { addTaskToMyDay } from "../../data/actions";

export interface TaskDetailsProps {
  taskListId: number
  task: Task
}

/**
** @brief Adds to my day or removes from it
*/
export const changeMyDay = async (listId: number, taskId: number, myDay: boolean) => {
  let ret;
  if (myDay === false) {
    console.log("Adding to my day");
    ret = await addTaskToMyDay(listId, taskId);
  } else {
    console.log("Removing from my day");
    ret = await removeTaskFromMyDay(listId, taskId);
  }
  if(!ret) {
    console.error("ERROR: Adding or removing a task from My day failed.");
    alert("Something went wrong!");
  }
}

/**
** A button for adding or removing a task from my day displayed in task details
** menu
**
** @author Patrik Skaloš (xskalo01)
*/
const MyDayButton = (props: TaskDetailsProps): ReactElement => {

  /*
  ** Rendering
  */

  return (
    <div className={`taskDetailsMyDay ${props.task.myDay ? "myDayToggle" : ""}`}
        onClick={() => (changeMyDay(props.task.taskListId, props.task.id, props.task.myDay))}>
      <i className="taskDetailsMyDayIcon fas fa-sun" />
      <p className="taskDetailsMyDayText unselectable">
        {props.task.myDay ? "Remove from My day" : "Add to My day"}
      </p>
    </div>
  );
}

export default MyDayButton;
