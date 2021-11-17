import { Task, TaskList, SubTask, TaskStatus, Importance, Nullable } from "./models";

export interface ToDoListClient {
    query<T>(query: string, ...args: any[]): Promise<T>;
    getAllLists(): Promise<TaskList[]>;
    createNewTaskList(title: string): Promise<number>;
    deleteTaskList(taskListId: number): Promise<boolean>;

    setTaskListTitle(taskListId: number, title: string): Promise<boolean>;
    setTaskListColor(taskListId: number, color: string): Promise<boolean>;

    getAllTasks(taskListId: number): Promise<Task[]>;
    createNewTask(taskListId: number, title: string): Promise<number>;
    deleteTask(taskId: number): Promise<boolean>;

    setTaskTitle(taskId: number, title: string): Promise<boolean>;
    setTaskDue(taskId: number, date: Nullable<Date>): Promise<boolean>;
    setTaskImportance(taskId: number, importance: Importance): Promise<boolean>;
    setTaskSort(taskId: number, sort: number): Promise<boolean>;
    completeTask(taskId: number): Promise<boolean>;
    uncompleteTask(taskId: number): Promise<boolean>;

    getAllSubTasks(taskId: number): Promise<SubTask[]>;
    createNewSubTask(taskId: number, title: string): Promise<number>;
    deleteSubTask(subTaskId: number): Promise<boolean>;

    setSubTaskSort(subTaskId: number, sort: number): Promise<boolean>;
    completeSubTask(subTaskId: number): Promise<boolean>;
    uncompleteSubTask(subTaskId: number): Promise<boolean>;

    getMyDayTasks(): Promise<Task[]>;
    addTaskToMyDay(taskId: number): Promise<boolean>;
}
