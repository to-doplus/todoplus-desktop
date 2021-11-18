// To-Do Plus
// actions.ts
// @author Miroslav Safar (xsafar23)

import { mutate } from "swr";
import client from "./client";
import { Task, TaskList } from "../../lib/models"

export async function createNewTaskList(title: string) : Promise<boolean> {
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