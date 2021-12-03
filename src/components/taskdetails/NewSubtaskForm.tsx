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

const NewSubtaskForm = (props: TaskDetailsProps): ReactElement => {

  /*
  ** States
  */

  const [newSubtaskValue, setNewSubtaskValue] = useState("");

  /*
  ** Create a new subtask
  */
  const newSubtaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Adding a new subtask: " + newSubtaskValue);
    e.preventDefault();
    const ret = await createNewSubTask(props.taskListId, props.task.id, newSubtaskValue);
    if(!ret) {
      // TODO err
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
            required />
      </form>
      <i className="taskDetailsNewSubtaskIcon fas fa-plus" />
    </div>
  );
}

export default NewSubtaskForm;
