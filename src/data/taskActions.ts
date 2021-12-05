/*
** To-Do Plus
** taskActions.ts
** @author Michaela Parilova (xparil04)
*/

import { mutate } from "swr";
import client from "./client";
import { Importance, Nullable, Task, TaskList } from "../../lib/models"
import { mutateTask } from "./actions";

// nepotrebuju, vyuzije Tedro
export async function deleteTask(taskListId: number, taskId: number): Promise<boolean> {
    const success = await client.deleteTask(taskListId, taskId);
    if (!success) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => {
        if (!list) return list;
        const taskToDel = list.find(tsk => tsk.id === taskId);
        if (!taskToDel || taskToDel.completeTime) return list.filter(tsk => tsk.id !== taskId);
        return list.filter(tsk => tsk.id !== taskId).map(tsk => {
            if (tsk.completeTime) return tsk; // Do not move tasks that are already completed
            if (tsk.sort > taskToDel.sort) {
                tsk.sort = tsk.sort - 1;
            }
            return tsk;
        });
    }, false);
    mutate(`/tasklists/c/myday/tasks`, (list: Task[]) => (!list ? list : list.filter(task => task.id !== taskId), false));
    mutate(`/tasklists/c/important/tasks`, (list: Task[]) => (!list ? list : list.filter(task => task.id !== taskId)), false);
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

//nastavi task list title
export async function setTaskListTitle(taskListId: number, title: string): Promise<boolean> {
    const updatedTaskList = await client.setTaskListTitle(taskListId, title);
    if (!updatedTaskList) {
        return false;
    }
    mutate(`/tasklists`, (list: TaskList[]) => [...(!list ? list : list.filter(tskList => tskList.id !== taskListId)), updatedTaskList], false);
    return true;
}

//nastavi task list description
export async function setTaskListDescription(taskListId: number, description: string): Promise<boolean> {
    const updatedTaskList = await client.setTaskListDescription(taskListId, description);
    if (!updatedTaskList) {
        return false;
    }
    mutate(`/tasklists`, (list: TaskList[]) => [...(!list ? list : list.filter(tskList => tskList.id !== taskListId)), updatedTaskList], false);
    return true;
}

export async function setTaskListColor(taskListId: number, color: string) {
    const updatedTaskList = await client.setTaskListColor(taskListId, color);
    if (!updatedTaskList) {
        return false;
    }
    mutate(`/tasklists`, (list: TaskList[]) => [...(!list ? list : list.filter(tskList => tskList.id !== taskListId)), updatedTaskList], false);
    return true;
}
