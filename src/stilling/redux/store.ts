import { compose, combineReducers, applyMiddleware, legacy_createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import adDataReducer, { adDataSaga, AdDataState } from '../stilling/adDataReducer';
import adReducer, { adSaga, AdState } from '../stilling/adReducer';
import adValidationReducer, {
    AdValidationState,
    validationSaga,
} from '../stilling/adValidationReducer';
import styrkReducer, { styrkSaga } from '../stilling/edit/om-stillingen/styrk/styrkReducer';
import locationAreaReducer, {
    locationAreaSaga,
} from '../stilling/edit/arbeidssted/locationAreaReducer';
import locationCodeReducer, {
    locationCodeSaga,
} from '../stilling/edit/arbeidssted/locationCodeReducer';
import varslingReducer, { varslingSaga, VarslingState } from '../common/varsling/varslingReducer';
import mineStillingerReducer, {
    MineStillingerState,
} from '../mine-stillinger/mineStillingerReducer';
import reporteeReducer, { reporteeSaga, ReporteeState } from '../reportee/reporteeReducer';
import stillingsinfoReducer, {
    StillingsinfoState,
    stillingsinfoSaga,
} from '../stillingsinfo/stillingsinfoReducer';
import { Stillingsinfo } from '../domene/Stilling';
import { mineStillingerSaga } from '../mine-stillinger/mineStillingerSagas';
import stillingsinfoDataReducer from '../stillingsinfo/stillingsinfoDataReducer';

export type State = {
    ad: AdState;
    adData: AdDataState;
    adValidation: AdValidationState;
    mineStillinger: MineStillingerState;
    stillingsinfoData: Stillingsinfo;
    stillingsinfo: StillingsinfoState;
    varsling: VarslingState;
    reportee: ReporteeState;
    locationCode: any;
    locationArea: any;
    error?: any;
};

const createReduxStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const reduxStore = legacy_createStore(
        combineReducers({
            ad: adReducer,
            adData: adDataReducer,
            adValidation: adValidationReducer,
            locationCode: locationCodeReducer,
            locationArea: locationAreaReducer,
            mineStillinger: mineStillingerReducer,
            reportee: reporteeReducer,
            styrk: styrkReducer,
            stillingsinfo: stillingsinfoReducer,
            stillingsinfoData: stillingsinfoDataReducer,
            varsling: varslingReducer,
        }),
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(adSaga);
    sagaMiddleware.run(validationSaga);
    sagaMiddleware.run(locationCodeSaga);
    sagaMiddleware.run(styrkSaga);
    sagaMiddleware.run(reporteeSaga);
    sagaMiddleware.run(mineStillingerSaga);
    sagaMiddleware.run(adDataSaga);
    sagaMiddleware.run(locationAreaSaga);
    sagaMiddleware.run(stillingsinfoSaga);
    sagaMiddleware.run(varslingSaga);

    return reduxStore;
};

const store = createReduxStore();

export default store;
