// To-Do Plus
// models.ts
// @author Miroslav Safar (xsafar23)

export type TaskStatus = "inprogress" | "completed";
export type Importance = "low" | "normal" | "high";
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
    createTime: Nullable<Date>,
    dueTime: Nullable<Date>,
    completeTime: Nullable<Date>,
    importance: Importance,
    subTasks: SubTask[],
    descripton: Nullable<string>,
    sort: number
}

export interface SubTask extends Entity {
    title: string,
    status: TaskStatus,
    sort: number
}
