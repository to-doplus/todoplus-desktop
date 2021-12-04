import React from "React"
import { DraggableProps } from "react-beautiful-dnd"


export interface OptionalDragableProps extends DraggableProps {
    dragable: boolean,
}


const OptionalDragable = (props: OptionalDragableProps) => {
    if(!props.dragable) {
        return {}
    }
}