/*
** To-Do Plus
** TaskDetails.tsx
** @author: Patrik Skaloš (xskalo01)
*/

import React, { ReactElement, useState } from "react";
import { TaskList, Task, Nullable } from "../../lib/models";
import TaskCompleteIcon from "./taskdetails/TaskCompleteIcon";
import TaskTitleForm from"./taskdetails/TaskTitleForm";
import TaskImporatnceIcon from "./taskdetails/TaskImportanceIcon";
import Subtask from "./taskdetails/Subtask";
import NewSubtaskForm from "./taskdetails/NewSubtaskForm";
import MyDayButton from "./taskdetails/MyDayButton";
import DueDateButton from "./taskdetails/DueDateButton";
import ErrorMessage from "./ErrorMessage";
import { completeTask, uncompleteTask } from "../../src/data/subtask_actions";
import { setImportance, deleteTask } from "../data/taskActions";
import { sendIpcMessage } from "../renderer";
import { deleteTaskConfirmation } from "../ipc/ipcMessages";

/*
** TODO:
** Color of toggled myDay and dueDate needs changing. This is hideous
** Error handling
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
  if(!ret){
    console.error("ERROR: Changing status of a task failed.");
    // setErr(1);
    // TODO
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

  const [err, setErr] = useState(0);

  /*
  ** Change importance of a task
  */
  const setTaskImportance = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    let ret;
    if (props.task.importance === "NORMAL") {
      ret = await setImportance(props.taskListId, props.task.id, "HIGH");
    }
    else if (props.task.importance === "HIGH") {
      ret = await setImportance(props.taskListId, props.task.id, "NORMAL");
    }
    if(!ret){
      setErr(1);
      console.error("ERROR: Changing importance of a task failed.");
    }
    console.log("Changing the importance of task: " + props.task.id);
  }

  /*
  ** Rendering
  */

  if(err){
    return <ErrorMessage />;
  }

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
