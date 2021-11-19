import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useTaskLists } from "../data/hooks";
import { useTasksByTaskList } from "../data/hooks";
import { createNewSubTask } from "../../src/data/actions";

export interface TaskDetailsProps {
}

const TaskDetails = (props: TaskDetailsProps) : ReactElement => {

{/*
  *   const lists = useTaskLists();
  *   console.log(lists);
  * 
  *   let ret;
  *   // Need ret for "Rendered more hooks than during the previous render..." ?
  *   if(lists.isLoading) {
  *     ret = <div>Loading...</div>
  *   }
  *   if(lists.isError) {
  *     ret = <div>Error</div>
  *   }
  * 
  *   let listId = 0;
  *   if(!ret && lists && lists.data && lists.data[0]){
  *     listId = lists.data[0].id;
  *   }
  */}

  let listId = 1;

  const tasks = useTasksByTaskList(listId);
  console.log(tasks);

{/*
  *   if(ret){
  *     return ret;
  *   }
  * 
  *   if(listId === -1) {
  *     return <div>Loading...</div>
  *   }
  */}

  if(listId === -2) {
    return <div>Error</div>
  }


  if(!tasks.data || !tasks.data[0]){
    return <div>Error</div>
  }

  let task = tasks.data[0];

  let checkBox = "taskDetailsTitleCheckbox fas fa-check-circle";
  if(task.status === "inprogress"){
    checkBox = "taskDetailsTitleCheckbox far fa-circle";
  }

  {/*
    * task.subtasks = [];
    * task.subtasks[0] = {
    *   id: 1,
    *   title: "abc",
    *   status: "inprogress",
    *   sort: 1
    * };
    */}

  let subtasks;
  console.log(task);
  if(task.subTasks && task.subTasks.length){
    console.log(task.subTasks);
    subtasks = task.subTasks.map((st) => {
      return(
        <div className="taskDetailsSubtask">
          <p className="taskDetailsSubtaskText">{st.title}</p>
          <i className="taskDetailsSubtaskDelete far fa-times-circle"></i>
          <hr className="taskDetailsSubtaskSeparator"/>
        </div>
      );
    });
  }

  let state = {
    newSubtaskValue: ""
  };

  const submitSubtask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: createNewSubtask not yet implemented in rest-client
    {/*
      * const ret = await createNewSubTask(listId, task.id, state.newSubtaskValue);
      * if(ret){
      *   // TODO
      * }
      */}
    console.log(e);
    console.log(state.newSubtaskValue);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    state.newSubtaskValue = e.currentTarget.value;
  }

  console.log(subtasks);
  return (
    <div className="taskDetails">
      <div className="taskDetailsTitle">
        <i className={checkBox}></i>
        <p className="taskDetailsTitleText">{task.title}</p>
        <i className="taskDetailsTitleImportant far fa-star"></i>
      </div>
      <div className="taskDetailsSubtasks">
        <div className="taskDetailsSubtasksList">
          {subtasks}
        </div>
        <div className="taskDetailsSubtasksNew">
          <form className="taskDetailsSubtaskForm" 
              onSubmit={(e) => {submitSubtask(e)}}>
            <input type="text" className="taskDetailsNewSubtaskInput"
                placeholder="New subtask" required
                onChange={(e) => {onChange(e)}}/>
          </form>
          <i className="taskDetailsSubtaskPlus fas fa-plus"></i>
        </div>
      </div>
    </div>
  );
}
        // <p className="taskDetailsSubtaskPlusText">New subtask</p>

export default TaskDetails
