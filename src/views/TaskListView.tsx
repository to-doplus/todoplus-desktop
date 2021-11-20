import { TaskList } from "../../lib/models";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskListList from "../components/layout/TaskListList";
import { useTaskLists } from "../data/hooks";
import Tasks from "../components/Tasks";
import TaskDetails from "../components/TaskDetails";
import Layout from "../components/layout/Layout";

const TaskListView = () => {
    const params = useParams();
    const taskListId = Number(params.taskListId);
    const { isLoading, isError, data: taskLists} = useTaskLists();

    if(isLoading) {
        return <div>Loading...</div>;
    }

    const taskList : TaskList = taskLists.find(taskList => taskList.id === taskListId);

    return (
        <Layout>
            <h1>{taskList.displayName}</h1>
            <h3>{taskList.description}</h3>
            <Tasks taskListId={taskListId} />
        </Layout>
    )
}

export default TaskListView;