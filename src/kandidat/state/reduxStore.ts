import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import cvReducer, { cvSaga } from '../kandidatside/cv/reducer/cvReducer';
import enhetsregisterReducer, {
    enhetsregisterSaga,
} from '../komponenter/typeahead/enhetsregisterReducer';
import { historikkReducer, historikkSaga } from '../kandidatside/historikk/historikkReducer';
import kandidatlisteReducer from '../kandidatliste/reducer/kandidatlisteReducer';
import listeoversiktReducer from '../kandidatlisteoversikt/reducer/listeoversiktReducer';
import valgtNavKontorReducer from './navKontorReducer';
import errorReducer from './errorReducer';
import kandidatlisteSaga from '../kandidatliste/reducer/kandidatlisteSaga';
import listeoversiktSaga from '../kandidatlisteoversikt/reducer/listeoversiktSaga';
import varslingReducer, { varslingSaga } from '../varsling/varslingReducer';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
    combineReducers({
        cv: cvReducer,
        enhetsregister: enhetsregisterReducer,
        historikk: historikkReducer,
        kandidatliste: kandidatlisteReducer,
        listeoversikt: listeoversiktReducer,
        navKontor: valgtNavKontorReducer,
        varsling: varslingReducer,
        error: errorReducer,
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(cvSaga);
sagaMiddleware.run(historikkSaga);
sagaMiddleware.run(kandidatlisteSaga);
sagaMiddleware.run(enhetsregisterSaga);
sagaMiddleware.run(listeoversiktSaga);
sagaMiddleware.run(varslingSaga);

export default store;
