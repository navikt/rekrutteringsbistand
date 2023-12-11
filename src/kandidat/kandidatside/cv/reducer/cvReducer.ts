import { call, put, takeLatest } from 'redux-saga/effects';
import { Error, Nettressurs, Nettstatus } from 'felles/nettressurs';
import { SearchApiError } from '../../../api/fetchUtils';
import { fetchCv } from '../../../api/api';
import Kandidat, { Id } from 'felles/domene/kandidat/Kandidat';
import { EsResponse } from 'felles/domene/elastic/ElasticSearch';

export enum CvActionType {
    NullstillCv = 'NULLSTILL_CV',
    FetchCv = 'FETCH_CV',
    FetchCvBegin = 'FETCH_CV_BEGIN',
    FetchCvSuccess = 'FETCH_CV_SUCCESS',
    FetchCvNotFound = 'FETCH_CV_NOT_FOUND',
    FetchCvFailure = 'FETCH_CV_FAILURE',
}

export type NullstillCvAction = {
    type: CvActionType.NullstillCv;
};

export type FetchCvAction = {
    type: CvActionType.FetchCv;
    arenaKandidatnr: string;
};

export type FetchCvBeginAction = {
    type: CvActionType.FetchCvBegin;
};

export type FetchCvSuccessAction = {
    type: CvActionType.FetchCvSuccess;
    response: Kandidat;
};

export type FetchCvNotFoundAction = {
    type: CvActionType.FetchCvNotFound;
};

export type FetchCvFailureAction = {
    type: CvActionType.FetchCvFailure;
    error: Error;
};

export type CvAction =
    | NullstillCvAction
    | FetchCvAction
    | FetchCvBeginAction
    | FetchCvSuccessAction
    | FetchCvNotFoundAction
    | FetchCvFailureAction;

export type CvState = {
    cv: Nettressurs<Kandidat>;
};

const initialState: CvState = {
    cv: {
        kind: Nettstatus.IkkeLastet,
    },
};

const cvReducer = (state: CvState = initialState, action: CvAction): CvState => {
    switch (action.type) {
        case CvActionType.NullstillCv:
            return {
                ...state,
                cv: {
                    kind: Nettstatus.IkkeLastet,
                },
            };

        case CvActionType.FetchCv:
            return {
                ...state,
                cv: {
                    kind: Nettstatus.LasterInn,
                },
            };
        case CvActionType.FetchCvSuccess:
            return {
                ...state,
                cv: {
                    kind: Nettstatus.Suksess,
                    data: action.response,
                },
            };
        case CvActionType.FetchCvNotFound:
            return {
                ...state,
                cv: {
                    kind: Nettstatus.FinnesIkke,
                },
            };
        case CvActionType.FetchCvFailure:
            return {
                ...state,
                cv: {
                    kind: Nettstatus.Feil,
                    error: action.error,
                },
            };
        default:
            return state;
    }
};

function* fetchCvForKandidat(action: FetchCvAction) {
    try {
        const idResponse: EsResponse<Id> = yield call(fetchCv, action.arenaKandidatnr);
        const iDhits = idResponse.hits.hits;
        if (iDhits.length === 0) {
            yield put({ type: CvActionType.FetchCvNotFound });
        }
        const fodselsnummer = idResponse.hits.hits[0]._source.fodselsnummer;

        const response: EsResponse<Kandidat> = yield call(fetchCv, fodselsnummer);

        const hits = response.hits.hits;
        if (hits.length === 0) {
            yield put({ type: CvActionType.FetchCvNotFound });
        }

        const cv = response.hits.hits[0]._source;

        yield put({ type: CvActionType.FetchCvSuccess, response: cv });
    } catch (e) {
        if (e instanceof SearchApiError) {
            yield put({ type: CvActionType.FetchCvFailure, error: e });
        } else {
            throw e;
        }
    }
}

export const cvSaga = function* cvSaga() {
    yield takeLatest(CvActionType.FetchCv, fetchCvForKandidat);
};

export default cvReducer;
