// To-Do Plus
// models.ts
// @author Miroslav Safar (xsafar23)

/**
 * Status of the task
 */
export type TaskStatus = "INPROGRESS" | "COMPLETED";
/**
 * Importance of the task
 */
export type Importance = "LOW" | "NORMAL" | "HIGH";
export type Nullable<T> = T | null;

/**
 * Idable entity
 */
export interface Entity {
    id: number
}

/**
 * Entity of the TaskList
 */
export interface TaskList extends Entity {
    displayName: string,
    color: string,
    description: Nullable<string>
    buildIn?: boolean /** Is task build in? */
}

/**
 * Entity of the Task
 */
export interface Task extends Entity {
    title: string, /** Title of the task */
    status: TaskStatus, /** Status of the task */
    taskListId: number, /** Id of the tasklist that contains this task */
    createTime: Nullable<Date>, /** Time when the task was created */
    dueTime: Nullable<Date>, /** Due of the task */
    completeTime: Nullable<Date>, /** Time when the task was completed. It is null if it still in progress */
    importance: Importance, /** Importance of the task */
    subTasks: SubTask[], /** Subtasks of the task */
    descripton: Nullable<string>, /** Description of the task */
    sort: number, /** Sort index of the task */
    myDay: boolean /** Is task in myDay? */
}

/**
 * Entity of the SubTask
 */
export interface SubTask extends Entity {
    title: string, /** Title of the subtask */
    status: TaskStatus, /** Status of the subtask */
    sort: number /** Sort index of the subtask */
}

/**
 * Entity of User Settings
 */
export interface UserSettings {
    myDayEnabled: boolean, /** Is My day buildin tasklist enabled */
    importantEnabled: boolean, /** Is Important buildin tasklist enabled */
}
