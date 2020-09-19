import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { quizReducer } from './reducers/quizReducer';
import { userReducer } from './reducers/userReducer';
import { notificationReducer } from './reducers/notificationReducer';

const rootReducer = combineReducers({
    quizReducer,
    userReducer,
    notificationReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

