import React, { ReactElement, useState } from "react";
import Button from "../Button";
import Sidebar from "./Sidebar";

export interface LayoutProps {
    children?: React.ReactNode;
}

const Layout = (props: LayoutProps) : ReactElement => {
    return (
        <div className="layout">
            <Sidebar/>
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}

export default Layout;
