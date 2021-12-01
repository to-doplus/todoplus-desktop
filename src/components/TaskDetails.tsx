/*
** To-Do Plus
** TaskDetails.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TaskList, Task, SubTask, Nullable } from "../../lib/models"
import { useTaskLists, useTasksByTaskList } from "../data/hooks";
import Subtask from "./Subtask";
import { setTitleOfTask, completeTask, uncompleteTask, removeTaskFromMyDay } from "../../src/data/subtask_actions";
import TaskCompleteIcon from "./taskdetails/TaskCompleteIcon";
import { addTaskToMyDay, createNewSubTask } from "../data/actions";
import { setTaskDue, setImportance, deleteTask } from "../data/taskActions";
import TextField from '@mui/material/TextField';
import TaskImporatnceIcon from "./taskdetails/TaskImportanceIcon";

/*
** TODO:
** Refactor this code. It's ugly as hell
** Color of toggled myDay and dueDate needs changing. This is hideous
*/
/*
** todo (not urgent):
** A notification of the due date?
** Lose focus after hitting enter when renaming a task or a subtask
** Multiline subtask title support (not that urgent)
** When due date is set, clicking near the edge of the button doesn't reset it
** as it should
*/
/*
** todo if we're bored
** Print countdown next to due date (if set)
*/

export interface TaskDetailsProps {
  taskListId: number
  task: Task
}

/*
** Set the task as completed or in progress based on the previous state
*/
const setTaskCompletion = async (taskListId: number, taskId: number, currentStatus: string) => {
  let ret;
  if (currentStatus === "INPROGRESS") {
    console.log("Marking task as completed. Id: " + taskId);
    ret = await completeTask(taskListId, taskId);
  } else {
    console.log("Marking task as in progress. Id: " + taskId);
    ret = await uncompleteTask(taskListId, taskId);
  }
  if (!ret) {
    // TODO err
  }
}

/*
** Returns a string representing date and time in format YYYY-MM-DDT09:00
** Yes, the time is fixed to 9:00
*/
const getActualDateAndTime = () : string => {
  const date = new Date();
  return date.getFullYear() + "-" 
    + ("0" + date.getMonth()).slice(-2) + "-" 
    + ("0" + date.getDate()).slice(-2) 
    + "T09:00";
}

/*
** Fetch the task create time and parse it
*/
const getTaskCreateTime = (createTime: Nullable<Date>): string => {
  const date = new Date(createTime);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  return "Date created: " + month + "/" + day + "/" + year + " " + hour + ":" + min;
}

