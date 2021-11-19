// To-Do Plus
// rest-client.ts
// @author Miroslav Safar (xsafar23)

import { TaskList, Task, SubTask, Importance, TaskStatus, Nullable } from "./models";
import { ToDoListClient } from "./todo-client";

interface UpdateTaskListRequest {
    displayName?: string;
    color?: string;
    description?: string;
}

class TodoListRestClient implements ToDoListClient {

    URL: string;

    constructor(URL :string) {
        this.URL = URL;
    }

    async query<T>(query: string, ...args: any[]): Promise<T> {
        const response = await fetch(`${this.URL}${query}`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return await response.json();
    }

    async getAllLists(): Promise<TaskList[]> {
        return await this.query<TaskList[]>('/tasklists');
    }

    async createNewTaskList(title: string): Promise<TaskList> {
        const response = await fetch(`${this.URL}/tasklists`, {
        method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                displayName: title
            })
        });
        return (await response.json() as TaskList);
    }

    deleteTaskList(taskListId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    setTaskListTitle(taskListId: number, title: string): Promise<TaskList> {
        throw new Error("Method not implemented.");
    }

    setTaskListColor(taskListId: number, color: string): Promise<TaskList> {
        throw new Error("Method not implemented.");
    }

    async getAllTasks(taskListId: number): Promise<Task[]> {
        return await this.query<Task[]>(`/tasklists/${taskListId}`);
    }

    async createNewTask(taskListId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                title: title
            })
        });
        return (await response.json() as Task);
    }

    deleteTask(taskId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    setTaskTitle(taskId: number, title: string): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    setTaskDue(taskId: number, date: Nullable<Date>): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    setTaskImportance(taskId: number, importance: Importance): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    setTaskSort(taskId: number, sort: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    completeTask(taskId: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    uncompleteTask(taskId: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    createNewSubTask(taskId: number, title: string): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    deleteSubTask(subTaskId: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    setSubTaskSort(subTaskId: number, sort: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    completeSubTask(subTaskId: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    uncompleteSubTask(subTaskId: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    async getMyDayTasks(): Promise<Task[]> {
        return await this.query<Task[]>('/tasklists/myday/tasks');
    }

    async getImportantTasks(): Promise<Task[]> {
        return await this.query<Task[]>('/tasklists/important/tasks');
    }

    addTaskToMyDay(taskId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export default TodoListRestClient
