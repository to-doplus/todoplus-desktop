import React, { ReactElement, useState } from "react";
import Button from "./Button";

export interface LayoutProps {
    children?: React.ReactNode;
}

const Layout = (props: LayoutProps) : ReactElement => {
    return (
        <div style={{height: '100vh', width: '100%'}}>
            <div>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;