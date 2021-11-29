import { TaskList, Task } from "../../lib/models";
import React, { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskListList from "../components/layout/TaskListList";
import { useTaskLists } from "../data/hooks";
import Tasks from "../components/Tasks";
import TaskDetails from "../components/TaskDetails";
import Layout from "../components/layout/Layout";


const TaskListView = () => {
    const params = useParams();
    const taskListId = Number(params.taskListId);
    const { isLoading, isError, data: taskLists } = useTaskLists();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error??</div>;
    }

    const taskList: TaskList = taskLists.find(taskList => taskList.id === taskListId);

    return (
        <div className="taskListViewBg">
            <Layout>
                <Tasks displayName={taskList.displayName} description={taskList.description} taskListId={taskListId} />
            </Layout>
        </div>
    )
}


export default TaskListView;