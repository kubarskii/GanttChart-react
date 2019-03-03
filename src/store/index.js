import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import ganttTasks from '../reducers/ganttTasksReducer'

const rootReducer = combineReducers({
    ganttTasks,
});

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(
            thunkMiddleware
        )
    )
);

export default store;