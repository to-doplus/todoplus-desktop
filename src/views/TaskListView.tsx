import { TaskList, Task } from "../../lib/models";
import React, { Fragment, ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskListList from "../components/layout/TaskListList";
import { useTaskLists, useTasksByTaskList } from "../data/hooks";
import Tasks from "../components/Tasks";
import TaskDetails from "../components/TaskDetails";
import Layout from "../components/layout/Layout";
import Loading from "../components/Loading";
import Overlay from "../components/Overlay";
import CenterWrapper from "../components/CenterWrapper";


const TaskListView = () => {
    const params = useParams();
    const taskListId = Number(params.taskListId);
    const { isLoading, isError, data: taskLists } = useTaskLists();
    const { isLoading: isLoadingTasks, isError: isErrorTasks, data: tasks } = useTasksByTaskList(Number(taskListId));

    if (isLoading) {
        return (
            <Fragment>
                <Layout>
                    <CenterWrapper>
                        <Loading />
                    </CenterWrapper>
                </Layout>
            </Fragment>
        )
    }

    if (isError) {
        return <div>Error??</div>;
    }

    const taskList: TaskList = taskLists.find(taskList => taskList.id === taskListId);



    return (
        <div className="taskListViewBg">
            <Layout>
                <Tasks isError={isErrorTasks} isLoading={isLoadingTasks} tasks={tasks} displayName={taskList.displayName} description={taskList.description} taskListId={taskListId} />
            </Layout>
        </div>
    )
}


export default TaskListView;