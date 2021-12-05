import { TaskList, Task } from "../../lib/models";
import React, { Fragment, ReactElement, useEffect } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import TaskListList from "../components/layout/TaskListList";
import { useTaskLists, useTasksByTaskList } from "../data/hooks";
import Tasks from "../components/taskList/Tasks";
import TaskDetails from "../components/taskDetails/TaskDetails";
import Layout from "../components/layout/Layout";
import Loading from "../components/Loading";
import Overlay from "../components/Overlay";
import CenterWrapper from "../components/CenterWrapper";
import { produceWithPatches } from "immer";


const TaskListView = () => {
    const params = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    const focus = searchParams.get("focus");
    const taskListId = Number(params.taskListId);
    const { isLoading, isError, data: taskLists } = useTaskLists();
    const { isLoading: isLoadingTasks, isError: isErrorTasks, data: tasks } = useTasksByTaskList(Number(taskListId));

    if (isLoading) {
        return (
            <Layout backgroundClass="taskListViewBg">
                <CenterWrapper>
                    <Loading />
                </CenterWrapper>
            </Layout>
        )
    }

    if (isError) {
        return <div>Error??</div>;
    }

    const taskList: TaskList = taskLists.find(taskList => taskList.id === taskListId);

    if (!taskList) {
        return <Navigate to="/myday" />
    }

    console.log(focus);

    return (
        <Layout backgroundClass="taskListViewBg">
            <Tasks isError={isErrorTasks} isLoading={isLoadingTasks} tasks={tasks} taskList={taskList} focus={focus} />
        </Layout>
    )
}


export default TaskListView;
