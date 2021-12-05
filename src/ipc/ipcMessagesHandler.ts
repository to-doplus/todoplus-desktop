/*
** To-Do Plus
** ipcMessageHandler.ts
** @author Miroslav Safar (xsafar23)
*/

import { IpcRendererEvent } from "electron/renderer";
import { addTaskToMyDay, deleteTaskList } from "../data/actions";
import { removeTaskFromMyDay } from "../data/subtask_actions";
import { deleteTask, setImportance, setTaskListColor } from "../data/taskActions";

export function handleIpcMessages() {
    window.electron.receive("tasklist-command", async (event: IpcRendererEvent, ...args: any[]) => {
        if (args[0] == "tasklist-delete") {
            const success: boolean = await deleteTaskList(args[1]);
            if (!success) {
                console.log("ERROR: Cannot delete task")
                //TODO: Print somewhere error
            }
        }else if (args[0] == "set-color") {
            console.log("set-color")
            const success: boolean = await setTaskListColor(args[1], args[2]);
            if (!success) {
                console.log("ERROR: Cannot delete task")
                //TODO: Print somewhere error
            }
        }
    })

    window.electron.receive("task-command", async (event: IpcRendererEvent, ...args: any[]) => {
        if (args[0] == "task-add-myday") {
            const success: boolean = await addTaskToMyDay(args[1], args[2]);
            if (!success) { 
                console.log("ERROR: Cannot add task to my day")
                //TODO: Print somewhere error
            }
        } else if (args[0] == "task-remove-myday") {
            const success: boolean = await removeTaskFromMyDay(args[1], args[2]);
            if (!success) {
                console.log("ERROR: Cannot remove task to my day")
                //TODO: Print somewhere error
            }
        } else if (args[0] == "task-add-importance") {
            console.log("task-add-importance")
            const success: boolean = await setImportance(args[1], args[2], "HIGH");
            if (!success) {
                console.log("ERROR: Cannot remove task to my day")
                //TODO: Print somewhere error
            }
        }
        else if (args[0] == "task-remove-importance") {
            const success: boolean = await setImportance(args[1], args[2], "LOW");
            if (!success) {
                console.log("ERROR: Cannot remove task to my day")
                //TODO: Print somewhere error
            }
        }
        else if (args[0] == "task-delete") {
            console.log("task-delete")
            const success: boolean = await deleteTask(args[1], args[2]);
            if (!success) {
                console.log("ERROR: Cannot delete task")
                //TODO: Print somewhere error
            }
        }
    })
}
