// To-Do Plus
// actions.ts
// @author Michaela Parilova (xparil04)

import { mutate } from "swr";
import client from "./client";
import { Importance, Nullable, Task } from "../../lib/models"
import { mutateTask } from "./actions";

// nepotrebuju, vyuzije Tedro
export async function deleteTask(taskListId: number, taskId: number): Promise<boolean> {
    const success = await client.deleteTask(taskListId, taskId);
    if (!success) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(!list ? list : list.filter(task => task.id !== taskId))], false);
    mutate(`/tasklists/c/myday/tasks`, (list: Task[]) => [...(!list ? list : list.filter(task => task.id !== taskId))], false);
    mutate(`/tasklists/c/important/tasks`, (list: Task[]) => [...(!list ? list : list.filter(task => task.id !== taskId))], false);
    return true;
}

//nastavi "dulezitost" tasku
export async function setImportance(taskListId: number, taskId: number, importance: Importance): Promise<boolean> {
    const updatedTask = await client.setTaskImportance(taskListId, taskId, importance);
    if (!updatedTask) {
        return false;
    }
    mutateTask(updatedTask);
    return true;
}

export async function setTaskDue(taskListId: number, taskId: number, date: Nullable<Date>): Promise<boolean> {
    const updatedTask = await client.setTaskDue(taskListId, taskId, date);
    if (!updatedTask) {
      return false;
    }
    mutateTask(updatedTask);
    return true;
  }
