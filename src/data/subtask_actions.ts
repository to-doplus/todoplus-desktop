// To-Do Plus
// subtask_actions.ts
// @author Patrik Skaloš (xskalo01)

import { mutate } from "swr";
import client from "./client";
import { Task, Nullable } from "../../lib/models"
import { mutateTask } from "./actions";

// completeTask
export async function completeTask(taskListId: number, taskId: number): Promise<boolean> {
  const updatedTask = await client.completeTask(taskListId, taskId);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

// uncompleteTask
export async function uncompleteTask(taskListId: number, taskId: number): Promise<boolean> {
  const updatedTask = await client.uncompleteTask(taskListId, taskId);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

// setTaskTitle
export async function setTitleOfTask(taskListId: number, taskId: number, title: string): Promise<boolean> {
  const updatedTask = await client.setTaskTitle(taskListId, taskId, title);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

// removeTaskFromMyDay
export async function removeTaskFromMyDay(taskListId: number, taskId: number): Promise<boolean> {
  const updatedTask = await client.removeTaskFromMyDay(taskId);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(!list ? [] : list.filter(tsk => tsk.id !== taskId)), updatedTask], false);
  mutate(`/tasklists/c/myday/tasks`, (list: Task[]) => [...(!list ? [] : list.filter(tsk => tsk.id !== taskId))], false);
  mutate(`/tasklists/c/important/tasks`, (list: Task[]) => {
    if(!list) return list;
    if(list.find(tsk => tsk.id === taskId)){
      return [...list.filter(tsk => tsk.id !== taskId), updatedTask];
    }
    return list;
  }, false);
  // TODO
  return true;
}

// deleteSubTask
export async function deleteSubTask(taskListId: number, taskId: number, subtaskId: number): Promise<boolean> {
  const updatedTask = await client.deleteSubTask(taskListId, taskId, subtaskId);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

// setSubtaskTitle
export async function setSubTaskTitle(taskListId: number, taskId: number, subtaskId: number, title: string): Promise<boolean> {
  const updatedTask = await client.setSubTaskTitle(taskListId, taskId, subtaskId, title);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

// completeSubTask
export async function completeSubTask(taskListId: number, taskId: number, subtaskId: number): Promise<boolean> {
  const updatedTask = await client.completeSubTask(taskListId, taskId, subtaskId);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}

// uncompleteSubTask
export async function uncompleteSubTask(taskListId: number, taskId: number, subtaskId: number): Promise<boolean> {
  const updatedTask = await client.uncompleteSubTask(taskListId, taskId, subtaskId);
  if (!updatedTask) {
    return false;
  }
  mutateTask(updatedTask);
  return true;
}
