// To-Do Plus
// App.tsx
// @author Miroslav Safar (xsafar23)

import React, { ReactElement } from "react"
import { Provider } from "react-redux"
import store, { history } from "./store"
import Home from "./views/Home"
import { Route, Routes } from "react-router-dom"
import { HistoryRouter } from "redux-first-history/rr6";
import Settings from "./views/Settings"
import TaskListView from "./views/TaskListView"
import Important from "./views/Important"
import MyDay from "./views/MyDay"

const App = () : ReactElement => {
    
    return (
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/myday" element={<MyDay/>} />
                    <Route path="/important" element={<Important/>} />
                    <Route path="/tasklists/:taskListId" element={<TaskListView/>} />
                    <Route path="/settings" element={<Settings/>} />
                </Routes>
            </HistoryRouter>
        </Provider>
    )
}

export default App