/*
** To-Do Plus
** TaskDetails.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { TaskList, Task, SubTask, Nullable } from "../../lib/models"
import { useTaskLists, useTasksByTaskList } from "../data/hooks";
import Subtask from "./Subtask";
import { setTitleOfTask, setTaskDue, completeTask, uncompleteTask, createNewSubTask, addTaskToMyDay, removeTaskFromMyDay } from "../../src/data/subtask_actions";



export interface TaskDetailsProps {
  taskListId: number
  task: Task
}


const TaskDetails = (props: TaskDetailsProps) : ReactElement => {

  /*
  ** State
  */

  const [newSubtaskValue, setNewSubtaskValue] = useState("");
  const [taskTitle, setTaskTitle] = useState(props.task.title);


  /*
  ** Functions
  */

  const getTaskCompleteIcon = () : ReactElement => {
    let icon;
    if(props.task.status === "INPROGRESS"){
      icon = "fa-circle";
    }else{
      icon = "fa-check-circle";
    }
    return(
      <div className="taskDetailsTitleCheckbox" onClick={setTaskCompletion}>
        <i className={`far fa-lg ${icon}`}/>
      </div>
    );
  }

  const setTaskCompletion = async () => {
    let ret;
    if(props.task.status === "INPROGRESS"){
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

  const submitTaskTitle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(props.task.title !== taskTitle){
      console.log("Changing the title from '" + props.task.title + "' to '" + taskTitle + "'");
      if(await setTitleOfTask(props.taskListId, props.task.id, taskTitle)){
        // TODO err
      }
    }
  }

  const getSubtaskList = () : ReactElement => {
    if(props.task.subTasks){
      return(
        <div className="taskDetailsSubtasksList">
        {props.task.subTasks.map((subtask) => {
          return(
            <Subtask 
                taskListId={props.taskListId} 
                task={props.task} 
                subtask={subtask} />
          );
        })}
        </div>
      );
    }else{
      return (null);
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

  const getMyDayButton = () : ReactElement => {
    if(props.task.myDay === false){
      return (
        <div className="taskDetailsMyDay" onClick={changeMyDay}>
          <i className="taskDetailsMyDayIcon far fa-sun" />
          <p className="taskDetailsMyDayText">Add to My day</p>
        </div>
      );
    }else{
      return (
        <div className="taskDetailsMyDay" onClick={changeMyDay}>
          <i className="taskDetailsMyDayIcon fas fa-sun" />
          <p className="taskDetailsMyDayText">Remove from My day</p>
        </div>
      );
    }
  }

  const changeMyDay = async () => {
    let ret;
    if(props.task.myDay === false){
      console.log("Adding to my day");
      ret = await addTaskToMyDay(props.taskListId, props.task.id);
    }else{
      console.log("Removing from my day");
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


  return(
    <div className="taskDetails">
      <div className="taskDetailsTitle">
        {getTaskCompleteIcon()}
        <form className="taskDetailsTitleForm"
            onSubmit={(e) => submitTaskTitle(e)}>
          <input type="text"
              className={`
                taskDetailsTitleInput
                ${
                  props.task.status === "INPROGRESS" ?
                    "" : "taskDetailsTitleInputCompleted"
                }`
              }
              required value={taskTitle} spellCheck="false"
              onChange={(e) => {setTaskTitle(e.target.value)}}/>
        </form>


      </div>

      <div className="taskDetailsSubtasks">
        {getSubtaskList()}

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

      {getMyDayButton()}

      <div className="taskDetailsDueDate">
        <i className="taskDetailsDueDateIcon far fa-calendar-plus"/>
        {getDueDate()}
      </div>

    </div>
  );
}

export default TaskDetails
