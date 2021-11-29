// To-Do Plus
// actions.ts
// @author Michaela Parilova (xparil04)

import { mutate } from "swr";
import client from "./client";
import { Importance, Task } from "../../lib/models"

//vytvori novy task
export async function createNewTask(taskListId: number, title: string): Promise<boolean> {
    const newTask = await client.createNewTask(taskListId, title);
    if (!newTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...list, newTask], false);
    return true;
}


//task oznaci za splneny
export async function completeTask(taskListId: number, taskId: number): Promise<boolean> {
    const updatedTask = await client.completeTask(taskListId, taskId);
    if (!updatedTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
    return true;
}


//task oznaci za nesplneny
export async function uncompleteTask(taskListId: number, taskId: number): Promise<boolean> {
    const updatedTask = await client.uncompleteTask(taskListId, taskId);
    if (!updatedTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
    return true;
}

// nepotrebuju, vyuzije Tedro
export async function deleteTask(taskListId: number, taskId: number): Promise<boolean> {
    const success = await client.deleteTask(taskListId, taskId);
    if (!success) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== taskId))], false);
    return true;
}

//nastavi "dulezitost" tasku
export async function setImportance(taskListId: number, taskId: number, importance: Importance): Promise<boolean> {
    const updatedTask = await client.setTaskImportance(taskListId, taskId, importance);
    if (!updatedTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
    return true;
}
