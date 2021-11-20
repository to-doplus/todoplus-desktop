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

    constructor(URL: string) {
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

    async deleteTaskList(taskListId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async setTaskListTitle(taskListId: number, title: string): Promise<TaskList> {
        throw new Error("Method not implemented.");
    }

    async setTaskListColor(taskListId: number, color: string): Promise<TaskList> {
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

    async deleteTask(taskListId: number, taskId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async setTaskTitle(taskListId: number, taskId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                title: title
            })
        });
        return (await response.json() as Task);
    }

    async setTaskDue(taskListId: number, taskId: number, date: Nullable<Date>): Promise<Task> {
        if(!date) {
            //TODO: Add new endpoint to remove dueDate
        }
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                dueDate: date
            })
        });
        return (await response.json() as Task);
    }

    async setTaskImportance(taskListId: number, taskId: number, importance: Importance): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    async setTaskSort(taskListId: number, taskId: number, sort: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                sort: sort
            })
        });
        return (await response.json() as Task);
    }

    async completeTask(taskListId: number, taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/close`, {
            method: 'put'
        });
        return (await response.json() as Task);
    }

    async uncompleteTask(taskListId: number, taskId: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    async createNewSubTask(taskListId: number, taskId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks`, {
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

    async deleteSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    async setSubTaskSort(taskListId: number, taskId: number, subTaskId: number, sort: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    async completeSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    async uncompleteSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task> {
        throw new Error("Method not implemented.");
    }

    async getMyDayTasks(): Promise<Task[]> {
        return await this.query<Task[]>('/tasklists/c/myday/tasks');
    }

    async getImportantTasks(): Promise<Task[]> {
        return await this.query<Task[]>('/tasklists/c/important/tasks');
    }

    async addTaskToMyDay(taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/c/myday/tasks/add/${taskId}`, {
            method: 'put'
        });
        return (await response.json() as Task);
    }

    async removeTaskFromMyDay(taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/c/myday/tasks/remove/${taskId}`, {
            method: 'put'
        });
        return (await response.json() as Task);
    }
}

export default TodoListRestClient
