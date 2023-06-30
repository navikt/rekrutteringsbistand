import { put, select, takeLatest } from 'redux-saga/effects';
import { opprettKandidatlisteForEksternStilling } from '../api/api';
import { ApiError } from '../api/apiUtils';

import { SET_STILLINGSINFO_DATA } from './stillingsinfoDataReducer';
import { FETCH_AD } from '../stilling/adReducer';
import { VarslingAction, VarslingActionType } from '../common/varsling/varslingReducer';

export const FETCH_STILLINGSINFO = 'FETCH_STILLINGSINFO';
export const FETCH_STILLINGSINFO_BEGIN = 'FETCH_STILLINGSINFO_BEGIN';
export const FETCH_STILLINGSINFO_SUCCESS = 'FETCH_STILLINGSINFO_SUCCESS';
export const FETCH_STILLINGSINFO_FAILURE = 'FETCH_STILLINGSINFO_FAILURE';

export const OPPRETT_STILLINGSINFO = 'OPPRETT_STILLINGSINFO';
export const OPPRETT_STILLINGSINFO_BEGIN = 'OPPRETT_STILLINGSINFO_BEGIN';
export const OPPRETT_STILLINGSINFO_SUCCESS = 'OPPRETT_STILLINGSINFO_SUCCESS';
export const OPPRETT_STILLINGSINFO_FAILURE = 'OPPRETT_STILLINGSINFO_FAILURE';

export const UPDATE_STILLINGSINFO = 'UPDATE__STILLINGSINFO';
export const UPDATE_STILLINGSINFO_BEGIN = 'UPDATE__STILLINGSINFO_BEGIN';
export const UPDATE_STILLINGSINFO_SUCCESS = 'UPDATE__STILLINGSINFO_SUCCESS';
export const UPDATE_STILLINGSINFO_FAILURE = 'UPDATE__STILLINGSINFO_FAILURE';

export type StillingsinfoState = {
    isSavingStillingsinfo: boolean;
    hasSavedStillingsinfo: boolean;
    isLoadingStillingsinfo: boolean;
};

const initialState = {
    isSavingStillingsinfo: false,
    hasSavedStillingsinfo: false,
    isLoadingStillingsinfo: false,
};

export default function stillingsinfoReducer(state: StillingsinfoState = initialState, action) {
    switch (action.type) {
        case FETCH_STILLINGSINFO_BEGIN:
            return {
                ...state,
                hasSavedStillingsinfo: false,
                isLoadingStillingsinfo: true,
            };
        case FETCH_STILLINGSINFO_SUCCESS:
            return {
                ...state,
                isLoadingStillingsinfo: false,
            };
        case FETCH_STILLINGSINFO_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoadingStillingsinfo: false,
            };
        case OPPRETT_STILLINGSINFO_BEGIN:
        case UPDATE_STILLINGSINFO_BEGIN:
            return {
                ...state,
                isSavingStillingsinfo: true,
                hasSavedStillingsinfo: false,
            };
        case OPPRETT_STILLINGSINFO_FAILURE:
        case UPDATE_STILLINGSINFO_FAILURE:
            return {
                ...state,
                isSavingStillingsinfo: false,
                hasSavedStillingsinfo: false,
                error: action.error,
            };
        case OPPRETT_STILLINGSINFO_SUCCESS:
            return {
                ...state,
                isSavingStillingsinfo: false,
                hasSavedStillingsinfo: true,
            };
        case UPDATE_STILLINGSINFO_SUCCESS:
            return {
                ...state,
                isSavingStillingsinfo: false,
                hasSavedStillingsinfo: true,
            };
        default:
            return state;
    }
}

function* getStillingsinfo(action) {
    yield put({ type: FETCH_STILLINGSINFO_BEGIN });
    try {
        const response = action.stillingsinfo;
        const saveResponse =
            response !== null
                ? response
                : {
                      eierNavident: undefined,
                      eierNavn: undefined,
                      stillingsid: action.uuid,
                  };

        yield put({ type: FETCH_STILLINGSINFO_SUCCESS });
        yield put({ type: SET_STILLINGSINFO_DATA, uuid: action.uuid, data: saveResponse });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: FETCH_STILLINGSINFO_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* opprettStillingsinfo() {
    yield put({ type: OPPRETT_STILLINGSINFO_BEGIN });

    try {
        let state = yield select();

        const { stillingsid, eierNavident, eierNavn } = state.stillingsinfoData;
        const response = yield opprettKandidatlisteForEksternStilling({
            stillingsid,
            eierNavident,
            eierNavn,
        });

        yield put({ type: OPPRETT_STILLINGSINFO_SUCCESS, response });
        yield put<VarslingAction>({
            type: VarslingActionType.VisVarsling,
            innhold: 'Kandidatlisten er opprettet. Du er nå eier av stillingen og kandidatlisten.',
        });

        // Stillingen blir oppdatert når stillingsinfo blir oppdatert, så hent oppdatert stilling
        yield put({ type: FETCH_AD, uuid: stillingsid });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: OPPRETT_STILLINGSINFO_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

function* updateStillingsinfo() {
    yield put({ type: UPDATE_STILLINGSINFO_BEGIN });

    try {
        let state = yield select();

        const { stillingsid, eierNavident, eierNavn } = state.stillingsinfoData;
        const response = yield opprettKandidatlisteForEksternStilling({
            stillingsid,
            eierNavident,
            eierNavn,
        });

        yield put({ type: UPDATE_STILLINGSINFO_SUCCESS, response });
        yield put<VarslingAction>({
            type: VarslingActionType.VisVarsling,
            innhold:
                'Kandidatlisten er markert som din. Du er nå eier av stillingen og kandidatlisten.',
        });

        // Stillingen blir oppdatert når stillingsinfo blir oppdatert, så hent oppdatert stilling
        yield put({ type: FETCH_AD, uuid: stillingsid });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: UPDATE_STILLINGSINFO_FAILURE, error: e });
        } else {
            throw e;
        }
    }
}

export const stillingsinfoSaga = function* saga() {
    yield takeLatest(FETCH_STILLINGSINFO, getStillingsinfo);
    yield takeLatest(OPPRETT_STILLINGSINFO, opprettStillingsinfo);
    yield takeLatest(UPDATE_STILLINGSINFO, updateStillingsinfo);
};
