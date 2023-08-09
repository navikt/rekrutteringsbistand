import { Stillingsinfo } from 'felles/domene/stilling/Stilling';
import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import varslingReducer, { VarslingState, varslingSaga } from '../common/varsling/varslingReducer';
import mineStillingerReducer, {
    MineStillingerState,
} from '../mine-stillinger/mineStillingerReducer';
import { mineStillingerSaga } from '../mine-stillinger/mineStillingerSagas';
import reporteeReducer, { ReporteeState, reporteeSaga } from '../reportee/reporteeReducer';
import adDataReducer, { AdDataState, adDataSaga } from '../stilling/adDataReducer';
import adReducer, { AdState, adSaga } from '../stilling/adReducer';
import adValidationReducer, {
    AdValidationState,
    validationSaga,
} from '../stilling/adValidationReducer';
import locationAreaReducer, {
    locationAreaSaga,
} from '../stilling/edit/arbeidssted/locationAreaReducer';
import locationCodeReducer, {
    locationCodeSaga,
} from '../stilling/edit/arbeidssted/locationCodeReducer';
import styrkReducer, { styrkSaga } from '../stilling/edit/om-stillingen/styrk/styrkReducer';
import stillingsinfoDataReducer from '../stillingsinfo/stillingsinfoDataReducer';
import stillingsinfoReducer, {
    StillingsinfoState,
    stillingsinfoSaga,
} from '../stillingsinfo/stillingsinfoReducer';

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
