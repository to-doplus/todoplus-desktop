// client.ts
// @author Miroslav Safar (xsafar23)

import { ToDoListClient } from "../lib/todo-client";
import TodoListRestClient from "../lib/rest-client";
import useSWR from "swr";
import { TaskList, Task } from "../lib/models";

const client : ToDoListClient = new TodoListRestClient("https://api.todoplus.safar.dev");

export interface AsyncDataProps<T> {
    isLoading: boolean,
    isError: boolean,
    data: T
}

function useAsyncData<T>(query: string) : AsyncDataProps <T> {
    const { data, error } = useSWR<T>(query, client.query);

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function useTaskLists() : AsyncDataProps<TaskList[]> {
    return useAsyncData<TaskList[]>("/tasklists");
}

export function useTasksByTaskList(taskListId: number) : AsyncDataProps<Task[]> {
    return useAsyncData<Task[]>(`/tasklists/${taskListId}/tasks`);
}

export default client;