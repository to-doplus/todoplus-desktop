/*
** To-Do Plus
** MyDay.tsx
** @author Miroslav Safar (xsafar23)
*/

import React, { Fragment, ReactElement } from "react";
import Tasks from "../components/taskList/Tasks";
import CenterWrapper from "../components/CenterWrapper";
import Layout from "../components/layout/Layout";
import Loading from "../components/Loading";
import Overlay from "../components/Overlay";
import { useMyDayTasks } from "../data/hooks";
import { TaskList } from "../../lib/models";

const MyDay = (): ReactElement => {
    const { isLoading, isError, data } = useMyDayTasks();

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

    const today = new Date().toLocaleDateString();

    const myDayTaskList : TaskList = {
        id: -1, 
        displayName: "My day",
        description: today,
        color: "#FFFFFF",
        buildIn: true
        
    }
    return (
        <Layout backgroundClass="taskListViewBg">
            <Tasks isError={isError} isLoading={isLoading} tasks={data} taskList={myDayTaskList} />
        </Layout>
    );
}

export default MyDay
