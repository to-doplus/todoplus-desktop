/*
** To-Do Plus
** Subtask.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { TaskList, Task, SubTask, Nullable } from "../../lib/models"
import { deleteSubTask, setSubTaskTitle, completeSubTask, uncompleteSubTask } from "../../src/data/subtask_actions";


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

  const getSubtaskText = () => {
    setTitle(props.subtask.title);
  }

  const getSubtaskCompleteIcon = () : ReactElement => {
    let icon;
    if(props.subtask.status === "INPROGRESS"){
      icon = "fa-circle";
    }else{
      icon = "fa-check-circle";
    }
    return(
      <div className="taskDetailsSubtaskComplete" onClick={setSubtaskCompletion}> 
        <i className={`far fa-lg ${icon}`}/>
      </div>
    )
  }

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

      {getSubtaskCompleteIcon()}

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
