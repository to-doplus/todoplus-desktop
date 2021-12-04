import React, { Fragment, ReactElement } from "react";
import Tasks from "../components/Tasks";
import Layout from "../components/layout/Layout";
import CenterWrapper from "../components/CenterWrapper";
import Loading from "../components/Loading";
import { useImportantTasks } from "../data/hooks";
import { TaskList } from "../../lib/models";

const Important = (): ReactElement => {
    const { isLoading, isError, data } = useImportantTasks();

    if (isLoading) {
        return (
            <Fragment>
                <Layout backgroundClass="taskListViewBg">
                    <CenterWrapper>
                        <Loading />
                    </CenterWrapper>
                </Layout>
            </Fragment>
        )
    }

    const importantTaskList : TaskList = {
        id: -1, 
        displayName: "Important",
        description: "The most important tasks from your lists.",
        color: "#FFFFFF"
    }

    return (
        <div className="taskListViewBg">
            <Layout>
                <Tasks isError={isError} isLoading={isLoading} tasks={data} taskList={importantTaskList} />
            </Layout>
        </div>
    );
}

export default Important
