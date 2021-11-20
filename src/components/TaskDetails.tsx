/*
** To-Do Plus
** TaskDetails.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { setTitleOfTask, setTaskDue, completeTask, uncompleteTask, createNewSubTask, deleteSubTask, setSubTaskTitle, completeSubTask, uncompleteSubTask, addTaskToMyDay, removeTaskFromMyDay } from "../../src/data/subtask_actions";
import { Link } from "react-router-dom";
import { TaskList, Task, SubTask, Nullable } from "../../lib/models"
import { useTaskLists, useTasksByTaskList } from "../data/hooks";



export interface TaskDetailsProps {
  taskListId: number
  task: Task
}


const TaskDetails = (props: TaskDetailsProps) : ReactElement => {

  /*
  ** State
  */

  const [newSubtaskValue, setNewSubtaskValue] = useState("");
  const [click, setClick] = useState("");


  /*
  ** Functions
  */

  const getTaskCompleteIcon = () : ReactElement => {
    let icon;
    if(props.task.status === "inprogress"){
      icon = "fa-check-circle";
    }else{
      icon = "fa-circle";
    }
    return <i className={`taskDetailsTitleCheckbox far ${icon}`}
        onClick={setTaskCompletion}/>;
  }

  const setTaskCompletion = async () => {
    let ret;
    if(props.task.status === "inprogress"){
      console.log("Marking task as completed. Id: " + props.task.id);
      ret = await completeTask(props.taskListId, props.task.id);
    }else{
      console.log("Marking task as in progress. Id: " + props.task.id);
      ret = await uncompleteTask(props.taskListId, props.task.id);
    }
    if(ret){
      // TODO
    }
  }

  const setTaskTitle = async (newTitle: string) => {
    if(props.task.title !== newTitle){
      console.log("Changing the title from '" + props.task.title + "' to '" + newTitle);
      if(await setTitleOfTask(props.taskListId, props.task.id, newTitle)){
        // TODO err
      }
    }
  }

  const getSubtasks = () : ReactElement[] => {
    if(props.task.subTasks){
      return props.task.subTasks.map((subtask) => {
        return (
          <div className="taskDetailsSubtask">
            {getSubtaskCompleteIcon(subtask)}
            <p className="taskDetailsSubtaskText">{subtask.title}</p>
            <i className="taskDetailsSubtaskDelete far fa-times-circle"
                onClick={() => deleteSubtask(subtask)}/>
            <hr className="taskDetailsSubtaskSeparator"/>
          </div>
        );
      });
    }else{
      return (null);
    }
  }

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
    if(subtask.title !== newTitle){
      console.log("Changing subtask title from '" + subtask.title + "' to '" + newTitle);
      if(await setSubTaskTitle(props.taskListId, props.task.id, subtask.id, newSubtaskValue)){
        // TODO
      }
    }
  }

  const deleteSubtask = async (subtask: SubTask) => {
    console.log("Deleting a subtask. Id: " + subtask.id);
    if(await deleteSubTask(props.taskListId, props.task.id, subtask.id)){
      // TODO
    }
  }

  const newSubtaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Adding a new subtask: " + newSubtaskValue);
    e.preventDefault();
    if(await createNewSubTask(props.taskListId, props.task.id, newSubtaskValue)){
      // TODO
    }
    setNewSubtaskValue("");
  }

  const getMyDayIcon = () : ReactElement => {
    if(props.task.myDay === true){
      return <i className="taskDetailsMyDayIcon fas fa-sun"></i>
    }else{
      return <i className="taskDetailsMyDayIcon far fa-sun"/>
    }
  }

  const changeMyDay = async () => {
    setClick("");
    let ret;
    if(props.task.myDay === false){
      console.log("Adding to my day");
      props.task.myDay = true;
      ret = await addTaskToMyDay(props.taskListId, props.task.id);
    }else{
      console.log("Removing from my day");
      props.task.myDay = false;
      ret = await removeTaskFromMyDay(props.taskListId, props.task.id);
    }
    if(ret){
      // TODO
    }
  }

  const setDueDate = async (dueDate: Nullable<Date>) => {
    let ret;
    console.log("Setting due date to " + dueDate);
    if(await setTaskDue(props.taskListId, props.task.id, dueDate)){
      // TODO
    }
  }

  const getMyDayText = () : ReactElement => {
    if(props.task.myDay === false){
      return <p className="taskDetailsMyDayText">Add to My day</p>
    }else{
      return <p className="taskDetailsMyDayText">Remove from My day</p>
    }
  }

  const getDueDate = () : ReactElement => {
    if(props.task.dueTime){
      return <p className="taskDetailsDueDateText">{props.task.dueTime}</p>
    }else{
      return <p className="taskDetailsDueDateText">Due date not set</p>;
    }
  }


  /*
  ** Actual work
  */

  console.log(props.task);


  return (
    <div className="taskDetails">

      <div className="taskDetailsTitle">
        {getTaskCompleteIcon()}
        <p className="taskDetailsTitleText">{props.task.title}</p>
      </div>

      <div className="taskDetailsSubtasks">
        <div className="taskDetailsSubtasksList">
          {getSubtasks()}
        </div>

        <div className="taskDetailsNewSubtask">
          <form className="taskDetailsNewSubtaskForm" 
              onSubmit={(e) => {newSubtaskSubmit(e)}}>
            <input type="text" className="taskDetailsNewSubtaskInput"
                placeholder="New subtask" required value={newSubtaskValue}
                onChange={(e) => {setNewSubtaskValue(e.target.value)}}/>
          </form>
          <i className="taskDetailsNewSubtaskIcon fas fa-plus"/>
        </div>

      </div>

      <div className="taskDetailsMyDay" onClick={changeMyDay}>
        {getMyDayIcon()}
        {getMyDayText()}
      </div>

      <div className="taskDetailsDueDate">
        <i className="taskDetailsDueDateIcon far fa-calendar-plus"/>
        {getDueDate()}
      </div>

    </div>
  );
}

export default TaskDetails
