/*
** To-Do Plus
** ipcMessages.ts
** @author: Miroslav Safar (xsafar23)
*/

import { Task, TaskList } from "../../lib/models"

/**
 * IPC Message format for messages from renderer to main process
 */
export interface IpcMessage {
    channel: string, args: any[]
}

/**
 * Returns a message to open TaskList properties dropdown menu
 * @param taskList 
 * @returns IpcMessage
 */
export function openTaskListPropsMenuMessage(taskList: TaskList): IpcMessage {
    return {
        channel: "open-dropdown",
        args: ["tasklist-props", taskList]
    }
}

/**
 * Returns a message to open Task properties dropdown menu
 * @param task 
 * @returns IpcMessage
 */
export function openTaskPropsMenuMessage(task: Task): IpcMessage {
    return {
        channel: "open-dropdown",
        args: ["task-props", task]
    }
}

/**
 * Returns a message to open delete task confirmation dialog menu
 * @param task 
 * @returns IpcMessage
 */
export function deleteTaskConfirmation(task: Task) : IpcMessage {
    return {
        channel: "delete-task-confirm",
        args: [task]
    }
}

/**
 * Returns a message to open delete tasklist confirmation dialog menu
 * @param taskList 
 * @returns IpcMessage
 */
export function deleteTaskListConfirmation(taskList: TaskList) : IpcMessage {
    return {
        channel: "delete-tasklist-confirm",
        args: [taskList]
    }
}
