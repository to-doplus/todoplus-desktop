import React, { ReactNode } from "react";

export interface CenterWrapperProps {
    children: ReactNode
}

const CenterWrapper = (props: CenterWrapperProps) => {
    return (
        <div className="center-wrapper">
                {props.children}
        </div>
    )
}

export default CenterWrapper