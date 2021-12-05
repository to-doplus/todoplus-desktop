/*
** To-Do Plus
** hooks.ts
** @author Miroslav Safar (xsafar23)
*/

import useSWR from "swr";
import { TaskList, Task, UserSettings } from "../../lib/models";
import { Response } from "../../lib/todo-client";
import { logout } from "./user_actions";
import client from "./client";
import {history} from "../store"

export interface AsyncDataProps<T> {
    isLoading: boolean,
    isError: boolean,
    data: T
}

function useAsyncData<T>(query: string): AsyncDataProps<T> {
    const { data, error } = useSWR<T & Response>(query, (query) => client.query<T & Response>(query));
    if(data && (data.status === 401)) {
        console.log("Invalid authorization token");
        history.push("/logout");
        return {
            data: data,
            isLoading: false,
            isError: true
        }
    }

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function useTaskLists(): AsyncDataProps<TaskList[]> {
    return useAsyncData<TaskList[]>("/tasklists");
}

export function useTasksByTaskList(taskListId: number): AsyncDataProps<Task[]> {
    return useAsyncData<Task[]>(`/tasklists/${taskListId}/tasks`);
}

export function useMyDayTasks(): AsyncDataProps<Task[]> {
    return useAsyncData<Task[]>(`/tasklists/c/myday/tasks`);
}

export function useImportantTasks(): AsyncDataProps<Task[]> {
    return useAsyncData<Task[]>(`/tasklists/c/important/tasks`);
}

export function useSettings(): AsyncDataProps<UserSettings> {
    return useAsyncData<UserSettings>('/users/settings')
}
