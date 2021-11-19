// To-Do Plus
// todo-client.ts
// @author Miroslav Safar (xsafar23)

import { Task, TaskList, SubTask, TaskStatus, Importance, Nullable } from "./models";

export interface ToDoListClient {
    query<T>(query: string, ...args: any[]): Promise<T>;
    getAllLists(): Promise<TaskList[]>;
    createNewTaskList(title: string): Promise<TaskList>;
    deleteTaskList(taskListId: number): Promise<boolean>;

    setTaskListTitle(taskListId: number, title: string): Promise<TaskList>;
    setTaskListColor(taskListId: number, color: string): Promise<TaskList>;

    getAllTasks(taskListId: number): Promise<Task[]>;
    createNewTask(taskListId: number, title: string): Promise<Task>;
    deleteTask(taskId: number): Promise<boolean>;

    setTaskTitle(taskId: number, title: string): Promise<Task>;
    setTaskDue(taskId: number, date: Nullable<Date>): Promise<Task>;
    setTaskImportance(taskId: number, importance: Importance): Promise<Task>;
    
    setTaskSort(taskId: number, sort: number): Promise<Task>;
    completeTask(taskId: number): Promise<Task>;
    uncompleteTask(taskId: number): Promise<Task>;

    createNewSubTask(taskId: number, title: string): Promise<Task>;
    deleteSubTask(subTaskId: number): Promise<Task>;

    setSubTaskSort(subTaskId: number, sort: number): Promise<Task>;
    completeSubTask(subTaskId: number): Promise<Task>;
    uncompleteSubTask(subTaskId: number): Promise<Task>;

    getMyDayTasks(): Promise<Task[]>;
    addTaskToMyDay(taskId: number): Promise<Task>;
}
