/*
** To-Do Plus
** NewSubtaskForm.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { TaskList, Task } from "../../../lib/models";
import { createNewSubTask } from "../../data/actions";

export interface TaskDetailsProps {
  taskListId: number
  task: Task
}

/**
** A form for a new subtask (a simple input submitted by hitting ENTER)
**
** @author Patrik Skaloš (xskalo01)
*/
const NewSubtaskForm = (props: TaskDetailsProps): ReactElement => {

  /*
  ** States
  */

  const [newSubtaskValue, setNewSubtaskValue] = useState("");

  /**
  ** @brief Creates a new subtask with a title that the user put in
  **
  ** @param e: Form Event
  */
  const newSubtaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ret = await createNewSubTask(props.taskListId, props.task.id, newSubtaskValue);
    if(!ret) {
      console.error("ERROR: Creating a new subtask failed.");
      alert("Something went wrong!");
    }
    setNewSubtaskValue("");
  }

  /*
  ** Rendering
  */

  return (
    <div className="taskDetailsNewSubtask">
      <form className="taskDetailsNewSubtaskForm unselectable"
        onSubmit={(e) => { newSubtaskSubmit(e) }}>
        <input
            type="text"
            className="taskDetailsNewSubtaskInput"
            onChange={(e) => { setNewSubtaskValue(e.target.value) }}
            value={newSubtaskValue}
            placeholder="New subtask"
            spellCheck="false"
            required />
      </form>
      <i className="taskDetailsNewSubtaskIcon fas fa-plus" />
    </div>
  );
}

export default NewSubtaskForm;
