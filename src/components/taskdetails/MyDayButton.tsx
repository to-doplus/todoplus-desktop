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
** A button for adding or removing a task from my day displayed in task details
** menu
**
** @author Patrik Skaloš (xskalo01)
*/
const MyDayButton = (props: TaskDetailsProps): ReactElement => {

  /**
  ** @brief Adds to my day or removes from it
  */
  const changeMyDay = async () => {
    let ret;
    if (props.task.myDay === false) {
      console.log("Adding to my day");
      ret = await addTaskToMyDay(props.taskListId, props.task.id);
    } else {
      console.log("Removing from my day");
      ret = await removeTaskFromMyDay(props.taskListId, props.task.id);
    }
    if(!ret) {
      console.error("ERROR: Adding or removing a task from My day failed.");
      alert("Something went wrong!");
    }
  }

  /*
  ** Rendering
  */

  return (
    <div className={`taskDetailsMyDay ${props.task.myDay ? "myDayToggle" : ""}`}
        onClick={changeMyDay}>
      <i className="taskDetailsMyDayIcon fas fa-sun" />
      <p className="taskDetailsMyDayText unselectable">
        {props.task.myDay ? "Remove from My day" : "Add to My day"}
      </p>
    </div>
  );
}

export default MyDayButton;
