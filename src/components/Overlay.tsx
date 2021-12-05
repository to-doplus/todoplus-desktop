/*
** To-Do Plus
** Overlay.tsx
** @author Miroslav Safar (xsafar23)
*/

import React, { ReactNode } from "react";

export interface OverlayProps {
    children: ReactNode
}

const Overlay = (props: OverlayProps) => {
    return (
        <div className="overlay">
                {props.children}
        </div>
    )
}

export default Overlay
