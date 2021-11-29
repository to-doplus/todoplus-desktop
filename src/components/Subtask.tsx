/*
** To-Do Plus
** Subtask.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useEffect, useState } from "react";
import { TaskList, Task, SubTask, Nullable } from "../../lib/models"
import { deleteSubTask, setSubTaskTitle, completeSubTask, uncompleteSubTask } from "../../src/data/subtask_actions";
import TaskCompleteIcon from "./taskdetails/TaskCompleteIcon";


export interface SubtaskProps {
  taskListId: number
  task: Task
  subtask: SubTask
}


const Subtask = (props: SubtaskProps) : ReactElement => {

  /*
  ** State
  */

  const [title, setTitle] = useState(props.subtask.title);


  /*
  ** Functions
  */

  useEffect(() => {
      setTitle(props.subtask.title);
  }, [props.subtask.title])

  const setSubtaskCompletion = async () => {
    let ret;
    if(props.subtask.status === "INPROGRESS"){
      console.log("Setting subtask as completed. Id: " + props.subtask.id);
      ret = await completeSubTask(props.taskListId, props.task.id, props.subtask.id);
    }else{
      console.log("Setting subtask as in progress. Id: " + props.subtask.id);
      ret = await uncompleteSubTask(props.taskListId, props.task.id, props.subtask.id);
    }
    if(ret){
      // TODO
    }
  }

  const setSubtaskTitle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(props.subtask.title !== title){
      console.log("Changing subtask title from '" + props.subtask.title + "' to '" + title + "'");
      if(await setSubTaskTitle(props.taskListId, props.task.id, props.subtask.id, title)){
        // TODO
      }
    }
  }

  const deleteSubtask = async () => {
    console.log("Deleting a subtask. Id: " + props.subtask.id);
    if(await deleteSubTask(props.taskListId, props.task.id, props.subtask.id)){
      // TODO
    }
  }


  return (
    <div className="taskDetailsSubtask">
      <TaskCompleteIcon className="taskDetailsSubtaskComplete" status={props.subtask.status} onClick={setSubtaskCompletion}/>

      <form className="taskDetailsSubtaskTitleForm"
          onSubmit={(e) => {setSubtaskTitle(e)}}>
        <input type="text" 
            className={`
              taskDetailsSubtaskTitleInput 
              ${ 
                props.subtask.status === "INPROGRESS" ? 
                  "" : "taskDetailsSubtaskTitleInputCompleted"
               }`
            }
            required value={title} spellCheck="false"
            onChange={(e) => {setTitle(e.target.value)}}/>
      </form>

      <div className="taskDetailsSubtaskDelete" onClick={deleteSubtask}>
        <i className="far fa-times-circle fa-lg" />
      </div>

      <hr className="taskDetailsSubtaskSeparator"/>

    </div>
  );
}

export default Subtask
