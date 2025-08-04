import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import myFirstReducer from './reducer';
import myFirstSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ myFirstReducer });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(myFirstSaga);

export default store;
