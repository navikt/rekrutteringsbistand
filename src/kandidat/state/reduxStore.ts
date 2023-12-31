import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import kandidatlisteReducer from '../kandidatliste/reducer/kandidatlisteReducer';
import kandidatlisteSaga from '../kandidatliste/reducer/kandidatlisteSaga';

import cvReducer, { cvSaga } from '../kandidatside/cv/reducer/cvReducer';
import { historikkReducer, historikkSaga } from '../kandidatside/historikk/historikkReducer';
import enhetsregisterReducer, {
    enhetsregisterSaga,
} from '../komponenter/typeahead/enhetsregisterReducer';
import varslingReducer, { varslingSaga } from '../varsling/varslingReducer';
import errorReducer from './errorReducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
    combineReducers({
        cv: cvReducer,
        enhetsregister: enhetsregisterReducer,
        historikk: historikkReducer,
        kandidatliste: kandidatlisteReducer,
        varsling: varslingReducer,
        error: errorReducer,
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(cvSaga);
sagaMiddleware.run(historikkSaga);
sagaMiddleware.run(kandidatlisteSaga);
sagaMiddleware.run(enhetsregisterSaga);
sagaMiddleware.run(varslingSaga);

export default store;
