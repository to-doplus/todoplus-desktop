// To-Do Plus
// hooks.ts
// @author Miroslav Safar (xsafar23)

import useSWR from "swr";
import { TaskList, Task } from "../../lib/models";
import client from "./client";

export interface AsyncDataProps<T> {
    isLoading: boolean,
    isError: boolean,
    data: T
}

function useAsyncData<T>(query: string): AsyncDataProps<T> {
    const { data, error } = useSWR<T>(query, (query) => client.query<T>(query));

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
    return useAsyncData<Task[]>(`/myday`);
}