import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { createMemoryHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createMemoryHistory(),
});

const store = configureStore({
    reducer: {
       // taskLists: taskListsSlice.reducer,
        router: routerReducer,
    },
    enhancers: [
        applyMiddleware(routerMiddleware)
    ]
})

export const history = createReduxHistory(store);

//syncHistoryWithStore(store, history);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store