// To-Do Plus
// rest-client.ts
// @author Miroslav Safar (xsafar23)

import { TaskList, Task, SubTask, Importance, TaskStatus, Nullable } from "./models";
import { ToDoListClient } from "./todo-client";

class TodoListRestClient implements ToDoListClient {

    URL: string;
    bearerToken: string;

    constructor(URL: string) {
        this.URL = URL;
        this.bearerToken = undefined;
    }

    getBearerToken() : string {
        return this.bearerToken;
    }

    setBearerToken(bearerToken: string) {
        this.bearerToken = bearerToken;
    }

    async login(username: string, password: string) : Promise<string> {
        const response = await fetch(`${this.URL}/users/login`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const res = await response.json();
        this.setBearerToken(res.token);
        return res.token;
        
    }

    async registerAndLogin(username: string, email: string, password: string) : Promise<string> {
        const response = await fetch(`${this.URL}/users/register`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const res = await response.json();
        this.setBearerToken(res.token);
        return res.token;
    }

    async query<T>(query: string, ...args: any[]): Promise<T> {
        const response = await fetch(`${this.URL}${query}`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
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
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                displayName: title
            })
        });
        return (await response.json() as TaskList);
    }

    async deleteTaskList(taskListId: number): Promise<boolean> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}`, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            })
        });
        return (response.ok);
    }

    async setTaskListTitle(taskListId: number, title: string): Promise<TaskList> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                displayName: title
            })
        });
        return (await response.json() as TaskList);
    }

    async setTaskListColor(taskListId: number, color: string): Promise<TaskList> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                color: color
            })
        });
        return (await response.json() as TaskList);
    }

    async getAllTasks(taskListId: number): Promise<Task[]> {
        return await this.query<Task[]>(`/tasklists/${taskListId}`);
    }

    async createNewTask(taskListId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                title: title
            })
        });
        return (await response.json() as Task);
    }

    async deleteTask(taskListId: number, taskId: number): Promise<boolean> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}`, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            })
        });
        return (response.ok);
    }

    async setTaskTitle(taskListId: number, taskId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                title: title
            })
        });
        return (await response.json() as Task);
    }

    async setTaskDue(taskListId: number, taskId: number, date: Nullable<Date>): Promise<Task> {
        if (!date) {
            const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/duedate`, {
                method: 'delete',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Bearer': this.bearerToken,
                })
            });
            return (await response.json() as Task);
        }
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                dueTime: date.getTime()
            })
        });
        return (await response.json() as Task);
    }

    async setTaskImportance(taskListId: number, taskId: number, importance: Importance): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                importance: importance
            })
        });
        return (await response.json() as Task);
    }

    async setTaskSort(taskListId: number, taskId: number, sort: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                sort: sort
            })
        });
        return (await response.json() as Task);
    }

    async completeTask(taskListId: number, taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/close`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    async uncompleteTask(taskListId: number, taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/reopen`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    async createNewSubTask(taskListId: number, taskId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                title: title
            })
        });
        return (await response.json() as Task);
    }

    async deleteSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks/${subTaskId}`, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    async setSubTaskTitle(taskListId: number, taskId: number, subTaskId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks/${subTaskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                title: title
            })
        });
        return (await response.json() as Task);
    }

    async setSubTaskSort(taskListId: number, taskId: number, subTaskId: number, sort: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks/${subTaskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            }),
            body: JSON.stringify({
                sort: sort
            })
        });
        return (await response.json() as Task);
    }

    async completeSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks/${subTaskId}/close`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    async uncompleteSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks/${subTaskId}/reopen`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    async getMyDayTasks(): Promise<Task[]> {
        return await this.query<Task[]>('/tasklists/c/myday/tasks');
    }

    async getImportantTasks(): Promise<Task[]> {
        return await this.query<Task[]>('/tasklists/c/important/tasks');
    }

    async addTaskToMyDay(taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/c/myday/tasks/add/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    async removeTaskFromMyDay(taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/c/myday/tasks/remove/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Bearer': this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }
}

export default TodoListRestClient
