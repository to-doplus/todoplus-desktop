// To-Do Plus
// actions.ts
// @author Miroslav Safar (xsafar23)

import { mutate } from "swr";
import client from "./client";
import { Importance, Task, TaskList } from "../../lib/models"

export function mutateTask(task: Task) {
    mutate(`/tasklists/${task.taskListId}/tasks`, (list: Task[]) => [...(!list ? [] : list.filter(tsk => tsk.id !== task.id)), task], false);
    mutate(`/tasklists/c/myday/tasks`, (list: Task[]) => {
        if (!list) return list;
        if (list.find(tsk => tsk.id === task.id)) {
            return [...list.filter(tsk => tsk.id !== task.id), task];
        }
        return list;
    }, false);

    mutate(`/tasklists/c/important/tasks`, (list: Task[]) => {
        if (!list) return list;
        if (list.find(tsk => tsk.id === task.id)) {
            return [...list.filter(tsk => tsk.id !== task.id), task];
        }
        return list;
    }, false);
}

export async function createNewTaskList(title: string): Promise<number> {
    const newTaskList = await client.createNewTaskList(title);
    if (!newTaskList) {
        return undefined;
    }
    mutate(`/tasklists`, (list: TaskList[]) => [...list, newTaskList], false);
    return newTaskList.id;
}

export async function createNewSubTask(taskListId: number, taskId: number, title: string): Promise<boolean> {
    const updatedTask = await client.createNewSubTask(taskListId, taskId, title);
    if (!updatedTask) {
        return false;
    }
    mutateTask(updatedTask);
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

export async function addTaskToMyDay(taskListId: number, taskId: number): Promise<boolean> {
    const updatedTask = await client.addTaskToMyDay(taskId);
    if (!updatedTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(!list ? [] : list.filter(tsk => tsk.id !== taskId)), updatedTask], false);
    mutate(`/tasklists/c/myday/tasks`, (list: Task[]) => [...(!list ? [] : list), updatedTask], false);
    mutate(`/tasklists/c/important/tasks`, (list: Task[]) => {
        if (!list) return list;
        if (list.find(tsk => tsk.id === taskId)) {
            return [...list.filter(tsk => tsk.id !== taskId), updatedTask];
        }
        return list;
    }, false);
    // TODO
    return true;
}

export async function login(username: string, password: string): Promise<boolean> {
    const token = await client.login(username, password);
    if (!token) {
        //Error
        return false;
    }
    window.electron.ipcRenderer.send("set-auth-token", token);
    return true;
}

export async function register(username: string, email: string, password: string): Promise<boolean> {
    const token = await client.registerAndLogin(username, email, password);
    if (!token) {
        //Error
        return false;
    }
    window.electron.ipcRenderer.send("set-auth-token", token);
    return true;
}

export function isAuthenticated(): boolean {
    return !!client.getBearerToken();
}

export async function loadAuthTokenFromKeyTar(): Promise<boolean> {
    const token = await window.electron.ipcRenderer.invoke("get-auth-token");
    console.log("Token z keytaru:")
    console.log(token);
    if (!token) {
        console.log("Returning false");
        return false
    }
    client.setBearerToken(token);
    return true;
}

export async function logout() {
    await window.electron.ipcRenderer.invoke("delete-auth-token");
    client.setBearerToken(undefined);
}


