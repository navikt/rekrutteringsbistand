import { put, select, takeLatest } from 'redux-saga/effects';
import { stillingApi } from '../api/api';
import { fetchGet, ApiError } from '../api/apiUtils';
import { ReporteeAction, ReporteeActionType } from './ReporteeAction';

export type Reportee = {
    displayName: string;
    navIdent: string;
};

export type ReporteeState = {
    data?: Reportee;
    error?: string;
    isFetchingReportee: boolean;
    numberOfPendingAds?: number;
};

const initialState: ReporteeState = {
    data: undefined,
    error: undefined,
    isFetchingReportee: false,
    numberOfPendingAds: undefined,
};

const putAction = (action: ReporteeAction) => put(action);

export default function reporteeReducer(
    state: ReporteeState = initialState,
    action: ReporteeAction
) {
    switch (action.type) {
        case ReporteeActionType.FetchReporteeBegin:
            return {
                ...state,
                data: undefined,
                isFetchingReportee: true,
                error: undefined,
            };
        case ReporteeActionType.FetchReporteeSuccess:
            return {
                ...state,
                data: action.response,
                isFetchingReportee: false,
            };
        case ReporteeActionType.FetchReporteeFailure:
            return {
                ...state,
                error: action.error,
                isFetchingReportee: false,
            };
        default:
            return state;
    }
}

export function* getReportee() {
    let state = yield select();

    if (!state.reportee.data) {
        yield putAction({ type: ReporteeActionType.FetchReporteeBegin });

        try {
            const response: Reportee = yield fetchGet(
                `${stillingApi}/rekrutteringsbistand/api/v1/reportee`
            );

            yield putAction({ type: ReporteeActionType.FetchReporteeSuccess, response });
            state = yield select();
        } catch (e) {
            if (e instanceof ApiError) {
                yield putAction({ type: ReporteeActionType.FetchReporteeFailure, error: e });
            } else {
                throw e;
            }
        }
    }

    return state.reportee.data;
}

export const reporteeSaga = function* saga() {
    yield takeLatest(ReporteeActionType.FetchReportee, getReportee);
};
