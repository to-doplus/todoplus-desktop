// To-Do Plus
// buildInTaskLists.tsx
// @author Miroslav Safar (xsafar23)

import React, { Fragment, ReactElement } from "react"
import { useSettings } from "../../data/hooks";
import TaskListRow from "./TaskListRow";

/**
 * BuildInTaskLists Component
 * List of buildin tasks displayed by user settings
 * @component
 */
const BuildInTaskLists = (): ReactElement => {
    const { isLoading, isError, data: settings } = useSettings();
    if (isLoading || isError) {
        return <div></div>
    }

    return (
        <div>
            {settings.myDayEnabled ? <TaskListRow displayName="My day" color="#AAAAA" taskListId={-1} url="/myday" icon="far fa-sun" /> : <Fragment />}
            {settings.importantEnabled ? <TaskListRow displayName="Important" color="#c83741" taskListId={-1} url="/important" icon="far fa-star" /> : <Fragment />}
        </div>
    )
}

export default BuildInTaskLists;