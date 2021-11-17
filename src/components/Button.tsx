import React from "react";

export interface ButtonProps {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
    [x: string]: any 
}
    
const Button = (props: ButtonProps) => {
        return (
            <button className={`button ${props.className ? props.className : ""}`} onClick={(e: React.MouseEvent<HTMLElement>) => {e.preventDefault();props.onClick()}}>
                {props.children}
            </button>
    )
}

export default Button;

