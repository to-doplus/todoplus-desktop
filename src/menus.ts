// To-Do Plus
// menus.ts
// @author Miroslav Safar (xsafar23)

import { IpcMainEvent, Menu, BrowserWindow, dialog } from "electron"
import { Task, TaskList } from "../lib/models"

/**
 * Opens dropdown for the tasklist settings
 * @param event Ipc event
 * @param taskList TaskList
 */
export function openTaskListSettings(event: IpcMainEvent, taskList: TaskList) {
    const template = [
        {
            label: 'Change color',
            submenu: [
                {
                    label: 'Red',
                    click: () => { event.sender.send('tasklist-command', 'set-color', taskList.id, "#DE1738") }
                },
                {
                    label: 'Green',
                    click: () => { event.sender.send('tasklist-command', 'set-color', taskList.id, "#50C878") }
                },
                {
                    label: 'Blue',
                    click: () => { event.sender.send('tasklist-command', 'set-color', taskList.id, "#0F52BA") }
                },
                {
                    label: 'Gold',
                    click: () => { event.sender.send('tasklist-command', 'set-color', taskList.id, "#FFDF00") }
                } 
            ]
        },
        { type: 'separator' },
        {
            label: 'Delete tasklist',
            click: () => { openTaskListDeleteConfirmation(event, taskList) }
        }
    ]
    // @ts-ignore
    const menu = Menu.buildFromTemplate(template)
    // @ts-ignore
    menu.popup(BrowserWindow.fromWebContents(event.sender))
}

/**
 * Open dropdown for the task settings
 * @param event Ipc event
 * @param task Task
 */
export function openTaskSettings(event: IpcMainEvent, task: Task) {
    const template = [
        {
            label: task.myDay ? "Remove from My day" : "Add to My day",
            click: task.myDay ? () => event.sender.send("task-command", 'task-remove-myday', task.taskListId, task.id) : () => event.sender.send("task-command", 'task-add-myday', task.taskListId, task.id)
        },
        {
            label: task.importance == "HIGH" ? "Remove importance" : "Mark as important",
            click: task.importance == "HIGH" ? () => { event.sender.send("task-command", 'task-remove-importance', task.taskListId, task.id) } : () => { event.sender.send("task-command", 'task-add-importance', task.taskListId, task.id) }
        },
        { type: 'separator' },
        {
            label: 'Delete task',
            click: () => { openDeleteConfirmation(event, task) }
        }
    ]
    // @ts-ignore
    const menu = Menu.buildFromTemplate(template)
    // @ts-ignore
    menu.popup(BrowserWindow.fromWebContents(event.sender))
}

/**
 * Open dialog window with delete confirmation for task deletion
 * @param event Ipc event
 * @param task Task
 */
export function openDeleteConfirmation(event: IpcMainEvent, task: Task) {
    const options = {
        type: 'question',
        buttons: ['Cancel', 'Delete'],
        defaultId: 1,
        title: 'Are you sure?',
        message: `Are you sure you want to delete ${task.title}.`,
        detail: 'This action cannot be reverted.',
      };
    
    dialog.showMessageBox(BrowserWindow.fromWebContents(event.sender), options).then(result => {
        if(result.response === 1) { // If the answer was "Delete"
            event.sender.send("task-command", "task-delete", task.taskListId, task.id)
        }
    })
}

/**
 * Open dialog window with delete confirmation for tasklist deletion
 * @param event Ipc event
 * @param taskList Tasklist
 */
export function openTaskListDeleteConfirmation(event: IpcMainEvent, taskList: TaskList) {
    const options = {
        type: 'question',
        buttons: ['Cancel', 'Delete'],
        defaultId: 1,
        title: 'Are you sure?',
        message: `Are you sure you want to delete ${taskList.displayName}.`,
        detail: 'This action cannot be reverted.',
      };
    
    dialog.showMessageBox(BrowserWindow.fromWebContents(event.sender), options).then(result => {
        if(result.response === 1) { // If the answer was "Delete"
            event.sender.send("tasklist-command", "tasklist-delete", taskList.id)
        }
    })
}

