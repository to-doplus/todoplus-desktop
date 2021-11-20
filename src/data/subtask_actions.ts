// To-Do Plus
// subtask_actions.ts
// @author Patrik Skaloš (xskalo01)

import { mutate } from "swr";
import client from "./client";
import { Task, Nullable } from "../../lib/models"

// completeTask(taskId: number): Promise<Task> ;
export async function completeTask(taskListId: number, taskId: number): Promise<boolean> {
  const updatedTask = await client.completeTask(taskListId, taskId);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  return true;
}

// uncompleteTask(taskId: number): Promise<Task> ;
export async function uncompleteTask(taskListId: number, taskId: number): Promise<boolean> {
  const updatedTask = await client.uncompleteTask(taskListId, taskId);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  return true;
}

// setTaskTitle(taskId: number, title: string): Promise<Task> {
export async function setTitleOfTask(taskListId: number, taskId: number, title: string): Promise<boolean> {
  const updatedTask = await client.setTaskTitle(taskListId, taskId, title);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  return true;
}

// addTaskToMyDay(taskId: number): Promise<Task> {
export async function addTaskToMyDay(taskListId: number, taskId: number): Promise<boolean> {
  const updatedTask = await client.addTaskToMyDay(taskId);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  return true;
}

// removeTaskFromMyDay(taskId: number): Promise<boolean> {
export async function removeTaskFromMyDay(taskListId: number, taskId: number): Promise<boolean> {
  const updatedTask = await client.removeTaskFromMyDay(taskId);
  if (!updatedTask) {
    return false;
  }
  // mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  // TODO
  return true;
}

// setTaskDue(taskId: number, date: Nullable<Date>): Promise<Task> {
export async function setTaskDue(taskListId: number, taskId: number, date: Nullable<Date>): Promise<boolean> {
  const updatedTask = await client.setTaskDue(taskListId, taskId, date);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  return true;
}

// createNewSubTask(taskId: number, title: string): Promise<Task> ;
export async function createNewSubTask(taskListId: number, taskId: number, title: string): Promise<boolean> {
  const updatedTask = await client.createNewSubTask(taskListId, taskId, title);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  return true;
}

// deleteSubTask
export async function deleteSubTask(taskListId: number, taskId: number, subtaskId: number): Promise<boolean> {
  const updatedTask = await client.deleteSubTask(taskListId, taskId, subtaskId);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  return true;
}

// setSubtaskTitle
export async function setSubTaskTitle(taskListId: number, taskId: number, subtaskId: number, title: string): Promise<boolean> {
  const updatedTask = await client.setSubTaskTitle(taskListId, taskId, subtaskId, title);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  return true;
}

// completeSubTask(subTaskId: number): Promise<Task> ;
export async function completeSubTask(taskListId: number, taskId: number, subtaskId: number): Promise<boolean> {
  const updatedTask = await client.completeSubTask(taskListId, taskId, subtaskId);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  return true;
}

// uncompleteSubTask(subTaskId: number): Promise<Task> {
export async function uncompleteSubTask(taskListId: number, taskId: number, subtaskId: number): Promise<boolean> {
  const updatedTask = await client.uncompleteSubTask(taskListId, taskId, subtaskId);
  if (!updatedTask) {
    return false;
  }
  mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
  return true;
}
