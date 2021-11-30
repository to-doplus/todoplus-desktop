// To-Do Plus
// models.ts
// @author Miroslav Safar (xsafar23)

export type TaskStatus = "INPROGRESS" | "COMPLETED";
export type Importance = "LOW" | "NORMAL" | "HIGH";
export type Nullable<T> = T | null;

export interface Entity {
    id: number
}

export interface TaskList extends Entity {
    displayName: string,
    color: string,
    description: Nullable<string>
}

export interface Task extends Entity {
    title: string,
    status: TaskStatus,
    taskListId: number,
    createTime: Nullable<Date>,
    dueTime: Nullable<Date>,
    completeTime: Nullable<Date>,
    importance: Importance,
    subTasks: SubTask[],
    descripton: Nullable<string>,
    sort: number,
    myDay: boolean
}

export interface SubTask extends Entity {
    title: string,
    status: TaskStatus,
    sort: number
}
