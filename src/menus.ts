import { IpcMainEvent, Menu, BrowserWindow, dialog } from "electron"
import { Task, TaskList } from "../lib/models"

export function openTaskListSettings(event: IpcMainEvent, taskList: TaskList) {
    const template = [
        {
            label: 'Rename tasklist',
            click: () => { event.sender.send('tasklist-command', 'rename', taskList.id) }
        },
        { type: 'separator' },
        {
            label: 'Delete tasklist',
            click: () => { event.sender.send('tasklist-command', 'delete', taskList.id) }
        }
    ]
    // @ts-ignore
    const menu = Menu.buildFromTemplate(template)
    // @ts-ignore
    menu.popup(BrowserWindow.fromWebContents(event.sender))
}

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
        if(result.response === 1) {
            event.sender.send("task-command", "task-delete", task.taskListId, task.id)
        }
    })
}

