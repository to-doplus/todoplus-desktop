// To-Do Plus
// TaskListList.tsx
// @author Miroslav Safar (xsafar23)

import React, { ReactElement, useCallback } from "react";
import { Link } from "react-router-dom";
import { createNewTaskList } from "../../data/actions";
import { useInput } from "../../hooks/input";
import { useTaskLists } from "../../data/hooks";
import Button from "../Button";
import TaskListRow from "./TaskListRow";
import { sendIpcMessage } from "../../renderer";
import { openTaskListPropsMenuMessage } from "../../ipc/ipcMessages";

export interface TaskListListProps {

}

const TaskListList = (props: TaskListListProps): ReactElement => {
    let { isLoading, isError, data: taskLists } = useTaskLists();

    const showPopupMenu = useCallback((e: MouseEvent, taskListId: number) => {
        e.preventDefault();
        e.stopPropagation();

        const taskList = taskLists.find(list => list.id == taskListId);

        sendIpcMessage(window.electron.ipcRenderer, openTaskListPropsMenuMessage(taskList));
    }, [taskLists]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    taskLists = taskLists.sort((a, b) => a.id - b.id);

    return (
        <div>
            {taskLists.map(taskList => {
                return (
                    <TaskListRow taskListId={taskList.id} color={taskList.color} displayName={taskList.displayName} key={taskList.id} showPopupMenu={showPopupMenu} />
                )
            })}
        </div>
    );
}

export default TaskListList
