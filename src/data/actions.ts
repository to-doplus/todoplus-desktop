// To-Do Plus
// actions.ts
// @author Miroslav Safar (xsafar23)

import { mutate } from "swr";
import client from "./client";
import { Importance, Task, TaskList } from "../../lib/models"

export async function createNewTaskList(title: string): Promise<boolean> {
    const newTaskList = await client.createNewTaskList(title);
    if (!newTaskList) {
        return false;
    }
    mutate(`/tasklists`, (list: TaskList[]) => [...list, newTaskList], false);
    return true;
}

export async function createNewTask(taskListId: number, title: string): Promise<boolean> {
    const newTask = await client.createNewTask(taskListId, title);
    if (!newTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...list, newTask], false);
    return true;
}

export async function addToMyDay(taskListId: number, taskId: number): Promise<boolean> {
    const updatedTask = await client.addTaskToMyDay(taskId);
    if (!updatedTask) {
        return false;
    }
    // mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(tsk => tsk.id !== updatedTask.id)), updatedTask], false);
    mutate(`/tasklists/c/myday/tasks`, (list: Task[]) => [...list, updatedTask], false);
    return true;
}

export async function completeTask(taskListId: number, taskId: number): Promise<boolean> {
    const updatedTask = await client.completeTask(taskListId, taskId);
    if (!updatedTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
    return true;
}

export async function uncompleteTask(taskListId: number, taskId: number): Promise<boolean> {
    const updatedTask = await client.uncompleteTask(taskListId, taskId);
    if (!updatedTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
    return true;
}

// idk? task se neodstrani okamzite
export async function deleteTask(taskListId: number, taskId: number): Promise<boolean> {
    const success = await client.deleteTask(taskListId, taskId);
    if (!success) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== taskId))], false);
    return true;
}

export async function setImportance(taskListId: number, taskId: number, importance: Importance): Promise<boolean> {
    const updatedTask = await client.setTaskImportance(taskListId, taskId, importance);
    if (!updatedTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(task => task.id !== updatedTask.id)), updatedTask], false);
    return true;
}


