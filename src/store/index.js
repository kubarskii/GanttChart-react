import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({

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