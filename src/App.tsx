// To-Do Plus
// App.tsx
// @author Miroslav Safar (xsafar23)

import React, { ReactElement, useEffect } from "react"
import { Provider } from "react-redux"
import store, { history } from "./store"
import Home from "./views/Home"
import { Route, Routes } from "react-router-dom"
import { HistoryRouter } from "redux-first-history/rr6";
import Settings from "./views/Settings"
import TaskListView from "./views/TaskListView"
import Important from "./views/Important"
import MyDay from "./views/MyDay"
import Login from "./views/Login"
import Register from "./views/Register"
import { IpcRendererEvent } from "electron/renderer"
import { addTaskToMyDay } from "./data/actions"
import { removeTaskFromMyDay } from "./data/subtask_actions"
import { handleIpcMessages } from "./ipc/ipcMessagesHandler"
import Auth from "./components/Auth"

const App = (): ReactElement => {

    useEffect(() => {
        handleIpcMessages();
    }, []);

    return (
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path="/" element={<Auth><Home /></Auth>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/myday" element={<Auth><MyDay /></Auth>} />
                    <Route path="/important" element={<Auth><Important /></Auth>} />
                    <Route path="/tasklists/:taskListId" element={<Auth><TaskListView /></Auth>} />
                    <Route path="/settings" element={<Auth><Settings /></Auth>} />
                </Routes>
            </HistoryRouter>
        </Provider>
    )
}

export default App