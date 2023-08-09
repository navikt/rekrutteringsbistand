import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { Status } from 'felles/domene/stilling/Stilling';
import { Nettressurs, feil, ikkeLastet, lasterInn, suksess } from 'felles/nettressurs';
import { MineStillingerAction, MineStillingerActionType } from './MineStillingerAction';
import { MineStillingerSorteringsfelt } from './MineStillingerSortering';
import { Retning } from './tabell/Retning';

export type MineStillingerResultat = {
    content: EsRekrutteringsbistandstilling[];
    totalElements: number;
    totalPages: number;
};

export type MineStillingerState = {
    resultat: Nettressurs<MineStillingerResultat>;
    page: number;
    sortField: MineStillingerSorteringsfelt;
    sortDir: Retning;
    deactivatedByExpiry: boolean;
    filter: {
        status: string[];
    };
};

const initialState = {
    resultat: ikkeLastet(),
    page: 0,
    sortField: MineStillingerSorteringsfelt.SistEndretTidspunkt,
    sortDir: Retning.Synkende,
    deactivatedByExpiry: false,
    filter: {
        status: [Status.Aktiv, Status.Inaktiv],
    },
};

export default function mineStillingerReducer(
    state: MineStillingerState = initialState,
    action: MineStillingerAction
): MineStillingerState {
    switch (action.type) {
        case MineStillingerActionType.FetchMyAdsBegin:
            return {
                ...state,
                resultat: lasterInn(),
            };
        case MineStillingerActionType.FetchMyAdsSuccess:
            return {
                ...state,
                resultat: suksess(action.response),
            };
        case MineStillingerActionType.FetchMyAdsFailure:
            return {
                ...state,
                resultat: feil(action.error),
            };
        case MineStillingerActionType.ChangeMyAdsStatusFilter:
            const deactivatedByExpiry =
                action.status.length > 0 ? false : state.deactivatedByExpiry;

            return {
                ...state,
                page: 0,
                filter: {
                    status: action.status,
                },
                deactivatedByExpiry,
            };
        case MineStillingerActionType.ChangeMyAdsDeactivatedFilter:
            const status = action.deactivatedByExpiry ? [] : state.filter.status;

            return {
                ...state,
                page: 0,
                filter: {
                    status,
                },
                deactivatedByExpiry: action.deactivatedByExpiry,
            };
        case MineStillingerActionType.ChangeMyAdsPage:
            return {
                ...state,
                page: action.page,
            };
        case MineStillingerActionType.ResetMyAdsPage:
            return {
                ...state,
                page: 0,
            };
        case MineStillingerActionType.ChangeMyAdsSorting:
            return {
                ...state,
                page: 0,
                sortField: action.field,
                sortDir: action.dir,
            };
        default:
            return state;
    }
}