const TaskDetails = (props: TaskDetailsProps): ReactElement => {

  /*
  ** States
  */

  const [newSubtaskValue, setNewSubtaskValue] = useState("");
  const [showDueDate, setShowDueDate] = useState(props.task.dueTime === null ? false : true);
  const [newDueDateValue, setNewDueDateValue] = useState(props.task.dueTime === null ? "" : props.task.dueTime);
  const [taskTitle, setTaskTitle] = useState(props.task.title);

  // Update state on props change
  useEffect(() => {
    setTaskTitle(props.task.title);
  }, [props.task.title])

  /*
  ** Submit the new task title
  */
  const submitTaskTitle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.task.title !== taskTitle) {
      console.log("Changing the title from '" + props.task.title + "' to '" + taskTitle + "'");
      const ret = await setTitleOfTask(props.taskListId, props.task.id, taskTitle);
      if(!ret) {
        // TODO err
      }
    }
  }

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
  ** Add to my day or remove from it
  */
  const changeMyDay = async () => {
    let ret;
    if (props.task.myDay === false) {
      console.log("Adding to my day");
      ret = await addTaskToMyDay(props.taskListId, props.task.id);
    } else {
      console.log("Removing from my day");
      ret = await removeTaskFromMyDay(props.taskListId, props.task.id);
    }
    if(!ret) {
      // TODO err
    }
  }

  /*
  ** Show or hide the due date setting
  */
  const toggleShowDueDate = async () => {
    if(!showDueDate){
      setDueDate(getActualDateAndTime());
    }else{
      setDueDate(null);
    }
    setShowDueDate(!showDueDate);
  }

  /*
  ** Set the due date (receives a string, if it is not a null, parses it and
  ** sends it to setTaskDue as a parameter, otherwise sends null)
  */
  const setDueDate = async (inputDate: string) => {
    let date;
    if(inputDate !== null){
      setNewDueDateValue(inputDate);
      date = new Date(inputDate);
    }else{
      date = null;
    }
    console.log("Setting due date to " + date);
    const ret = await setTaskDue(props.taskListId, props.task.id, date);
    if(!ret){
      // TODO err
    }
  }


  /*
  ** Returns get due date div TODO
  */
  const getDueDate = (): ReactElement => {
    if (showDueDate) {
      return(
        <div className="taskDetailsDueDate dueDateToggle">
          <div className="taskDetailsDueDateButton" onClick={toggleShowDueDate}>
            <i className="taskDetailsDueDateIcon far fa-calendar-plus" />
            <p className="taskDetailsDueDateText unselectable">Due date set to:</p>
          </div>
          <div className="taskDetailsDueDateInput">
            <TextField
              type="datetime-local"
              defaultValue={getActualDateAndTime()}
              onChange={(e) => { setDueDate(e.target.value) }}
              sx={{ input: { color: 'white' } }}
              InputLabelProps={{
                shrink: true,
              }}
              style ={{ width: '100%' }}
            />
          </div>
        </div>
      );
    } else {
      return(
        <div className="taskDetailsDueDate" onClick={toggleShowDueDate}>
          <div className="taskDetailsDueDateButton">
            <i className="taskDetailsDueDateIcon far fa-calendar-plus" />
            <p className="taskDetailsDueDateText unselectable">Due date not set</p>
          </div>
        </div>
      );
    }
  }

  /*
  ** Change importance of a task
  */
  const setTaskImportance = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.task.importance === "NORMAL") {
      const ret = await setImportance(props.taskListId, props.task.id, "HIGH");
      if(!ret){
        // TODO err
      }
    }
    else if (props.task.importance === "HIGH") {
      const ret = await setImportance(props.taskListId, props.task.id, "NORMAL");
      if(!ret){
        // TODO err
      }
    }
    console.log("Changing the importance of task: " + props.task.id);
  }


  /*
  ** Returns icon of the task importance button based on the task importance
  */
  const getTaskImportanceIcon = (): ReactElement => {
    let color: string;
    if(props.task.status === "INPROGRESS"){
      color = props.task.importance === "HIGH" ? "goldenrod" : "white";
    }else{
      color = props.task.importance === "HIGH" ? "grey" : "white";
    }
    return (
      <TaskImporatnceIcon 
      taskImportance={props.task.importance} color={color} 
      className="taskDetailsImportanceIcon" 
      onClick={(e) => setTaskImportance(e)}/>
    )
  }

  /*
  ** Delete the task
  */
  const taskDeletion = async () => {
    const ret = await deleteTask(props.taskListId, props.task.id);
    if(!ret){
      // TODO err
    }
  }

  /*
  ** Rendering
  */

  return (
    <div className="taskDetailsMenu" 
        onClick={(e) => e.stopPropagation()}>

      {/* Task title */}
      <div className="taskDetailsTitle">

        {/* Task status icon */}
        <TaskCompleteIcon status={props.task.status} 
            onClick={() => { setTaskCompletion(props.taskListId, props.task.id, props.task.status) }}/>

        {/* Task title form */}
        <form className="taskDetailsTitleForm unselectable"
            onSubmit={(e) => submitTaskTitle(e)}>
          <input type="text"
              className={`taskDetailsTitleInput ${props.task.status === "INPROGRESS" ? "" : "taskDetailsTitleInputCompleted"}`}
              onChange={(e) => { setTaskTitle(e.target.value) }}
              required 
              value={taskTitle} 
              spellCheck="false" />
        </form>

        {/* Task importance icon */}
        {getTaskImportanceIcon()}

      </div> {/* Task title */}

      {/* Task subtasks, new subtask form, My day button and Due date form */}
      <div className="taskDetails">

        {/* Subtasks list and a new subtask form */}
        <div className="taskDetailsSubtasks">

          {/* Subtasks list */}
          <div className="taskDetailsSubtasksList">
              {props.task.subTasks.sort(
                (a, b) => a.sort - b.sort || a.title.localeCompare(b.title)).map((subtask) => {
                  return (
                    <Subtask
                        taskListId={props.taskListId}
                        task={props.task}
                        subtask={subtask} />
                  );
                }
              )}
          </div>

          {/* New subtask form */}
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

        </div> {/* Subtasks list and a new subtask form */}

        {/* My day button */}
        <div className={`taskDetailsMyDay ${props.task.myDay ? "" : "myDayToggle"}`} 
            onClick={changeMyDay}>
          <i className="taskDetailsMyDayIcon fas fa-sun" />
          <p className="taskDetailsMyDayText unselectable">
            {props.task.myDay ? "Add to My day" : "Remove from My day"}
          </p>
        </div>

        {/* Due date form */}
        {getDueDate()}

      </div> {/* Task subtasks, new subtask form, My day button and Due date form */}

      {/* Lower bar (date created and task delete button) */}
      <div className="taskDetailsLowerBar">

        {/* Date created text */}
        <p className="taskDetailsDateCreated">
          {getTaskCreateTime(props.task.createTime)}
        </p>

        {/* Task delete button */}
        <div className="taskDetailsDeleteButton"
            onClick={taskDeletion}>
          <i className="taskDetailsDeleteIcon fas fa-trash-alt fa-lg" />
        </div>

      </div> {/* Lower bar (date created and task delete button) */}

    </div>
  );
}

export default TaskDetails
