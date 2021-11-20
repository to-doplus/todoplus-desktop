// To-Do Plus
// subtask_actions.ts
// @author Patrik Skalo (xskalo....)

import { mutate } from "swr";
import client from "./client";
import { Task } from "../../lib/models"

export async function createNewSubTask(taskListId: number, taskId: number, title: string): Promise<boolean> {
    const updatedTask = await client.createNewSubTask(taskListId, taskId, title);
    if (!updatedTask) {
        return false;
    }
    mutate(`/tasklists/${taskListId}/tasks`, (list: Task[]) => [...(list.filter(tsk => tsk.id !== updatedTask.id)), updatedTask], false);
    return true;
}