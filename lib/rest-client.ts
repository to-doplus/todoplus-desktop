// To-Do Plus
// rest-client.ts
// @author Miroslav Safar (xsafar23)

import { TaskList, Task, SubTask, Importance, TaskStatus, Nullable, UserSettings } from "./models";
import { Response, ToDoListClient } from "./todo-client";

/**
 * REST Client for To-Do Plus
 */
class TodoListRestClient implements ToDoListClient {

    URL: string;
    bearerToken: string;

    /**
     * Constructor
     * @param URL REST Endpoint
     */
    constructor(URL: string) {
        this.URL = URL;
        this.bearerToken = undefined;
    }

    /**
     * Get the authentication token
     * @returns Authentication Bearer token as a string
     */
    getBearerToken(): string {
        return this.bearerToken;
    }

    /**
     * Set the authentication token
     * @param bearerToken Authentication Bearer token as a string
     */
    setBearerToken(bearerToken: string) {
        this.bearerToken = bearerToken;
    }

    /**
     * Login with credentials
     * @param username Username
     * @param password Password
     * @returns Authentication token
     */
    async login(username: string, password: string): Promise<string & Response> {
        const response = await fetch(`${this.URL}/public/users/login`, {
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

    /**
     * Register with credentials and then login with them
     * @param username Username
     * @param email Email
     * @param password Password
     * @returns Authentication token
     */
    async registerAndLogin(username: string, email: string, password: string): Promise<string & Response> {
        const response = await fetch(`${this.URL}/public/users/register`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        const res = await response.json();
        this.setBearerToken(res.token);
        return res.token;
    }

    /**
     * Make a REST GET call to url and return received data
     * @param query Endpoint url
     * @param args NOT USED - only for compatibility reason
     * @returns Received data as JSON object
     */
    async query<T>(query: string, ...args: any[]): Promise<T> {
        const response = await fetch(`${this.URL}${query}`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            })
        });
        return await response.json()
    }

    /**
     * Get all task lists
     * @returns Unsorted array of the task list
     */
    async getAllLists(): Promise<TaskList[]> {
        return await this.query<TaskList[]>('/tasklists');
    }

    /**
     * Create a new taskList with the title
     * @param title Title of the task list
     * @returns Created tasklist
     */
    async createNewTaskList(title: string): Promise<TaskList> {
        const response = await fetch(`${this.URL}/tasklists`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                displayName: title
            })
        });
        return (await response.json() as TaskList);
    }

    /**
     * Delete task list with specified id
     * @param taskListId Id of the tasklist which should be deleted
     * @returns True if it was successfull
     */
    async deleteTaskList(taskListId: number): Promise<boolean> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}`, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            })
        });
        return (response.ok);
    }

    /**
     * Set title of the tasklist
     * @param taskListId Id of the tasklist
     * @param title Title
     * @returns Updated tasklist
     */
    async setTaskListTitle(taskListId: number, title: string): Promise<TaskList> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                displayName: title
            })
        });
        return (await response.json() as TaskList);
    }

    /**
     * Set color of the tasklist
     * @param taskListId Id of the tasklist
     * @param color Color
     * @returns Updated tasklist
     */
    async setTaskListColor(taskListId: number, color: string): Promise<TaskList> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                color: color
            })
        });
        return (await response.json() as TaskList);
    }

    /**
     * Set description of the tasklist
     * @param taskListId Id of the tasklist
     * @param description Description
     * @returns Updated tasklist
     */
    async setTaskListDescription(taskListId: number, description: string): Promise<TaskList> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                description: description
            })
        });
        return (await response.json() as TaskList);
    }

    /**
     * Get all tasks of the tasklist
     * @param taskListId Id of the tasklist
     * @returns Unsorted array of the tasks
     */
    async getAllTasks(taskListId: number): Promise<Task[]> {
        return await this.query<Task[]>(`/tasklists/${taskListId}`);
    }

    /**
     * Create a new task in the tasklist
     * @param taskListId Id of the tasklist
     * @param title Title of the task
     * @returns Created task
     */
    async createNewTask(taskListId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                title: title
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Delete task from the tasklist
     * @param taskListId Id of the tasklist
     * @param taskId Id of the task
     * @returns True if it was successfull
     */
    async deleteTask(taskListId: number, taskId: number): Promise<boolean> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}`, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            })
        });
        return (response.ok);
    }

    /**
     * Set title of the task
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @param title Title
     * @returns Updated Task
     */
    async setTaskTitle(taskListId: number, taskId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                title: title
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Set Due Date of the task, if it is null, due date is removed.
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @param date Due Date
     * @returns Updated Task
     */
    async setTaskDue(taskListId: number, taskId: number, date: Nullable<Date>): Promise<Task> {
        if (!date) {
            const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/duedate`, {
                method: 'delete',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.bearerToken,
                })
            });
            return (await response.json() as Task);
        }
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                dueTime: date.getTime()
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Set importance of the task
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @param importance New importance
     * @returns Updated Task
     */
    async setTaskImportance(taskListId: number, taskId: number, importance: Importance): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                importance: importance
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Move task to index in sorted task by task sort value.
     * 
     * WARNING! Side effect of the method is change of sort value of all tasks that needs to be moved to create a place for the task.
     * 
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @param sort New index
     * @returns Updated task
     */
    async setTaskSort(taskListId: number, taskId: number, sort: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                sort: sort
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Mark task as completed
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @returns Updated Task
     */
    async completeTask(taskListId: number, taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/close`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Mark task as in progress
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @returns Updated Task
     */
    async uncompleteTask(taskListId: number, taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/reopen`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Creates a new subtask of task
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @param title Title of the subtask
     * @returns Updated Task
     */
    async createNewSubTask(taskListId: number, taskId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks`, {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                title: title
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Delete subtask of the task
     * @param taskListId Id of the tasklist containing task with subtask
     * @param taskId Id of the task with subtask
     * @param subTaskId Id of the subtask
     * @returns Updated Task
     */
    async deleteSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks/${subTaskId}`, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }
    /**
     * Set title of the subtask
     * @param taskListId Id of the tasklist containing task with subtask
     * @param taskId Id of the task with subtask
     * @param subTaskId Id of the subtask
     * @param title Title of the subtask
     * @returns Updated Task with updated subtask
     */
    async setSubTaskTitle(taskListId: number, taskId: number, subTaskId: number, title: string): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks/${subTaskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                title: title
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Move subtask to new sort index.
     * 
     * WARNING! Side effect of this method is changing sort value of all subtasks in the task which needs to be moved to create a space for the subtask.
     * 
     * @param taskListId Id of the tasklist containing task with subtask
     * @param taskId Id of the task with subtask
     * @param subTaskId Id of the subtask
     * @param sort New sort index
     * @returns Updated Task with updated subtask
     */
    async setSubTaskSort(taskListId: number, taskId: number, subTaskId: number, sort: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks/${subTaskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                sort: sort
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Mark subtask as completed
     * @param taskListId Id of the tasklist containing task with subtask
     * @param taskId Id of the task with subtask
     * @param subTaskId Id of the subtask
     * @returns Update Task with updated subtask
     */
    async completeSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks/${subTaskId}/close`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Mark subtask as in progress
     * @param taskListId Id of the tasklist containing task with subtask
     * @param taskId Id of the task with subtask
     * @param subTaskId Id of the subtask
     * @returns Update Task with updated subtask
     */
    async uncompleteSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/${taskListId}/tasks/${taskId}/subtasks/${subTaskId}/reopen`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Get tasks in My day tasklist
     * @returns Unsorted array of tasks
     */
    async getMyDayTasks(): Promise<Task[]> {
        return await this.query<Task[]>('/tasklists/c/myday/tasks');
    }

    /**
     * Get tasks in Important tasklist
     * @returns Unsorted array of tasks
     */
    async getImportantTasks(): Promise<Task[]> {
        return await this.query<Task[]>('/tasklists/c/important/tasks');
    }

    /**
     * Add task to My day tasklist
     * @param taskId If of the task
     * @returns Updated task
     */
    async addTaskToMyDay(taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/c/myday/tasks/add/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Remove task to My day tasklist
     * @param taskId If of the task
     * @returns Updated task
     */
    async removeTaskFromMyDay(taskId: number): Promise<Task> {
        const response = await fetch(`${this.URL}/tasklists/c/myday/tasks/remove/${taskId}`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            })
        });
        return (await response.json() as Task);
    }

    /**
     * Get settings of the current user
     * @returns Settings of the current user
     */
    async getSettings(): Promise<UserSettings> {
        return this.query<UserSettings>('/users/settings');
    }

    /**
     * Set My Day Enabled setting
     * @param value New value
     * @returns Updated UserSettings
     */
    async setMyDayEnabled(value: boolean): Promise<UserSettings> {
        const response = await fetch(`${this.URL}/users/settings`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                myDayEnabled: value
            })
        });
        return (await response.json() as UserSettings);
    }

    /**
     * Set Important Enabled setting
     * @param value New value
     * @returns Updated UserSettings
     */
    async setImportantEnabled(value: boolean): Promise<UserSettings> {
        const response = await fetch(`${this.URL}/users/settings`, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + this.bearerToken,
            }),
            body: JSON.stringify({
                importantEnabled: value
            })
        });
        return (await response.json() as UserSettings);
    }

}

export default TodoListRestClient
