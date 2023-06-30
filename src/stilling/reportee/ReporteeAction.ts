import { ApiError } from '../api/apiUtils';
import { Reportee } from './reporteeReducer';

export enum ReporteeActionType {
    FetchReportee = 'FETCH_REPORTEE',
    FetchReporteeBegin = 'FETCH_REPORTEE_BEGIN',
    FetchReporteeSuccess = 'FETCH_REPORTEE_SUCCESS',
    FetchReporteeFailure = 'FETCH_REPORTEE_FAILURE',
}

type FetchReporteeAction = {
    type: ReporteeActionType.FetchReportee;
};

type FetchReporteeBeginAction = {
    type: ReporteeActionType.FetchReporteeBegin;
};

type FetchReporteeSuccessAction = {
    type: ReporteeActionType.FetchReporteeSuccess;
    response: Reportee;
};

type FetchReporteeFailureAction = {
    type: ReporteeActionType.FetchReporteeFailure;
    error: ApiError;
};

export type ReporteeAction =
    | FetchReporteeAction
    | FetchReporteeBeginAction
    | FetchReporteeSuccessAction
    | FetchReporteeFailureAction;
