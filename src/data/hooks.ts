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

/**
 * Entita for async data fetching
 */
export interface AsyncDataProps<T> {
    isLoading: boolean, // Data are currently fetched
    isError: boolean, // An error has occured while fetching the data
    data: T // Data
}

/**
 * React Hook to fetch data from URL endpoint (data are cached and revalidate)
 * We use SWR library state-while-revalidate -
 * This means that we return old data, then start fetching new ones and after they are fetched we update returned data.
 * @param query HTTP endpoint pro získání dat
 * @returns AsyncDataProps - containing data, isLoading telling if data are downloading and isError if there was an error while data fetching.
 */
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

/**
 * Get List of TaskLists Hook
 * @returns List of TaskLists
 */
export function useTaskLists(): AsyncDataProps<TaskList[]> {
    return useAsyncData<TaskList[]>("/tasklists");
}

/**
 * Get List of Tasks in TaskList Hook
 * @returns List of Tasks
 */
export function useTasksByTaskList(taskListId: number): AsyncDataProps<Task[]> {
    return useAsyncData<Task[]>(`/tasklists/${taskListId}/tasks`);
}

/**
 * Get List of Tasks in My Day Hook
 * @returns List of Tasks
 */
export function useMyDayTasks(): AsyncDataProps<Task[]> {
    return useAsyncData<Task[]>(`/tasklists/c/myday/tasks`);
}

/**
 * Get List of Tasks in Important Hook
 * @returns List of Tasks
 */
export function useImportantTasks(): AsyncDataProps<Task[]> {
    return useAsyncData<Task[]>(`/tasklists/c/important/tasks`);
}

/**
 * Get UserSettings Hook
 * @returns UserSettings
 */
export function useSettings(): AsyncDataProps<UserSettings> {
    return useAsyncData<UserSettings>('/users/settings')
}
