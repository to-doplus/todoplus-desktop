import React, { Fragment, MouseEvent, ReactElement, useState, useCallback, useEffect } from "react";
import { Task, TaskList } from "../../lib/models";
import { useTasksByTaskList } from "../data/hooks";
import TaskDetails from "./TaskDetails";
import TaskListTitle from "./TaskListTitle";
import TaskListDescription from "./TaskListDescription";
import CenterWrapper from "./CenterWrapper";
import Loading from "./Loading";
import { openTaskListPropsMenuMessage, openTaskPropsMenuMessage } from "../ipc/ipcMessages";
import { sendIpcMessage } from "../renderer";
import TasksBoxes from "./TasksBoxes"
import InputContainer from "./InputContainer";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { moveTask } from "../data/actions";
import TaskListView from "../views/TaskListView";
import SearchBar from "./SearchBar";

//TODO: rozclenit na komponenty

export interface TasksProps {
    taskList: TaskList,
    isLoading: boolean,
    isError: boolean,
    tasks: Task[],
    focus?: string
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

    const [searchPhrase, setSearchPhrase] = useState("");

    const [selected, setSelected] = useState<number>(-1);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        if(!props.tasks) return;
        const task = props.tasks.find(tsk => tsk.id === Number(result.draggableId));
        moveTask(task, destination.index);
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

    const completedTasks: Task[] = props.tasks.filter(task => task.completeTime).sort((a, b) => new Date(a.completeTime).getTime() - new Date(b.completeTime).getTime());
    const progressTasks: Task[] = props.tasks.filter(task => !task.completeTime).sort((a, b) => a.sort - b.sort);

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
                <SearchBar setSearchPhrase={setSearchPhrase} />
                <div className="taskNameAndList">
                    <TaskListTitle className="taskTitleRenameBox" displayName={props.taskList.displayName} taskListId={props.taskList.id}></TaskListTitle>
                    <div className="taskMenuList">
                        <button onClick={(e: MouseEvent) => showPopupMenu(e, props.taskList)}>···</button>
                    </div>
                </div>
                <TaskListDescription className="taskTitleRenameBox" displayDescription={props.taskList.description} taskListId={props.taskList.id}/>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="sortedTasks">
                        {(provided) => (
                            <div className="sortedTasks" {...provided.droppableProps} ref={provided.innerRef}>
                                {progressTasks.filter((task) => {return task.title.includes(searchPhrase) ? task : null}).sort((a,b) => a.sort - b.sort).map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                <div key={task.id} onClick={(e: MouseEvent) => { select(e, task.id) }} onContextMenu={(e: MouseEvent) => showTaskPopupMenu(e, task)}>
                                                    <TasksBoxes className="taskBox" taskListId={task.taskListId} tasks={props.tasks} taskId={task.id} taskStatus={task.status} taskImportance={task.importance} taskMyDay={task.myDay} taskTitle={task.title} ></TasksBoxes>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder ? <div style={{marginBottom: "15px"}}>{provided.placeholder}</div> : <Fragment />}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                {completedTasks.filter((task) => {return task.title.includes(searchPhrase) ? task : null}).map(task => (
                    <div key={task.id} onClick={(e: MouseEvent) => { select(e, task.id) }} >
                        <TasksBoxes className="taskBoxCompleted" taskListId={task.taskListId} tasks={props.tasks} taskId={task.id} taskStatus={task.status} taskImportance={task.importance} taskMyDay={task.myDay} taskTitle={task.title}></TasksBoxes>
                    </div>
                ))}
                {<InputContainer className="inputContainer" taskListId={props.taskList.id}></InputContainer>}
            </div>
            {selectedTask ? <TaskDetails key={selectedTask.id} taskListId={selectedTask.taskListId} task={selectedTask} /> : <Fragment />}
        </div>
    )

}

export default Tasks;
