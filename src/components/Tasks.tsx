import React, { Fragment, MouseEvent, ReactElement, useState, useCallback, useEffect } from "react";
import { Task, TaskList } from "../../lib/models";
import { useTasksByTaskList } from "../data/hooks";
import TaskDetails from "./TaskDetails";
import TaskListTitle from "./TaskListTitle";
import CenterWrapper from "./CenterWrapper";
import Loading from "./Loading";
import { openTaskListPropsMenuMessage, openTaskPropsMenuMessage } from "../ipc/ipcMessages";
import { sendIpcMessage } from "../renderer";
import TasksBoxes from "./TasksBoxes"
import InputContainer from "./InputContainer";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";

//TODO: rozclenit na komponenty

export interface TasksProps {
    taskList: TaskList,
    isLoading: boolean,
    isError: boolean,
    tasks: Task[],
}

const showPopupMenu = (e: MouseEvent, taskList: TaskList) => {
    e.preventDefault();
    e.stopPropagation();
    sendIpcMessage(window.electron.ipcRenderer, openTaskListPropsMenuMessage(taskList));
}

const showTaskPopupMenu = (e: MouseEvent, task: Task) => {
    e.preventDefault();
    e.stopPropagation();
    sendIpcMessage(window.electron.ipcRenderer, openTaskPropsMenuMessage(task));
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    background: isDragging ? "#293249" : "none",
    borderRadius: "10px",
    ...draggableStyle
})

const Tasks = (props: TasksProps): ReactElement => {
    const [selected, setSelected] = useState<number>(-1);

    const [sortedTasks, setSortedTasks] = useState(props.tasks);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        const items = Array.from(sortedTasks);
        const [newOrder] = items.splice(source.index, 1);
        items.splice(destination.index, 0, newOrder);

        setSortedTasks(items);
    }

    //TODO Nějakej state, podle čeho budeme řadit

    if (props.isLoading) {
        return (
            <CenterWrapper>
                <Loading />
            </CenterWrapper>
        )
    }

    if (props.isError) {
        return <div>Error??</div>
    }

    const completedTasks: Task[] = props.tasks.filter(task => task.completeTime).sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));
    const progressTasks: Task[] = props.tasks.filter(task => !task.completeTime).sort((a, b) => a.sort - b.sort || a.title.localeCompare(b.title));

    {/*
      * let taskDetails = <Fragment />
      * if(selected != null) {
      *     let taskDetails = <TaskDetails task={tasks[0]} />
      * }
      */}
    const select = (e: MouseEvent, taskId: number) => {
        e.stopPropagation();
        if (selected === taskId) {
            setSelected(-1);
            return;
        }
        setSelected(taskId);
    };

    const selectedTask: Task = props.tasks.find(tsk => tsk.id === selected);
    console.log(selectedTask);

    return (
        <div className="taskListLayout">
            <div className="taskListPage" onClick={(e: MouseEvent) => { select(e, -1) }}>
                <div className="taskNameAndList">
                    <TaskListTitle className="taskTitleRenameBox" displayName={props.taskList.displayName} taskListId={props.taskList.id}></TaskListTitle>
                    <div className="taskMenuList">
                        <button onClick={(e: MouseEvent) => showPopupMenu(e, props.taskList)}>···</button>
                    </div>
                </div>
                <h4>{props.taskList.description}</h4>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="sortedTasks">
                        {(provided) => (
                            <div className="sortedTasks" {...provided.droppableProps} ref={provided.innerRef}>
                                {progressTasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                <div key={task.id} onClick={(e: MouseEvent) => { select(e, task.id) }} onContextMenu={(e: MouseEvent) => showTaskPopupMenu(e, task)}>
                                                    <TasksBoxes className="taskBox" tasks={props.tasks} taskId={task.id} taskStatus={task.status} taskImportance={task.importance} taskTitle={task.title} ></TasksBoxes>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                {completedTasks.map(task => (
                    <div key={task.id} onClick={(e: MouseEvent) => { select(e, task.id) }} >
                        <TasksBoxes className="taskBoxCompleted" tasks={props.tasks} taskId={task.id} taskStatus={task.status} taskImportance={task.importance} taskTitle={task.title}></TasksBoxes>
                    </div>
                ))}
                {<InputContainer className="inputContainer" taskListId={props.taskList.id}></InputContainer>}
            </div>
            {selectedTask ? <TaskDetails key={selectedTask.id} taskListId={selectedTask.taskListId} task={selectedTask} /> : <Fragment />}
        </div>
    )

}

export default Tasks;
