// To-Do Plus
// Important.tsx
// @author Miroslav Safar (xsafar23)

import React, { Fragment, ReactElement } from "react";
import Tasks from "../components/Tasks";
import Layout from "../components/layout/Layout";
import CenterWrapper from "../components/CenterWrapper";
import Loading from "../components/Loading";
import { useImportantTasks } from "../data/hooks";
import { TaskList } from "../../lib/models";

/**
 * Important tasklist view
 * @component
 */
const Important = (): ReactElement => {
    const { isLoading, isError, data } = useImportantTasks();

    if (isLoading) {
        return (
            <Layout backgroundClass="taskListViewBg">
                <CenterWrapper>
                    <Loading />
                </CenterWrapper>
            </Layout>
        )
    }

    const importantTaskList: TaskList = {
        id: -1, // important tasklist is buildin and does not have an id
        displayName: "Important",
        description: "The most important tasks from your lists.",
        color: "#FFFFFF",
        buildIn: true
    }

    return (
        <Layout backgroundClass="taskListViewBg">
            <Tasks isError={isError} isLoading={isLoading} tasks={data} taskList={importantTaskList} />
        </Layout>
    );
}

export default Important
