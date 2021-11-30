// To-Do Plus
// actions.ts
// @author Miroslav Safar (xsafar23)

import { mutate } from "swr";
import client from "./client";
import { Importance, Task, TaskList } from "../../lib/models"

export function mutateTask(task: Task) {
    mutate(`/tasklists/${task.taskListId}/tasks`, (list: Task[]) => [...(!list ? [] : list.filter(tsk => tsk.id !== task.id)), task], false);
    mutate(`/tasklists/c/myday/tasks`, (list: Task[]) => {
        if(!list) return list;
        if(list.find(tsk => tsk.id === task.id)){
            return [...list.filter(tsk => tsk.id !== task.id), task];
        }
        return list;
    }, false);

    mutate(`/tasklists/c/important/tasks`, (list: Task[]) => {
        if(!list) return list;
        if(list.find(tsk => tsk.id === task.id)){
            return [...list.filter(tsk => tsk.id !== task.id), task];
        }
        return list;
    }, false);
}

export async function createNewTaskList(title: string): Promise<boolean> {
    const newTaskList = await client.createNewTaskList(title);
    if (!newTaskList) {
        return false;
    }
    mutate(`/tasklists`, (list: TaskList[]) => [...list, newTaskList], false);
    return true;
}

export async function createNewSubTask(taskListId: number, taskId: number, title: string): Promise<boolean> {
    const updatedTask = await client.createNewSubTask(taskListId, taskId, title);
    if (!updatedTask) {
      return false;
    }
    mutateTask(updatedTask);
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


