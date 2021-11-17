import React, { ReactElement } from "react"
import { Provider } from "react-redux"
import store, { history } from "./store"
import Home from "./views/Home"
import { Route, Routes } from "react-router-dom"
import { HistoryRouter } from "redux-first-history/rr6";
import Settings from "./views/Settings"
import TaskListView from "./views/TaskListView"

const App = () : ReactElement => {
    
    return (
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/tasklists/:taskListId" element={<TaskListView/>} />
                    <Route path="/settings" element={<Settings/>} />
                </Routes>
            </HistoryRouter>
        </Provider>
    )
}

export default App