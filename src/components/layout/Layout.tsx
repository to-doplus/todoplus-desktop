// To-Do Plus
// Layout.tsx
// @author Miroslav Safar (xsafar23)

import React, { ReactElement, useState } from "react";
import Button from "../Button";
import Sidebar from "./Sidebar";

/**
 * Type for Layout properties
 */
export interface LayoutProps {
    children?: React.ReactNode;
    backgroundClass?: string //** CSS class of layout to set window background */
}

/**
 * Layout Component
 * Divides the screen into sidebar and content page
 * @component
 */
const Layout = (props: LayoutProps) : ReactElement => {
    return (
        <div className={`layout ${props.backgroundClass || ""}`}>
            {/* Sidebar */}
            <Sidebar/>

            {/* Page content */}
            <div className="container">
                {props.children}
            </div>

        </div>
    )
}

export default Layout;
