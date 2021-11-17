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
        const response = await fetch(`${this.URL}/public/tasklists`);
        const json = await response.json();
        return json as TaskList[];
    }
    createNewTaskList(title: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteTaskList(taskListId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setTaskListTitle(taskListId: number, title: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setTaskListColor(taskListId: number, color: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAllTasks(taskListId: number): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    createNewTask(taskListId: number, title: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteTask(taskId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setTaskTitle(taskId: number, title: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setTaskDue(taskId: number, date: Nullable<Date>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setTaskImportance(taskId: number, importance: Importance): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setTaskSort(taskId: number, sort: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    completeTask(taskId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    uncompleteTask(taskId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAllSubTasks(taskId: number): Promise<SubTask[]> {
        throw new Error("Method not implemented.");
    }
    createNewSubTask(taskId: number, title: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteSubTask(subTaskId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setSubTaskSort(subTaskId: number, sort: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    completeSubTask(subTaskId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    uncompleteSubTask(subTaskId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getMyDayTasks(): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    addTaskToMyDay(taskId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export default TodoListRestClient