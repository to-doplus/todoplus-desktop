import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "../store"
import todoListClient from "../client"
import { TaskList } from "../../lib/models"

export const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState: {
        loading: 'idle',
        taskLists: [],
    },
    reducers: {
        taskListsLoading(state, action: PayloadAction<void>) {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        taskListsReceived(state, action: PayloadAction<any>) {
            if (state.loading === 'pending') {
                console.log("Received: ");
                console.log(action.payload);
                state.loading = 'idle'
                state.taskLists = action.payload
            }
        },
    },
})

// Destructure and export the plain action creators
export const { taskListsLoading, taskListsReceived } = taskListsSlice.actions

// Define a thunk that dispatches those action creators
export const fetchTaskLists = () => async (dispatch : AppDispatch) => {
    dispatch(taskListsLoading())
    const response : TaskList[] = await todoListClient.getAllLists();
    dispatch(taskListsReceived(response))
}