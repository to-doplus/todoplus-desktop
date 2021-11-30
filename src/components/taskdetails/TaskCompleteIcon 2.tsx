import { TaskStatus } from "../../../lib/models";
import React, { ReactElement, ReactNode } from "react"


export interface TaskCompleteIconProps {
  status: TaskStatus,
  onClick: () => void
}

const TaskCompleteIcon = (props: TaskCompleteIconProps): ReactElement => {
  return (
    <div className="taskDetailsTitleCheckbox" onClick={props.onClick}>
      {props.status}
      {props.status === "INPROGRESS" ? <i style={{ color: "red" }} className={`far fa-lg fa-circle`} /> : <i className={`far fa-lg fa-check-circle`} />}
    </div>
  );
}

export default TaskCompleteIcon;