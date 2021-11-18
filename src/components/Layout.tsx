import React, { ReactElement, useState } from "react";
import Button from "./Button";

export interface LayoutProps {
    children?: React.ReactNode;
}

const Layout = (props: LayoutProps) : ReactElement => {
    return (
        <div className="layout">
            <div className="sidebar"></div>
            <div>
                <div></div>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;