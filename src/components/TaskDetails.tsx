import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { TaskList, Task, SubTask, Nullable } from "../../lib/models"
import { useTaskLists, useTasksByTaskList } from "../data/hooks";
import { createNewSubTask } from "../../src/data/subtask_actions";

export interface TaskDetailsProps {
  task: Task
}


const TaskDetails = (props: TaskDetailsProps) : ReactElement => {

  /*
  ** state
  */

  const [newSubtaskValue, setNewSubtaskValue] = useState("");
  const [click, setClick] = useState("");


  /*
  ** functions
  */

  const getTaskCompleteIcon = () : ReactElement => {
    let icon;
    if(task.status === "inprogress"){
      icon = "fa-check-circle";
    }else{
      icon = "fa-circle";
    }
    return <i className={`taskDetailsTitleCheckbox far ${icon}`}
        onClick={setTaskCompletion}/>;
  }

  const setTaskCompletion = async () => {
    let ret;
    // TODO completeTask and uncompleteTask not yet implemented in rest client
    if(task.status === "inprogress"){
      task.status = "completed";
      console.log("Marking task as completed. Id: " + task.id);
      // ret = await completeTask(taskListId, task.id);
    }else{
      task.status = "inprogress";
      console.log("Marking task as in progress. Id: " + task.id);
      // ret = await uncompleteTask(taskListId, task.id);
    }
    if(ret){
    }
  }

  const setTaskTitle = async (newTitle: string) => {
    // TODO setTaskTitle not yet implemented in rest client
    let ret;
    if(task.title !== newTitle){
      console.log("Changing the title from '" + task.title + "' to '" + newTitle);
      task.title = newTitle;
      // ret = await setTaskTitle(taskListId, task.id);
    }
    if(ret){
    }
  }

  // Figured out we probably don't need this. I myself never assigned importance
  // in the right menu (task details)
  // If this function was to be used, it needs to be repaired tho
  {/*
    * const getTaskImportantIcon = () : ReactElement[] => {
    *   let icons = [];
    *   if(task.importance === "low"){
    *     icons[0] = <i className="taskDetailsTitleImportant far fa-star"></i>;
    *     icons[1] = <i className="taskDetailsTitleImportant far fa-star"></i>;
    *   }else if(task.importance === "normal"){
    *     icons[0] = <i className="taskDetailsTitleImportant far fa-star"></i>;
    *     icons[1] = <i className="taskDetailsTitleImportant fas fa-star"></i>;
    *   }else{
    *     icons[0] = <i className="taskDetailsTitleImportant far fa-star"></i>;
    *     icons[1] = <i className="taskDetailsTitleImportant far fa-star"></i>;
    *   }
    *   icons[2] = <i className="taskDetailsTitleImportant fas fa-star"></i>;
    *   return icons;
    * }
    */}

  const getSubtasks = () : ReactElement[] => {
    if(task.subTasks){
      return task.subTasks.map((subtask) => {
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
    // TODO not yet implemented in rest-client
    let ret;
    if(subtask.status === "inprogress"){
      console.log("Setting subtask as completed. Id: " + subtask.id);
      subtask.status = "completed";
      // ret = await completeSubtask(taskListId, task.id, subtask.id);
    }else{
      console.log("Setting subtask as in progress. Id: " + subtask.id);
      subtask.status = "inprogress";
      // ret = await uncompleteSubtask(taskListId, task.id, subtask.id);
    }
    if(ret){
    }
  }

  const setSubtaskTitle = async (subtask: SubTask, newTitle: string) => {
    // TODO not yet implemented in rest-client
    let ret;
    if(subtask.title !== newTitle){
      console.log("Changing subtask title from '" + subtask.title + "' to '" + newTitle);
      subtask.title = newTitle;
      // ret = await setSubtaskTitle(taskListId, task.id, subtask.id);
    }
    if(ret){
    }
  }

  const deleteSubtask = async (subtask: SubTask) => {
    // TODO not yet implemented in rest-client
    console.log("Deleting a subtask. Id: " + subtask.id);
    // let ret = await deleteSubtask(taskListId, task.id, subtask.id);
    subtask = (null);
    // if(ret){
    // }
  }

  const newSubtaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Adding a new subtask: " + newSubtaskValue);
    e.preventDefault();
    // TODO: createNewSubtask not yet implemented in rest-client
    {/*
      * const ret = await createNewSubTask(listId, task.id, state.newSubtaskValue);
      * if(ret){
      * }
      */}
    setNewSubtaskValue("");
  }

  const getMyDayIcon = () : ReactElement => {
    // if(task.inMyDay === true){
      // return <i className="taskDetailsMyDayIcon fas fa-sun"></i>
    // }else{
      return <i className="taskDetailsMyDayIcon far fa-sun"/>
    // }
  }

  const changeMyDay = async () => {
    setClick("");
    // TODO not yet implemented in rest-client
    let ret;
    // if(task.inMyDay === false){
      console.log("Adding to my day");
      // task.inMyDay = true;
      // ret = await addTaskToMyDay(taskListId, task.id);
    // }else{
      // console.log("Removing from my day");
      // task.inMyDay = false;
      // ret = await removeTaskFromMyDay(taskListId, task.id);
    // }
    if(ret){
    }
  }

  const setDueDate = async (dueDate: Nullable<Date>) => {
    // TODO not yet implemented in rest-client
    let ret;
    console.log("Setting due date to " + dueDate);
    // ret = await ...
    if(ret){
    }
  }

  const getMyDayText = () : ReactElement => {
    // if(task.inMyDay === false){
      return <p className="taskDetailsMyDayText">Add to My day</p>
    // }else{
      // return <p className="taskDetailsMyDayText">Remove from My day</p>
    // }
  }

  const getDueDate = () : ReactElement => {
    if(task.dueTime){
      return <p className="taskDetailsDueDateText">{task.dueTime}</p>
    }

    return <p className="taskDetailsDueDateText">Due date not set</p>;
  }


  /*
  ** Actual work
  */

  // GET A TASK
  // TODO get ID of a task to display - where from?
  let listId = 1;
  const tasks = useTasksByTaskList(listId);
  if(listId === -2) {
    return <div>Error</div>
  }
  if(!tasks.data || !tasks.data[0]){
    return <div>Error</div>
  }
  // Sort the tasks based on the 'id' property (just for now?)
  tasks.data.sort((a, b) => (a.id > b.id) ? 1 : -1)
  let task = tasks.data[0];
  // We now have one of the tasks


  console.log(tasks);
  console.log(task);


  return (
    <div className="taskDetails">

      <div className="taskDetailsTitle">
        {getTaskCompleteIcon()}
        <p className="taskDetailsTitleText">{task.title}</p>
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
