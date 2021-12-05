/*
** To-Do Plus
** CenterWrapper.tsx
** @author Miroslav Safar (xsafar23)
*/

import React, { ReactNode } from "react";

export interface CenterWrapperProps {
    children: ReactNode
}

/**
 * CenterWrapper Component
 * Centers the children in center
 * @component
 */
const CenterWrapper = (props: CenterWrapperProps) => {
    return (
        <div className="center-wrapper">
                {props.children}
        </div>
    )
}

export default CenterWrapper
