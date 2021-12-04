// To-Do Plus
// actions.ts
// @author Miroslav Safar (xsafar23)

import { mutate } from "swr";
import client from "./client";
import { Importance, Task, TaskList } from "../../lib/models"
import { useTasksByTaskList } from "./hooks";

/**
 * Mutates SWR cached data with updated task 
 * @param task Task that was updated
 */
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

/**
 * Creates a new tasklist and updates SWR cache
 * @param title Title of the new tasklist
 * @returns Id of the created tasklist
 */
export async function createNewTaskList(title: string): Promise<number> {
    const newTaskList = await client.createNewTaskList(title);
    if (!newTaskList) {
        return undefined;
    }
    mutate(`/tasklists`, (list: TaskList[]) => [...list, newTaskList], false);
    return newTaskList.id;
}

/**
 * Creates a new subtask of task and updates SWR cache
 * @param taskListId Id of tasklist with contains task in which subtask should be created
 * @param taskId Id of task in which subtask should be created
 * @param title Title of the subtask
 * @returns True if the subtask was successfully created
 */
export async function createNewSubTask(taskListId: number, taskId: number, title: string): Promise<boolean> {
    const updatedTask = await client.createNewSubTask(taskListId, taskId, title);
    if (!updatedTask) {
        return false;
    }
    mutateTask(updatedTask);
    return true;
}

/**
 * Creates a new task in the tasklist and updates SWR cache
 * @param taskListId Id of tasklist which should contains created task
 * @param title Title of the task
 * @returns True if the task was successfully created
 */
export async function createNewTask(taskListId: number, title: string): Promise<boolean> {
    const newTask = await client.createNewTask(taskListId, title);
    if (!newTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...list, newTask], false);
    return true;
}

/**
 * Deletes a tasklist with specified id
 * @param taskListId Id of tasklist which should be deleted
 * @returns True if the action was successfull
 */
export async function deleteTaskList(taskListId: number): Promise<boolean> {
    const success = await client.deleteTaskList(taskListId);
    if (!success) {
        return false;
    }
    mutate("/tasklists", (list: TaskList[]) => !list ? list : list.filter(taskList => taskList.id !== taskListId), false);
    mutate(`/tasklists/${taskListId}/tasks`, [], false);
    mutate(`/tasklists/c/myday/tasks`, (list: Task[]) => (!list ? list : list.filter(task => task.taskListId !== taskListId), false));
    mutate(`/tasklists/c/important/tasks`, (list: Task[]) => (!list ? list : list.filter(task => task.taskListId !== taskListId)), false);
    return true;
}

/**
 * Adds specific task into My day tasklist
 * @param taskListId Id of tasklist in which task is
 * @param taskId Id of the specific task
 * @returns True if the action eas successfull
 */
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

/**
 * Login user with credentials and saves the token into system password management
 * @param username Username
 * @param password Password
 * @returns True if it was successfull
 */
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

/**
 * Checks if user is logged in
 * @returns True if user if logged in
 */
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
    mutate("/taskslists")
    mutate("/tasklists/c/myday/tasks")
    mutate("/tasklists/c/important/tasks")
}

export async function moveTask(task: Task, sort: number) {
    if (task.sort == sort) return;
    const sourceSort = task.sort;
    const direction = sort > sourceSort ? "UP" : "DOWN";
    mutate(`/tasklists/${task.taskListId}/tasks`, (list: Task[]) => {
        if (!list) return list;
        return list.map(tsk => {
            if (tsk.id == task.id) {
                tsk.sort = sort;
                return tsk;
            }
            if (direction === "UP") {
                if (tsk.sort >= sourceSort && tsk.sort <= sort) {
                    tsk.sort = tsk.sort - 1;
                }
            } else {
                if (tsk.sort >= sort && tsk.sort < sourceSort) {
                    tsk.sort = tsk.sort + 1;
                }
            }
            return tsk;
        });
    }, false);
    await client.setTaskSort(task.taskListId, task.id, sort);
}


