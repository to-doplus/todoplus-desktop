/*
** To-Do Plus
** taskActions.ts
** @author Michaela Parilova (xparil04)
*/

import { mutate } from "swr";
import client from "./client";
import { Importance, Nullable, Task, TaskList } from "../../lib/models"
import { mutateTask } from "./actions";

/**
 * Deletes task in the tasklist with specified task id
 * @param taskListId Id of tasklist which should contains deleted task
 * @param taskId Id of task which should be deleted
 * @returns True if the task was successfully deleted
 */
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

/**
 * Changes task's importance in the tasklist with specified task id to specified importance
 * @param taskListId Id of tasklist which should contains selected task
 * @param taskId Id of task which should be deleted
 * @param importance Importance of the task to which it will be changed 
 * @returns True if the task importance was successfully changed
 */
export async function setImportance(taskListId: number, taskId: number, importance: Importance): Promise<boolean> {
    const updatedTask = await client.setTaskImportance(taskListId, taskId, importance);
    if (!updatedTask) {
        return false;
    }
    mutateTask(updatedTask);
    return true;
}

/**
 * Sets due date for specified task in the tasklist with specified task id to specified date
 * @param taskListId Id of tasklist which should contains selected task
 * @param taskId Id of task which should be set due date
 * @param date Date of the task to which it will be set 
 * @returns True if the task due date was successfully changed
 */
export async function setTaskDue(taskListId: number, taskId: number, date: Nullable<Date>): Promise<boolean> {
    const updatedTask = await client.setTaskDue(taskListId, taskId, date);
    if (!updatedTask) {
        return false;
    }
    mutateTask(updatedTask);
    return true;
}

/**
* Changes task list title of task list with specified task list id to specified title
* @param taskListId Id of tasklist which title should be changed
* @param title Title of task list to which it will be changed
* @returns True if the task list title was successfully changed
*/
export async function setTaskListTitle(taskListId: number, title: string): Promise<boolean> {
    const updatedTaskList = await client.setTaskListTitle(taskListId, title);
    if (!updatedTaskList) {
        return false;
    }
    mutate(`/tasklists`, (list: TaskList[]) => [...(!list ? list : list.filter(tskList => tskList.id !== taskListId)), updatedTaskList], false);
    return true;
}

/**
* Changes task list description with specified task list id to specified title
* @param taskListId Id of tasklist which description should be changed
* @param description Description of task list to which it will be changed
* @returns True if the task list description was successfully changed
*/
export async function setTaskListDescription(taskListId: number, description: string): Promise<boolean> {
    const updatedTaskList = await client.setTaskListDescription(taskListId, description);
    if (!updatedTaskList) {
        return false;
    }
    mutate(`/tasklists`, (list: TaskList[]) => [...(!list ? list : list.filter(tskList => tskList.id !== taskListId)), updatedTaskList], false);
    return true;
}

/**
* Changes task list icon color with specified task list id to specified color
* @param taskListId Id of tasklist which icon's color should be changed
* @param color Color of task list icon to which it will be changed
* @returns True if the task list icon color was successfully changed
*/
export async function setTaskListColor(taskListId: number, color: string) {
    const updatedTaskList = await client.setTaskListColor(taskListId, color);
    if (!updatedTaskList) {
        return false;
    }
    mutate(`/tasklists`, (list: TaskList[]) => [...(!list ? list : list.filter(tskList => tskList.id !== taskListId)), updatedTaskList], false);
    return true;
}
