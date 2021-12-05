/*
** To-Do Plus
** DraggableTasks.tsx
** @author Miroslav Safar (xsafar23)
** @author Michaela Parilova (xparil04)
*/

import React, { Fragment, ReactElement, MouseEvent } from "react"
import { Task } from "../../../lib/models";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import TasksBoxes from "./TasksBoxes";
import { sendIpcMessage } from "../../renderer";
import { openTaskPropsMenuMessage } from "../../ipc/ipcMessages";

// @author Miroslav Safar
export interface DraggableTasksProps {
    onDragEnd: (result: DropResult) => void,
    tasks: Task[],
    select: (e: MouseEvent, taskId: number) => void
    selected: number
}

// @author Miroslav Safar
const showTaskPopupMenu = (e: MouseEvent, task: Task) => {
    e.preventDefault();
    e.stopPropagation();
    sendIpcMessage(window.electron.ipcRenderer, openTaskPropsMenuMessage(task));
}

/**
** @brief Styling for drag and drop
**
** @param isDragging: Indicates if component is being dragged
** @param draggableStyle: Style of component which is being dragged
** @author Michaela Parilova (xparil04)
*/
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    background: isDragging ? "#293249" : "none",
    borderRadius: "10px",
    ...draggableStyle
})

/**
** Drag and drop functionality for displayed tasks (except non draggable
** tasks such as completed tasks or tasks in builtin tasks lists)
**
** @author Michaela Parilova (xparil04)
*/
const DraggableTasks = (props: DraggableTasksProps): ReactElement => {

  /*
  ** Rendering
  */

    return (
        <DragDropContext onDragEnd={props.onDragEnd}>
            <Droppable droppableId="sortedTasks">
                {(provided) => (
                    <div className="sortedTasks" {...provided.droppableProps} ref={provided.innerRef}>
                        {props.tasks.sort((a, b) => a.sort - b.sort).map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                {(provided, snapshot) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                        <div key={task.id} onClick={(e: MouseEvent) => { props.select(e, task.id) }} onContextMenu={(e: MouseEvent) => showTaskPopupMenu(e, task)}>
                                            <TasksBoxes className="taskBox" task={task} key={task.id} />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder ? <div style={{ marginBottom: "15px" }}>{provided.placeholder}</div> : <Fragment />}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default DraggableTasks;
