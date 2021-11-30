import { Importance } from "../../../lib/models";
import React, { MouseEventHandler, ReactElement, ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";


export interface TaskImportanceIconProps {
  taskImportance: Importance,
  color: string,
  size?: SizeProp,
  className?: string
  onClick: MouseEventHandler<HTMLDivElement>
}

const TaskImportanceIcon = (props: TaskImportanceIconProps): ReactElement => {
  return (
    <div className={props.className || "taskImportanceIcon"} onClick={props.onClick}>
      {props.taskImportance == "NORMAL" ? <FontAwesomeIcon icon={["far", "star"]} color={props.color} size={props.size || "lg"}/> : <FontAwesomeIcon icon={["fas", "star"]} color={props.color} size={props.size || "lg"}/>}
    </div>
  );
}

export default TaskImportanceIcon;