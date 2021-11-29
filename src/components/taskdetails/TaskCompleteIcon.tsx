import { TaskStatus } from "../../../lib/models";
import React, { ReactElement, ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";


export interface TaskCompleteIconProps {
  status: TaskStatus,
  size?: SizeProp,
  className?: string
  onClick: () => void
}

const TaskCompleteIcon = (props: TaskCompleteIconProps): ReactElement => {
  return (
    <div className={props.className || "taskDetailsTitleCheckbox"} onClick={props.onClick}>
      {props.status == "INPROGRESS" ? <FontAwesomeIcon icon={["far", "circle"]} size={props.size || "lg"}/> : <FontAwesomeIcon icon={["far", "check-circle"]} size={props.size || "lg"}/>}
    </div>
  );
}

export default TaskCompleteIcon;