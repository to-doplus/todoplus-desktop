import React, { Fragment, ReactElement } from "react";
import Tasks from "../components/Tasks";
import CenterWrapper from "../components/CenterWrapper";
import Layout from "../components/layout/Layout";
import Loading from "../components/Loading";
import Overlay from "../components/Overlay";
import { useMyDayTasks } from "../data/hooks";

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

    return (
        <Layout backgroundClass="taskListViewBg">
            <Tasks isError={isError} isLoading={isLoading} tasks={data} displayName={"My day"} description={today} taskListId={-1} />
        </Layout>
    );
}

export default MyDay
