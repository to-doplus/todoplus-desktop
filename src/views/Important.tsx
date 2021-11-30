import React, { Fragment, ReactElement } from "react";
import Tasks from "../components/Tasks";
import Layout from "../components/layout/Layout";
import CenterWrapper from "../components/CenterWrapper";
import Loading from "../components/Loading";
import { useImportantTasks } from "../data/hooks";

const Important = (): ReactElement => {
    const { isLoading, isError, data } = useImportantTasks();

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


    return (
        <div className="taskListViewBg">
            <Layout>
                <Tasks isError={isError} isLoading={isLoading} tasks={data} displayName={"Důležité"} description={"Ty nejdůležitější úkoly ze tvého seznamu."} taskListId={-1} />
            </Layout>
        </div>
    );
}

export default Important
