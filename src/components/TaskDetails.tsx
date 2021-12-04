/*
** To-Do Plus
** TaskDetails.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { MouseEvent, ReactElement } from "react";
import { TaskList, Task, Nullable } from "../../lib/models";
import TaskCompleteIcon from "./taskdetails/TaskCompleteIcon";
import TaskTitleForm from"./taskdetails/TaskTitleForm";
import TaskImporatnceIcon, { setTaskImportance, getTaskImportanceIconColor } from "./taskdetails/TaskImportanceIcon";
import Subtask from "./taskdetails/Subtask";
import NewSubtaskForm from "./taskdetails/NewSubtaskForm";
import MyDayButton from "./taskdetails/MyDayButton";
import DueDateButton from "./taskdetails/DueDateButton";
import { completeTask, uncompleteTask } from "../../src/data/subtask_actions";
import { deleteTask } from "../data/taskActions";
import { sendIpcMessage } from "../renderer";
import { deleteTaskConfirmation } from "../ipc/ipcMessages";

/*
** TODO:
** Error handling
*/

export interface TaskDetailsProps {
  taskListId: number
  task: Task
}

/*
** @brief Mark the task as completed or in progress based on the previous state
**
** @param taskListId: ID of a task list
** @param taskId: ID of the task
** @param currentStatus: COMPLETED or INPROGRESS
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
  if(!ret){
    console.error("ERROR: Changing status of a task failed.");
    alert("Something went wrong!");
  }
}

const TaskDetails = (props: TaskDetailsProps): ReactElement => {

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
        <TaskTitleForm taskListId={props.taskListId} task={props.task} />

        {/* Task importance icon */}
        <TaskImporatnceIcon 
            taskImportance={props.task.importance} 
            color={getTaskImportanceIconColor(props.task)} 
            className="taskDetailsImportanceIcon" 
            onClick={(e: MouseEvent) => setTaskImportance(e, props.task)}/>

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
                        taskListId={props.task.taskListId}
                        task={props.task}
                        subtask={subtask} />
                  );
                }
              )}
          </div>

          {/* New subtask form */}
          <NewSubtaskForm taskListId={props.task.taskListId} task={props.task} />

        </div> {/* Subtasks list and a new subtask form */}

        {/* My day button */}
        <MyDayButton taskListId={props.task.taskListId} task={props.task} />

        {/* Due date button and form */}
        <DueDateButton taskListId={props.task.taskListId} task={props.task} />

      </div> {/* Task subtasks, new subtask form, My day button and Due date form */}

      {/* Lower bar (date created and task delete button) */}
      <div className="taskDetailsLowerBar">

        {/* Date created text */}
        <p className="taskDetailsDateCreated">
          {new Date(props.task.createTime).toLocaleString()}
        </p>

        {/* Task delete button */}
        <div className="taskDetailsDeleteButton"
            onClick={() => sendIpcMessage(window.electron.ipcRenderer,deleteTaskConfirmation(props.task))}>
          <i className="taskDetailsDeleteIcon fas fa-trash-alt fa-lg" />
        </div>

      </div> {/* Lower bar (date created and task delete button) */}

    </div>
  );
}

export default TaskDetails
