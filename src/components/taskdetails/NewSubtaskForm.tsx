/*
** To-Do Plus
** NewSubtaskForm.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { TaskList, Task } from "../../../lib/models";
import { createNewSubTask } from "../../data/actions";
import ErrorMessage from "../ErrorMessage";

export interface TaskDetailsProps {
  taskListId: number
  task: Task
}

const NewSubtaskForm = (props: TaskDetailsProps): ReactElement => {

  /*
  ** States
  */

  const [newSubtaskValue, setNewSubtaskValue] = useState("");
  const [err, setErr] = useState(0);

  /*
  ** Create a new subtask
  */
  const newSubtaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Adding a new subtask: " + newSubtaskValue);
    e.preventDefault();
    const ret = await createNewSubTask(props.taskListId, props.task.id, newSubtaskValue);
    if(!ret) {
      console.error("ERROR: Creating a new subtask failed.");
      setErr(1);
    }
    setNewSubtaskValue("");
  }

  /*
  ** Rendering
  */

  if(err){
    return <ErrorMessage />;
  }

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
