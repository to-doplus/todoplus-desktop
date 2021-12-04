/*
** To-Do Plus
** TaskTitleForm.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useEffect, useState } from "react";
import { TaskList, Task, Nullable } from "../../../lib/models";
import { setTitleOfTask } from "../../../src/data/subtask_actions";

export interface TaskDetailsProps {
  taskListId: number
  task: Task
}

/**
** @brief Lose focus of a form after it is submitted
*/
const loseFocus = () => {
  if(document.activeElement instanceof HTMLElement){
    document.activeElement.blur()
  }
}

/**
** A form using which a task is renamed in the task details menu
**
** @author Patrik Skaloš (xskalo01)
*/
const TaskTitleForm = (props: TaskDetailsProps): ReactElement => {

  /*
  ** States
  */

  const [taskTitle, setTaskTitle] = useState(props.task.title);

  // Update state on props change
  useEffect(() => {
    setTaskTitle(props.task.title);
  }, [props.task.title])

  /**
  ** @brief Submit the new task title
  **
  ** @param e: Form event
  */
  const submitTaskTitle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.task.title !== taskTitle) {
      console.log("Changing the title from '" + props.task.title + "' to '" + taskTitle + "'");
      const ret = await setTitleOfTask(props.taskListId, props.task.id, taskTitle);
      if(!ret) {
        console.error("ERROR: Changing title of a task failed.");
        alert("Something went wrong!");
      }
    }
  }

  /*
  ** Rendering
  */

  return(
    <form className="taskDetailsTitleForm unselectable"
        onSubmit={(e) => {submitTaskTitle(e); loseFocus()}}>
      <input type="text"
          className={`taskDetailsTitleInput ${props.task.status === "INPROGRESS" ? "" : "taskDetailsTitleInputCompleted"}`}
          onChange={(e) => { setTaskTitle(e.target.value) }}
          required 
          value={taskTitle} 
          spellCheck="false" />
    </form>
  );
}

export default TaskTitleForm;
