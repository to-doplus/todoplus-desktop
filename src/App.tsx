// To-Do Plus
// App.tsx
// @author Miroslav Safar (xsafar23)

import React, { ReactElement, useEffect } from "react"
import { Provider } from "react-redux"
import store, { history } from "./store"
import Home from "./views/Home"
import { Route, Routes } from "react-router-dom"
import { HistoryRouter } from "redux-first-history/rr6";
import TaskListView from "./views/TaskListView"
import Important from "./views/Important"
import MyDay from "./views/MyDay"
import Login from "./views/Login"
import Register from "./views/Register"
import { handleIpcMessages } from "./ipc/ipcMessagesHandler"
import Auth from "./components/Auth"
import Logout from "./views/Logout"

const App = (): ReactElement => {

    // Register Ipc Message handlers for renderer process on app first load
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
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/myday" element={<Auth><MyDay /></Auth>} />
                    <Route path="/important" element={<Auth><Important /></Auth>} />
                    <Route path="/tasklists/:taskListId" element={<Auth><TaskListView /></Auth>} />
                </Routes>
            </HistoryRouter>
        </Provider>
    )
}

export default App