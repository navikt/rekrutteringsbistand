import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import kandidatlisteReducer from '../kandidatliste/reducer/kandidatlisteReducer';
import kandidatlisteSaga from '../kandidatliste/reducer/kandidatlisteSaga';

import errorReducer from './errorReducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
    combineReducers({
        kandidatliste: kandidatlisteReducer,
        error: errorReducer,
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(kandidatlisteSaga);

export default store;
