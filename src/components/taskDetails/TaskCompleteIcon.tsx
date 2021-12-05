/*
** To-Do Plus
** DueDateButton.tsx
** @author: Michaela Pařilová (xparil04)
*/


import { TaskStatus } from "../../../lib/models";
import React, { MouseEventHandler, ReactElement } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import Tooltip from "@material-ui/core/Tooltip";

export interface TaskCompleteIconProps {
  status: TaskStatus,
  size?: SizeProp,
  className?: string
  onClick: MouseEventHandler<HTMLDivElement>
}

/**
** An icon representing if the task is completed or in progress. Also acts as a
** button to change that state
**
** @author Michaela Pařilová (xparil04)
*/
const TaskCompleteIcon = (props: TaskCompleteIconProps): ReactElement => {
  return (
    <Tooltip title="Change status" enterDelay={500} arrow>
      <div className={props.className || "taskDetailsTitleCheckbox"} onClick={props.onClick}>
        {props.status == "INPROGRESS" ? <FontAwesomeIcon icon={["far", "circle"]} size={props.size || "lg"}/> : <FontAwesomeIcon icon={["far", "check-circle"]} size={props.size || "lg"}/>}
      </div>
    </Tooltip>
  );
}

export default TaskCompleteIcon;
