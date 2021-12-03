/*
** To-Do Plus
** TaskDetails.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement } from "react";
import { TaskList, Task, Nullable } from "../../lib/models";
import TaskCompleteIcon from "./taskdetails/TaskCompleteIcon";
import TaskTitleForm from"./taskdetails/TaskTitleForm";
import TaskImporatnceIcon from "./taskdetails/TaskImportanceIcon";
import Subtask from "./taskdetails/Subtask";
import NewSubtaskForm from "./taskdetails/NewSubtaskForm";
import MyDayButton from "./taskdetails/MyDayButton";
import DueDateButton from "./taskdetails/DueDateButton";
import { completeTask, uncompleteTask } from "../../src/data/subtask_actions";
import { setImportance, deleteTask } from "../data/taskActions";
import { sendIpcMessage } from "../renderer";
import { deleteTaskConfirmation } from "../ipc/ipcMessages";

/*
** TODO:
** Color of toggled myDay and dueDate needs changing. This is hideous
** Error handling
** Divide this file into components (complete button and important button)
*/
/*
** todo (not urgent):
** Changing order of subtasks by dragging
** A notification of the due date?
*/
/*
** todo if we're bored
** Print countdown next to due date (if set)
** Multiline subtask title support
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
** Fetch the task create time and parse it
*/
const getTaskCreateTime = (createTime: Nullable<Date>): string => {
  const date = new Date(createTime);
  return date.toLocaleString();
}

const TaskDetails = (props: TaskDetailsProps): ReactElement => {

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
            color={props.task.importance === "HIGH" ? (props.task.status === "INPROGRESS" ? "goldenrod" : "grey") : "white"}
            className="taskDetailsImportanceIcon" 
            onClick={(e) => setTaskImportance(e)}/>

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
          <NewSubtaskForm taskListId={props.taskListId} task={props.task} />

        </div> {/* Subtasks list and a new subtask form */}

        {/* My day button */}
        <MyDayButton taskListId={props.taskListId} task={props.task} />

        {/* Due date button and form */}
        <DueDateButton taskListId={props.taskListId} task={props.task} />

      </div> {/* Task subtasks, new subtask form, My day button and Due date form */}

      {/* Lower bar (date created and task delete button) */}
      <div className="taskDetailsLowerBar">

        {/* Date created text */}
        <p className="taskDetailsDateCreated">
          {getTaskCreateTime(props.task.createTime)}
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
