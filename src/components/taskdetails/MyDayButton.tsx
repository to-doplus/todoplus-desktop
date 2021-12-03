/*
** To-Do Plus
** MyDayButton.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { TaskList, Task } from "../../../lib/models";
import { removeTaskFromMyDay } from "../../../src/data/subtask_actions";
import { addTaskToMyDay } from "../../data/actions";
import ErrorMessage from "../ErrorMessage";

export interface TaskDetailsProps {
  taskListId: number
  task: Task
}

const MyDayButton = (props: TaskDetailsProps): ReactElement => {

  /*
  ** States
  */

  const [err, setErr] = useState(0);

  /*
  ** Add to my day or remove from it
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
      setErr(1);
    }
  }

  /*
  ** Rendering
  */

  if(err){
    return <ErrorMessage />;
  }

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
