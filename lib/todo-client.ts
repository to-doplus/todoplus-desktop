// To-Do Plus
// todo-client.ts
// @author Miroslav Safar (xsafar23)

import { Task, TaskList, Importance, Nullable, UserSettings } from "./models";

export interface Response {
    status: number
}

/**
 * Interface for To-Do Plus client
 */
export interface ToDoListClient {
    /**
     * Get the authentication token
     * @returns Authentication Bearer token as a string
     */
    getBearerToken(): string;

    /**
     * Set the authentication token
     * @param bearerToken Authentication Bearer token as a string
     */
    setBearerToken(bearerToken: string): void;

    /**
     * Login with credentials
     * @param username Username
     * @param password Password
     * @returns Authentication token
     */
    login(username: string, password: string): Promise<string & Response>;
    
    /**
     * Register with credentials and then login with them
     * @param username Username
     * @param email Email
     * @param password Password
     * @returns Authentication token
     */
    registerAndLogin(username: string, email: string, password: string): Promise<string & Response>;

    /**
     * Make a call to url and return received data
     * @param query Endpoint url
     * @param args NOT USED - only for compatibility reason
     * @returns Received data as JSON object
     */
    query<T>(query: string, ...args: any[]): Promise<T>;

    /**
     * Get all task lists
     * @returns Unsorted array of the task list
     */
    getAllLists(): Promise<TaskList[]>;

    /**
     * Create a new taskList with the title
     * @param title Title of the task list
     * @returns Created tasklist
     */
    createNewTaskList(title: string): Promise<TaskList>;

    /**
     * Delete task list with specified id
     * @param taskListId Id of the tasklist which should be deleted
     * @returns True if it was successfull
     */
    deleteTaskList(taskListId: number): Promise<boolean>;

    /**
     * Set title of the tasklist
     * @param taskListId Id of the tasklist
     * @param title Title
     * @returns Updated tasklist
     */
    setTaskListTitle(taskListId: number, title: string): Promise<TaskList>;
    
    /**
     * Set color of the tasklist
     * @param taskListId Id of the tasklist
     * @param color Color
     * @returns Updated tasklist
     */
    setTaskListColor(taskListId: number, color: string): Promise<TaskList>;
    
    /**
     * Set description of the tasklist
     * @param taskListId Id of the tasklist
     * @param description Description
     * @returns Updated tasklist
     */
    setTaskListDescription(taskListId: number, description: string): Promise<TaskList>;

    /**
     * Get all tasks of the tasklist
     * @param taskListId Id of the tasklist
     * @returns Unsorted array of the tasks
     */
    getAllTasks(taskListId: number): Promise<Task[]>;

    /**
     * Create a new task in the tasklist
     * @param taskListId Id of the tasklist
     * @param title Title of the task
     * @returns Created task
     */
    createNewTask(taskListId: number, title: string): Promise<Task>;
    
    /**
     * Delete task from the tasklist
     * @param taskListId Id of the tasklist
     * @param taskId Id of the task
     * @returns True if it was successfull
     */
    deleteTask(taskListId: number, taskId: number): Promise<boolean>;

    /**
     * Set title of the task
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @param title Title
     * @returns Updated Task
     */
    setTaskTitle(taskListId: number, taskId: number, title: string): Promise<Task>;
    
    /**
     * Set Due Date of the task, if it is null, due date is removed.
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @param date Due Date
     * @returns Updated Task
     */
    setTaskDue(taskListId: number, taskId: number, date: Nullable<Date>): Promise<Task>;
    
    /**
     * Set importance of the task
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @param importance New importance
     * @returns Updated Task
     */
    setTaskImportance(taskListId: number, taskId: number, importance: Importance): Promise<Task>;

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
    setTaskSort(taskListId: number, taskId: number, sort: number): Promise<Task>;
    
    /**
     * Mark task as completed
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @returns Updated Task
     */
    completeTask(taskListId: number, taskId: number): Promise<Task>;
    
    /**
     * Mark task as in progress
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @returns Updated Task
     */
    uncompleteTask(taskListId: number, taskId: number): Promise<Task>;

    /**
     * Creates a new subtask of task
     * @param taskListId Id of the tasklist containing task
     * @param taskId Id of the task
     * @param title Title of the subtask
     * @returns Updated Task
     */
    createNewSubTask(taskListId: number, taskId: number, title: string): Promise<Task>;
    
    /**
     * Delete subtask of the task
     * @param taskListId Id of the tasklist containing task with subtask
     * @param taskId Id of the task with subtask
     * @param subTaskId Id of the subtask
     * @returns Updated Task
     */
    deleteSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task>;

    /**
     * Set title of the subtask
     * @param taskListId Id of the tasklist containing task with subtask
     * @param taskId Id of the task with subtask
     * @param subTaskId Id of the subtask
     * @param title Title of the subtask
     * @returns Updated Task with updated subtask
     */
    setSubTaskTitle(taskListId: number, taskId: number, subTaskId: number, title: string): Promise<Task>
    
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
    setSubTaskSort(taskListId: number, taskId: number, subTaskId: number, sort: number): Promise<Task>;
    
    /**
     * Mark subtask as completed
     * @param taskListId Id of the tasklist containing task with subtask
     * @param taskId Id of the task with subtask
     * @param subTaskId Id of the subtask
     * @returns Update Task with updated subtask
     */
    completeSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task>;
    
    /**
     * Mark subtask as in progress
     * @param taskListId Id of the tasklist containing task with subtask
     * @param taskId Id of the task with subtask
     * @param subTaskId Id of the subtask
     * @returns Update Task with updated subtask
     */
    uncompleteSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task>;

    /**
     * Get tasks in My day tasklist
     * @returns Unsorted array of tasks
     */
    getMyDayTasks(): Promise<Task[]>;

    /**
     * Get tasks in Important tasklist
     * @returns Unsorted array of tasks
     */
    getImportantTasks(): Promise<Task[]>;

    /**
     * Add task to My day tasklist
     * @param taskId If of the task
     * @returns Updated task
     */
    addTaskToMyDay(taskId: number): Promise<Task>;

    /**
     * Remove task to My day tasklist
     * @param taskId If of the task
     * @returns Updated task
     */
    removeTaskFromMyDay(taskId: number): Promise<Task>;

    /**
     * Get settings of the current user
     * @returns Settings of the current user
     */
    getSettings(): Promise<UserSettings>;

    /**
     * Set My Day Enabled setting
     * @param value New value
     * @returns Updated UserSettings
     */
    setMyDayEnabled(value: boolean): Promise<UserSettings>;

    /**
     * Set Important Enabled setting
     * @param value New value
     * @returns Updated UserSettings
     */
    setImportantEnabled(value: boolean): Promise<UserSettings>;
}
