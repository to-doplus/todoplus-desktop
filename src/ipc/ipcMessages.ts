/*
** To-Do Plus
** ipcMessages.ts
** @author: 
*/

import { Task, TaskList } from "../../lib/models"

/**
 * IPC Message format for messages from renderer to main process
 */
export interface IpcMessage {
    channel: string, args: any[]
}

export function openTaskListPropsMenuMessage(taskList: TaskList): IpcMessage {
    return {
        channel: "open-dropdown",
        args: ["tasklist-props", taskList]
    }
}

export function openTaskPropsMenuMessage(task: Task): IpcMessage {
    return {
        channel: "open-dropdown",
        args: ["task-props", task]
    }
}

export function deleteTaskConfirmation(task: Task) : IpcMessage {
    return {
        channel: "delete-task-confirm",
        args: [task]
    }
}

export function deleteTaskListConfirmation(task: Task) : IpcMessage {
    return {
        channel: "delete-tasklist-confirm",
        args: [task]
    }
}
