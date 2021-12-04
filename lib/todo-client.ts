// To-Do Plus
// todo-client.ts
// @author Miroslav Safar (xsafar23)

import { Task, TaskList, Importance, Nullable, UserSettings } from "./models";

export interface Response {
    status: number
}

export interface ToDoListClient {
    getBearerToken() : string;
    setBearerToken(bearerToken: string) : void;

    login(username: string, password: string) : Promise<string>;
    registerAndLogin(username: string, email: string, password: string) : Promise<string>;

    query<T>(query: string, ...args: any[]): Promise<T>;
    getAllLists(): Promise<TaskList[]>;
    createNewTaskList(title: string): Promise<TaskList>;
    deleteTaskList(taskListId: number): Promise<boolean>;

    setTaskListTitle(taskListId: number, title: string): Promise<TaskList>;
    setTaskListColor(taskListId: number, color: string): Promise<TaskList>;
    setTaskListDescription(taskListId: number, description: string): Promise<TaskList>;

    getAllTasks(taskListId: number): Promise<Task[]>;
    createNewTask(taskListId: number, title: string): Promise<Task>;
    deleteTask(taskListId: number, taskId: number): Promise<boolean>;

    setTaskTitle(taskListId: number, taskId: number, title: string): Promise<Task>;
    setTaskDue(taskListId: number, taskId: number, date: Nullable<Date>): Promise<Task>;
    setTaskImportance(taskListId: number, taskId: number, importance: Importance): Promise<Task>;

    setTaskSort(taskListId: number, taskId: number, sort: number): Promise<Task>;
    completeTask(taskListId: number, taskId: number): Promise<Task>;
    uncompleteTask(taskListId: number, taskId: number): Promise<Task>;

    createNewSubTask(taskListId: number, taskId: number, title: string): Promise<Task>;
    deleteSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task>;

    setSubTaskTitle(taskListId: number, taskId: number, subTaskId: number, title: string): Promise<Task>
    setSubTaskSort(taskListId: number, taskId: number, subTaskId: number, sort: number): Promise<Task>;
    completeSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task>;
    uncompleteSubTask(taskListId: number, taskId: number, subTaskId: number): Promise<Task>;

    getMyDayTasks(): Promise<Task[]>;
    addTaskToMyDay(taskId: number): Promise<Task>;
    removeTaskFromMyDay(taskId: number) : Promise<Task>;

    getSettings(): Promise<UserSettings>;
    setMyDayEnabled(value: boolean): Promise<UserSettings>;
    setImportantEnabled(value: boolean): Promise<UserSettings>;
}
