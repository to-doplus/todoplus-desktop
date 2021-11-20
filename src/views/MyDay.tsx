import React, { Fragment, ReactElement } from "react";
import CenterWrapper from "../components/CenterWrapper";
import Layout from "../components/layout/Layout";
import Loading from "../components/Loading";
import Overlay from "../components/Overlay";
import { useMyDayTasks } from "../data/hooks";

const MyDay = () : ReactElement => {
    const {isLoading, isError, data} = useMyDayTasks();

    if(isLoading) {
        return (
        <Fragment>
            <Layout>
            <h1>Můj den</h1>
        </Layout>
        <Overlay>
            <CenterWrapper>
                <Loading />
            </CenterWrapper>
        </Overlay>
        </Fragment>
        )
    }
    
    return (
        <Layout>
            <h1>Můj den</h1>
            <div>
                {data.map(task => {
                    return (
                        <div>{task.title}</div>
                    )
                })}
            </div>
        </Layout>
    );
}

export default MyDay
