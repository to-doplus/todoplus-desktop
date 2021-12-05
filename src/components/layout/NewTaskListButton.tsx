/*
** To-Do Plus
** NewTaskListButton.tsx
** @author Miroslav Safar (xsafar23)
*/

import React, { ReactElement, MouseEvent } from "react"
import { history } from "../../store"
import { createNewTaskList } from "../../data/actions";

/**
 * CreateNewTaskList click ui login
 * @param e HTML MouseEvent
 */
const createNewTask = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const taskListId : number = await createNewTaskList("New tasklist");
    if(!taskListId) return; //TODO: Nastala někde chyba, oznam ji uživateli
    history.push("/tasklists/" + taskListId);
}

/**
 * NewTaskListButton Component
 * Button that creates new tasklist on click
 * @component
 */
const NewTaskListButton = (): ReactElement => {
    return (
        <div className="newTaskList" onClick={(e: MouseEvent) => createNewTask(e)}>
            <div className="icon">
                <i className="fas fa-plus"></i>
            </div>
            New tasklist
            <div className="icon" style={{ marginLeft: "auto" }}>
                <i className="fas fa-clipboard-list"></i>
            </div>
        </div>
    )
}

export default NewTaskListButton
