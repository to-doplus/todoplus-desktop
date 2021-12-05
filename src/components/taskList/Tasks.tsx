/*
** To-Do Plus
** Tasks.tsx
** @author Michaela Parilova (xparil04)
*/

import React, { Fragment, MouseEvent, ReactElement, useState, useCallback, useEffect, useRef } from "react";
import { Task, TaskList } from "../../../lib/models";
import { useTasksByTaskList } from "../../data/hooks";
import TaskDetails from "../taskDetails/TaskDetails";
import TaskListTitle from "./TaskListTitle";
import TaskListDescription from "./TaskListDescription";
import CenterWrapper from "../CenterWrapper";
import Loading from "../Loading";
import { openTaskListPropsMenuMessage, openTaskPropsMenuMessage } from "../../ipc/ipcMessages";
import { sendIpcMessage } from "../../renderer";
import TasksBoxes from "./TasksBoxes"
import InputContainer from "./InputContainer";
import { DropResult } from "react-beautiful-dnd";
import { moveTask } from "../../data/actions";
import TaskListView from "../../views/TaskListView";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import Tooltip from "@material-ui/core/Tooltip";
import NonDraggableTasks from "./NonDraggableTasks";
import DraggableTasks from "./DraggableTasks";


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

/**
** Tasks component
** Determines which tasks will be displayed, showing task list
** title, task list description, dropdown menu and button which
** enables to show completed tasks
**
** @component
*/
const Tasks = (props: TasksProps): ReactElement => {

    /*
    ** States
    */

    const [searchPhrase, setSearchPhrase] = useState("");

    const [selected, setSelected] = useState<number>(-1);

    const [showCompletedTasks, setShowCompletedTasks] = useState(false);

    const [showSearchBar, setShowSearchBar] = useState(false);

    const focusSearch = useRef(true);
    const searchInputRef = useCallback(node => {
        if (node) {
            if (focusSearch.current) {
                focusSearch.current = false;
                node.focus();
            }
        }
    }, []);

    /**
    ** @brief New ordered fomrat after drop
    **
    ** @param result: Where it ends up on its drag
    */
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) {
            return; //return if we dont have destination
        }
        if (!props.tasks) return;
        const task = props.tasks.find(tsk => tsk.id === Number(result.draggableId));
        moveTask(task, destination.index);
    }

    /**
    ** @brief Select tasks
    **
    ** @param e: Mouse Event
    ** @param taskId: Id of selected task
    */
    const select = (e: MouseEvent, taskId: number) => {
        e.stopPropagation();
        if (selected === taskId) {
            setSelected(-1);
            return;
        }
        setSelected(taskId);
    };

    /**
    ** @brief Show or hide search bar and search for task
    **
    ** @param e: Mouse Event
    */
    const search = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        focusSearch.current = true;
        setShowSearchBar(!showSearchBar);
    }


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

    const completedTasks: Task[] = props.tasks.filter(task => task.completeTime).filter((task) => { return task.title.toLowerCase().includes(searchPhrase.toLowerCase()) }).sort((a, b) => new Date(a.completeTime).getTime() - new Date(b.completeTime).getTime());
    const progressTasks: Task[] = props.tasks.filter(task => !task.completeTime).filter((task) => { return task.title.toLowerCase().includes(searchPhrase.toLowerCase()) });
    const selectedTask: Task = props.tasks.find(tsk => tsk.id === selected);

    /*
    ** Rendering
    */

    return (
        <div className="taskListLayout">
            <div className="taskListPage" onClick={(e: MouseEvent) => { select(e, -1) }}>
                {showSearchBar ? <SearchBar ref={searchInputRef} setSearchPhrase={setSearchPhrase} /> : null}
                <div className="taskNameAndList">
                    <TaskListTitle className="taskTitleRenameBox" displayName={props.taskList.displayName} taskListId={props.taskList.id}></TaskListTitle>
                    <div className="taskMenuList">
                        <button onClick={(e: MouseEvent) => showPopupMenu(e, props.taskList)}>···</button>
                    </div>
                </div>
                <div className="taskListSubtitle">
                    <TaskListDescription className="taskTitleRenameBox" displayDescription={props.taskList.description} taskListId={props.taskList.id} editable={!props.taskList.buildIn} />
                    <Button className="buttonShowCompletedTasks" onClick={() => setShowCompletedTasks(!showCompletedTasks)}>{!showCompletedTasks ? "Show completed tasks" : "Hide completed tasks"}</Button>
                    <Tooltip title="Search for a task" enterDelay={500} arrow>
                        <div className="showSearchBarIcon">
                            <FontAwesomeIcon onClick={(e: MouseEvent) => search(e)} icon={["fas", "search"]} size={"lg"} />
                        </div>
                    </Tooltip>
                </div>
                {!props.taskList.buildIn && searchPhrase.length === 0 ?
                    <DraggableTasks tasks={progressTasks} select={select} selected={selected} onDragEnd={onDragEnd} /> :
                    <NonDraggableTasks tasks={progressTasks} select={select} selected={selected} />
                }
                {showCompletedTasks? <NonDraggableTasks tasks={completedTasks} select={select} selected={selected}/> : null}
                {<InputContainer className="inputContainer" taskListId={props.taskList.id}></InputContainer>}
            </div>
            {selectedTask ? <TaskDetails key={selectedTask.id} taskListId={selectedTask.taskListId} task={selectedTask} /> : <Fragment />}
        </div>
    )
}

export default Tasks;
