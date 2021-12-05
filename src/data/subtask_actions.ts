/*
** To-Do Plus
** subtask_actions.ts
** @author Patrik Skaloš (xskalo01)
*/

import { mutate } from "swr";
import client from "./client";
import { Task, Nullable } from "../../lib/models"
import { mutateTask } from "./actions";

/**
** @brief Marks a task as completed
**
** @param taskListId
** @param taskId
** 
** @return true if successful
*/
export async function completeTask(taskListId: number, taskId: number): Promise<boolean> {
  const updatedTask = await client.completeTask(taskListId, taskId);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => {
    if (!list) return list;
    return [...list.filter(tsk => tsk.id !== taskId), updatedTask].map(tsk => {
      if (tsk.completeTime) return tsk; // Do not move tasks that are already completed
      if (tsk.sort > updatedTask.sort) {
        tsk.sort = tsk.sort - 1;
      }
      return tsk;
    });
  }, false);

  mutate(`/tasklists/c/myday/tasks`, (list: Task[]) => {
    if (!list) return list;
    if (list.find(tsk => tsk.id === updatedTask.id)) {
      return [...list.filter(tsk => tsk.id !== updatedTask.id), updatedTask];
    }
    return list;
  }, false);

  mutate(`/tasklists/c/important/tasks`, (list: Task[]) => {
    if (!list) return list;
    if (list.find(tsk => tsk.id === updatedTask.id)) {
      return [...list.filter(tsk => tsk.id !== updatedTask.id), updatedTask];
    }
    return list;
  }, false);

  return true;
}

/**
** @brief Marks a task as in progress
**
** @param taskListId
** @param taskId
** 
** @return true if successful
*/
export async function uncompleteTask(taskListId: number, taskId: number): Promise<boolean> {
  const updatedTask = await client.uncompleteTask(taskListId, taskId);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

/**
** @brief Change tasks title
**
** @param taskListId
** @param taskId
** @param title: new title of the task
** 
** @return true if successful
*/
export async function setTitleOfTask(taskListId: number, taskId: number, title: string): Promise<boolean> {
  const updatedTask = await client.setTaskTitle(taskListId, taskId, title);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

/**
** @brief Removes a task from 'My day' built in list
**
** @param taskListId
** @param taskId
** 
** @return true if successful
*/
export async function removeTaskFromMyDay(taskListId: number, taskId: number): Promise<boolean> {
  const updatedTask = await client.removeTaskFromMyDay(taskId);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(!list ? [] : list.filter(tsk => tsk.id !== taskId)), updatedTask], false);
  mutate(`/tasklists/c/myday/tasks`, (list: Task[]) => [...(!list ? [] : list.filter(tsk => tsk.id !== taskId))], false);
  mutate(`/tasklists/c/important/tasks`, (list: Task[]) => {
    if (!list) return list;
    if (list.find(tsk => tsk.id === taskId)) {
      return [...list.filter(tsk => tsk.id !== taskId), updatedTask];
    }
    return list;
  }, false);
  return true;
}

/**
** @brief Removes a subtask
**
** @param taskListId
** @param taskId
** @param subtaskId
** 
** @return true if successful
*/
export async function deleteSubTask(taskListId: number, taskId: number, subtaskId: number): Promise<boolean> {
  const updatedTask = await client.deleteSubTask(taskListId, taskId, subtaskId);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

/**
** @brief Changes a subtask title
**
** @param taskListId
** @param taskId
** @param subtaskId
** @param title: new title of the subtask
** 
** @return true if successful
*/
export async function setSubTaskTitle(taskListId: number, taskId: number, subtaskId: number, title: string): Promise<boolean> {
  const updatedTask = await client.setSubTaskTitle(taskListId, taskId, subtaskId, title);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

/**
** @brief Marks a subtask as completed
**
** @param taskListId
** @param taskId
** @param subtaskId
** 
** @return true if successful
*/
export async function completeSubTask(taskListId: number, taskId: number, subtaskId: number): Promise<boolean> {
  const updatedTask = await client.completeSubTask(taskListId, taskId, subtaskId);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

/**
** @brief Marks a subtask as in progress
**
** @param taskListId
** @param taskId
** @param subtaskId
** 
** @return true if successful
*/
export async function uncompleteSubTask(taskListId: number, taskId: number, subtaskId: number): Promise<boolean> {
  const updatedTask = await client.uncompleteSubTask(taskListId, taskId, subtaskId);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}
