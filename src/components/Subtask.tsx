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

  const [title, setTitle] = useState("");


  /*
  ** Functions
  */

  const getSubtaskCompleteIcon = (subtask: SubTask) : ReactElement => {
    let icon;
    if(subtask.status === "inprogress"){
      icon = "fa-check-circle";
    }else{
      icon = "fa-circle";
    }
    return <i className={`taskDetailsSubtaskComplete far ${icon}`}
        onClick={() => setSubtaskCompletion(subtask)}/>;
  }

  const setSubtaskCompletion = async (subtask: SubTask) => {
    let ret;
    if(subtask.status === "inprogress"){
      console.log("Setting subtask as completed. Id: " + subtask.id);
      ret = await completeSubTask(props.taskListId, props.task.id, subtask.id);
    }else{
      console.log("Setting subtask as in progress. Id: " + subtask.id);
      ret = await uncompleteSubTask(props.taskListId, props.task.id, subtask.id);
    }
    if(ret){
      // TODO
    }
  }

  const setSubtaskTitle = async (subtask: SubTask, newTitle: string) => {
    if(props.subtask.title !== newTitle){
      console.log("Changing subtask title from '" + subtask.title + "' to '" + newTitle);
      if(await setSubTaskTitle(props.taskListId, props.task.id, props.subtask.id, title)){
        // TODO
      }
    }
  }

  const deleteSubtask = async (subtask: SubTask) => {
    console.log("Deleting a subtask. Id: " + subtask.id);
    if(await deleteSubTask(props.taskListId, props.task.id, props.subtask.id)){
      // TODO
    }
  }


  return (
    <div className="taskDetailsSubtask">
      {getSubtaskCompleteIcon(props.subtask)}
      <p className="taskDetailsSubtaskText">{props.subtask.title}</p>
      <i className="taskDetailsSubtaskDelete far fa-times-circle"
          onClick={() => deleteSubtask(props.subtask)}/>
      <hr className="taskDetailsSubtaskSeparator"/>
    </div>
  );
}

export default Subtask
