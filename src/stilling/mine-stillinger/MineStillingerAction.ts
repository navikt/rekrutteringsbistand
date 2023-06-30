import { ApiError } from '../api/apiUtils';
import { MineStillingerResultat } from './mineStillingerReducer';
import { MineStillingerSorteringsfelt } from './MineStillingerSortering';
import { Retning } from './tabell/Retning';

export enum MineStillingerActionType {
    FetchMyAds = 'FETCH_MY_ADS',
    FetchMyAdsBegin = 'FETCH_MY_ADS_BEGIN',
    FetchMyAdsSuccess = 'FETCH_MY_ADS_SUCCESS',
    FetchMyAdsFailure = 'FETCH_MY_ADS_FAILURE',
    ChangeMyAdsPage = 'CHANGE_MY_ADS_PAGE',
    ResetMyAdsPage = 'RESET_MY_ADS_PAGE',
    ChangeMyAdsStatusFilter = 'CHANGE_MY_ADS_STATUS_FILTER',
    ChangeMyAdsDeactivatedFilter = 'CHANGE_MY_ADS_DEACTIVATED_FILTER',
    ChangeMyAdsSorting = 'CHANGE_MY_ADS_SORTING',
}

export type FetchMyAds = {
    type: MineStillingerActionType.FetchMyAds;
};

export type FetchMyAdsBegin = {
    type: MineStillingerActionType.FetchMyAdsBegin;
};

export type FetchMyAdsSuccess = {
    type: MineStillingerActionType.FetchMyAdsSuccess;
    response: MineStillingerResultat;
};

export type FetchMyAdsFailure = {
    type: MineStillingerActionType.FetchMyAdsFailure;
    error: ApiError;
};

export type ChangeMyAdsPage = {
    type: MineStillingerActionType.ChangeMyAdsPage;
    page: number;
};

export type ResetMyAdsPage = {
    type: MineStillingerActionType.ResetMyAdsPage;
};

export type ChangeMyAdsStatusFilter = {
    type: MineStillingerActionType.ChangeMyAdsStatusFilter;
    status: string[];
};

export type ChangeMyAdsDeactivatedFilter = {
    type: MineStillingerActionType.ChangeMyAdsDeactivatedFilter;
    deactivatedByExpiry: boolean;
};

export type ChangeMyAdsSorting = {
    type: MineStillingerActionType.ChangeMyAdsSorting;
    field: MineStillingerSorteringsfelt;
    dir: Retning;
};

export type MineStillingerAction =
    | FetchMyAds
    | FetchMyAdsBegin
    | FetchMyAdsSuccess
    | FetchMyAdsFailure
    | ChangeMyAdsPage
    | ResetMyAdsPage
    | ChangeMyAdsStatusFilter
    | ChangeMyAdsDeactivatedFilter
    | ChangeMyAdsSorting;
