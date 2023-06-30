import { put, select, takeLatest } from 'redux-saga/effects';
import { hentMineStillingerOpenSearch } from '../api/api';
import { ApiError } from '../api/apiUtils';
import { State } from '../redux/store';
import { MineStillingerActionType } from './MineStillingerAction';
import { MineStillingerSortering } from './MineStillingerSortering';

const INGEN_AVVISTE_ELLER_SLETTEDE = '!REJECTED,DELETED';

export type HentMineStillingerQuery = {
    sort: MineStillingerSortering;
    page: number;
    navIdent: string;
    reportee: string;
    deactivatedByExpiry: boolean;
    status: string | string[];
};

function* getMyAds() {
    try {
        yield put({ type: MineStillingerActionType.FetchMyAdsBegin });

        const state: State = yield select();
        const reportee = state.reportee.data;

        if (!reportee) {
            return;
        }

        const { page, deactivatedByExpiry, sortDir, sortField, filter } = state.mineStillinger;
        const status = filter.status.length === 0 ? INGEN_AVVISTE_ELLER_SLETTEDE : filter.status;

        const query: HentMineStillingerQuery = {
            page,
            deactivatedByExpiry,
            sort: { felt: sortField, retning: sortDir },
            status,
            navIdent: (reportee.navIdent || '').toLowerCase(),
            reportee: reportee.displayName,
        };

        const response = yield hentMineStillingerOpenSearch(query);

        yield put({ type: MineStillingerActionType.FetchMyAdsSuccess, response });
    } catch (e) {
        if (e instanceof ApiError) {
            yield put({ type: MineStillingerActionType.FetchMyAdsFailure, error: e });
        } else {
            throw e;
        }
    }
}

function* resetMyAdsPage() {
    yield put({ type: MineStillingerActionType.ResetMyAdsPage });
}

export const mineStillingerSaga = function* saga() {
    yield takeLatest(
        [
            MineStillingerActionType.ChangeMyAdsStatusFilter,
            MineStillingerActionType.ChangeMyAdsDeactivatedFilter,
            MineStillingerActionType.ChangeMyAdsPage,
            MineStillingerActionType.FetchMyAds,
            MineStillingerActionType.ChangeMyAdsSorting,
        ],
        getMyAds
    );
    yield takeLatest(
        [
            MineStillingerActionType.ChangeMyAdsStatusFilter,
            MineStillingerActionType.ChangeMyAdsSorting,
        ],
        resetMyAdsPage
    );
};
