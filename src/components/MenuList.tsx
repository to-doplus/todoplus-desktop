//autor: Misa

import React, { ReactElement } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { setTaskListTitle } from "../data/taskActions";

export interface TasksProps {
    taskListId: number
}

const MenuList= (props: TasksProps): ReactElement => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const renameTaskList = async () => {
        const success = await setTaskListTitle(props.taskListId, "rename funguje hodne pofiderne");
        if (success) {
            //todo
        }
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{color: "white"}}
            >
                <i className="fas fa-ellipsis-h"></i>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={renameTaskList}>Rename task list</MenuItem>
                <MenuItem onClick={handleClose}>Change description</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default MenuList;