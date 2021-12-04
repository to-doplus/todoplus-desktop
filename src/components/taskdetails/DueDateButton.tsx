/*
** To-Do Plus
** DueDateButton.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { Task } from "../../../lib/models"
import { setTaskDue } from "../../data/taskActions";
import TextField from '@mui/material/TextField';

export interface TaskDetailsProps {
  taskListId: number
  task: Task
}

/**
** @brief Returns a string representing date and time in format YYYY-MM-DDT09:00
** (the time is fixed to 9:00)
**
** @return initial due date
*/
const getInitialDueDate = () : string => {
  const date = new Date();
  let year = date.getFullYear();
  // month + 1 as months are indexed from 0. No idea why
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  // day + 1 since we want to set the initial due date one day forward
  let day = ("0" + (date.getDate() + 1)).slice(-2);
  return year + "-" + month + "-" + day + "T09:00";
}

/**
** A button (and a form which appears after clicking on it) for the due date
** setting displayed in the task details menu
**
** @author Patrik Skaloš (xskalo01)
*/
const DueDateButton = (props: TaskDetailsProps): ReactElement => {

  /*
  ** States
  */

  const [showDueDate, setShowDueDate] = useState(props.task.dueTime === null ? false : true);
  const [newDueDateValue, setNewDueDateValue] = useState(props.task.dueTime === null ? "" : props.task.dueTime);

  /**
  ** @brief Show (and initialize) or hide the due date setting
  */
  const toggleShowDueDate = async () => {
    let date = null;
    if(!showDueDate){
      date = getInitialDueDate();
    }
    setDueDate(date);
    setShowDueDate(!showDueDate);
  }

  /**
  ** @brief Get the actual due date setting
  **
  ** @return date of tomorrow 09:00 if not set yet, actual due date setting
  ** otherwise
  */
  const getDueDateSetting = () : string => {
    // no due date value set yet - generate string for next day 09:00
    if(newDueDateValue === ""){
      return getInitialDueDate();
    }else{

      // str is a unix timestamp
      if(newDueDateValue.toString().slice(-3) === "000"){
        let date = new Date(parseInt(newDueDateValue.toString()));
        const year = date.getFullYear();
        // month + 1 as months are indexed from 0. No idea why
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hour = ("0" + date.getHours()).slice(-2);
        const min = ("0" + date.getMinutes()).slice(-2);
        return year + "-" + month + "-" + day + "T" + hour + ":" + min;

      // str is in the right format (YYYY/MM/DDTHH:MM)
      }else{
        return newDueDateValue.toString();
      }
    }
  }

  /**
  ** @brief Set the due date (receives a string, if it is not a null, parses it 
  ** and sends it to setTaskDue as a parameter, otherwise sends null)
  **
  ** @param inputDate: string representing the date the user has put in
  */
  const setDueDate = async (inputDate: string) => {
    let date = null;
    if(inputDate !== null && !isNaN(Date.parse(inputDate))){
      setNewDueDateValue(inputDate);
      date = new Date(inputDate);
    }
    const ret = await setTaskDue(props.taskListId, props.task.id, date);
    if(!ret){
      console.error("ERROR: Changing due date of a task failed.");
      alert("Something went wrong!");
    }
  }

  /*
  ** Rendering
  */

  return (
    <div className={`taskDetailsDueDate ${showDueDate ? "dueDateToggle" : ""}`}>

      {/* Due date button */}
      <div className="taskDetailsDueDateButton"
          onClick={toggleShowDueDate}>
        <i className="taskDetailsDueDateIcon far fa-calendar-plus" />
        <p className="taskDetailsDueDateText unselectable">Due date not set</p>
      </div>

      {/* Due date form */}
      {showDueDate ?
        <div className="taskDetailsDueDateInput">
          <TextField
              type="datetime-local"
              defaultValue={getDueDateSetting()}
              onChange={(e) => { setDueDate(e.target.value) }}
              sx={{
                input: { color: 'white' }
              }}
              InputLabelProps={{
                shrink: true,
              }}
              style ={{ width: '100%' }} />
        </div>
        :
        ""
      }

    </div>
  );
}

export default DueDateButton;
