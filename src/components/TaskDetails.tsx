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
import { setTaskDue } from "../data/taskActions";
import TextField from '@mui/material/TextField';

/*
** TODO:
** Lose focus after hitting enter when renaming a task or a subtask
** Multiline subtask title support (not that urgent)
** Make text unselectable ("add to my day", for example)
** Print countdown next to due date (if set)
** When due date is set, clicking near the edge of the button doesn't reset it
** as it should
** Break line of a subtask title when it's too long...
*/

export interface TaskDetailsProps {
  taskListId: number
  task: Task
}

const setTaskCompletion = async (taskListId: number, taskId: number, currentStatus: string) => {
  let ret;
  if (currentStatus === "INPROGRESS") {
    console.log("Marking task as completed. Id: " + taskId);
    ret = await completeTask(taskListId, taskId);
  } else {
    console.log("Marking task as in progress. Id: " + taskId);
    ret = await uncompleteTask(taskListId, taskId);
  }
  if (ret) {
    // TODO
  }
}

const TaskDetails = (props: TaskDetailsProps): ReactElement => {
  /*
  ** State
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
  ** Functions
  */

  const submitTaskTitle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.task.title !== taskTitle) {
      console.log("Changing the title from '" + props.task.title + "' to '" + taskTitle + "'");
      if (await setTitleOfTask(props.taskListId, props.task.id, taskTitle)) {
        // TODO err
      }
    }
  }

  const getSubtaskList = (): ReactElement => {
    if (props.task.subTasks) {
      return (
        <div className="taskDetailsSubtasksList">
          {props.task.subTasks.sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title)).map((subtask) => {
            return (
              <Subtask
                taskListId={props.taskListId}
                task={props.task}
                subtask={subtask} />
            );
          })}
        </div>
      );
    } else {
      return (null);
    }
  }

  const newSubtaskSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Adding a new subtask: " + newSubtaskValue);
    e.preventDefault();
    if (await createNewSubTask(props.taskListId, props.task.id, newSubtaskValue)) {
      // TODO
    }
    setNewSubtaskValue("");
  }

  const getMyDayButton = (): ReactElement => {
    if (props.task.myDay === false) {
      return (
        <div className="taskDetailsMyDay" onClick={changeMyDay}>
          <i className="taskDetailsMyDayIcon fas fa-sun" />
          <p className="taskDetailsMyDayText">Add to My day</p>
        </div>
      );
    } else {
      return (
        <div className="taskDetailsMyDay myDayToggle" onClick={changeMyDay}>
          <i className="taskDetailsMyDayIcon fas fa-sun" />
          <p className="taskDetailsMyDayText">Remove from My day</p>
        </div>
      );
    }
  }

  const changeMyDay = async () => {
    let ret;
    if (props.task.myDay === false) {
      console.log("Adding to my day");
      ret = await addTaskToMyDay(props.taskListId, props.task.id);
    } else {
      console.log("Removing from my day");
      ret = await removeTaskFromMyDay(props.taskListId, props.task.id);
    }
    if (ret) {
      // TODO
    }
  }


  const getActualDateAndTime = () : string => {
    const date = new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "T09:00";
  }

  const toggleShowDueDate = async () => {
    if(!showDueDate){
      setDueDate(getActualDateAndTime());
    }else{
      setDueDate(null);
    }
    setShowDueDate(!showDueDate);
  }

  const setDueDate = async (inputDate: string) => {
    let date;
    if(inputDate !== null){
      setNewDueDateValue(inputDate);
      date = new Date(inputDate);
    }else{
      date = null;
    }
    console.log("Setting due date to " + date);
    if (await setTaskDue(props.taskListId, props.task.id, date)) {
      // TODO
    }
  }

  const getDueDate = (): ReactElement => {
    if (showDueDate) {
      return(
        <div className="taskDetailsDueDate dueDateToggle">
          <div className="taskDetailsDueDateButton" onClick={toggleShowDueDate}>
            <i className="taskDetailsDueDateIcon far fa-calendar-plus" />
            <p className="taskDetailsDueDateText">Due date set to:</p>
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
            <p className="taskDetailsDueDateText">Due date not set</p>
          </div>
        </div>
      );
    }
  }


  /*
  ** Actual work
  */

  return (
    <div className="taskDetails" onClick={(e) => e.stopPropagation()}>

      <div className="taskDetailsTitle">
        <TaskCompleteIcon status={props.task.status} onClick={() => {setTaskCompletion(props.taskListId, props.task.id, props.task.status)}}/>
        <form className="taskDetailsTitleForm"
          onSubmit={(e) => submitTaskTitle(e)}>
          <input type="text"
            className={`taskDetailsTitleInput ${props.task.status === "INPROGRESS" ? "" : "taskDetailsTitleInputCompleted"}`}
            required value={taskTitle} spellCheck="false"
            onChange={(e) => { setTaskTitle(e.target.value) }} />
        </form>
      </div>

      <div className="taskDetailsSubtasks">

        {getSubtaskList()}

        <div className="taskDetailsNewSubtask">
          <form className="taskDetailsNewSubtaskForm"
            onSubmit={(e) => { newSubtaskSubmit(e) }}>
            <input type="text" className="taskDetailsNewSubtaskInput"
              placeholder="New subtask" required value={newSubtaskValue}
              onChange={(e) => { setNewSubtaskValue(e.target.value) }} />
          </form>
          <i className="taskDetailsNewSubtaskIcon fas fa-plus" />
        </div>
      </div>

      {getMyDayButton()}

      {getDueDate()}

    </div>
  );
}

export default TaskDetails
