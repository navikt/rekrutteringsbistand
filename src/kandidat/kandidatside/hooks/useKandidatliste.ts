import { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppState from '../../state/AppState';
import KandidatlisteAction from '../../kandidatliste/reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../kandidatliste/reducer/KandidatlisteActionType';

type UseKandidatliste = {
    stillingId: string | null;
    /** @deprecated  bruk stillingsId */
    kandidatlisteId?: string | null;
};

const useKandidatliste = ({ stillingId, kandidatlisteId }: UseKandidatliste) => {
    const dispatch: Dispatch<KandidatlisteAction> = useDispatch();
    const state = useSelector((state: AppState) => state.kandidatliste);

    useEffect(() => {
        const hentKandidatliste = () => {
            dispatch({
                type: KandidatlisteActionType.NullstillKandidatliste,
            });

            if (stillingId) {
                dispatch({
                    type: KandidatlisteActionType.HentKandidatlisteMedStillingsId,
                    stillingsId: stillingId,
                });
            } else if (kandidatlisteId) {
                dispatch({
                    type: KandidatlisteActionType.HentKandidatlisteMedKandidatlisteId,
                    kandidatlisteId,
                });
            }
        };

        hentKandidatliste();
    }, [dispatch, stillingId, kandidatlisteId]);

    return state.kandidatliste;
};

export default useKandidatliste;
