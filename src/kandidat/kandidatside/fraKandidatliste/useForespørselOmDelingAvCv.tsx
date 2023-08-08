import { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppState from '../../state/AppState';
import KandidatlisteAction from '../../kandidatliste/reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../kandidatliste/reducer/KandidatlisteActionType';
import { finnesIkke, Nettstatus, feil, lasterInn, suksess, Nettressurs } from 'felles/nettressurs';
import { ForespørslerForKandidatForStilling } from '../../kandidatliste/knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';

const useForespørselOmDelingAvCv = (
    kandidat: KandidatIKandidatliste,
    kandidatliste: Kandidatliste
): Nettressurs<ForespørslerForKandidatForStilling> => {
    const dispatch: Dispatch<KandidatlisteAction> = useDispatch();
    const stillingsId = kandidatliste.stillingId;

    const { forespørslerOmDelingAvCv } = useSelector((state: AppState) => state.kandidatliste);

    useEffect(() => {
        if (stillingsId) {
            dispatch({
                type: KandidatlisteActionType.NullstillForespørslerOmDelingAvCv,
            });

            dispatch({
                type: KandidatlisteActionType.HentForespørslerOmDelingAvCv,
                stillingsId,
            });
        }
    }, [dispatch, stillingsId]);

    if (kandidat.aktørid === null) {
        return finnesIkke();
    }

    if (forespørslerOmDelingAvCv.kind === Nettstatus.Feil) {
        return feil(forespørslerOmDelingAvCv.error);
    }

    if (
        forespørslerOmDelingAvCv.kind === Nettstatus.LasterInn ||
        forespørslerOmDelingAvCv.kind === Nettstatus.Oppdaterer ||
        forespørslerOmDelingAvCv.kind === Nettstatus.SenderInn
    ) {
        return lasterInn();
    }

    if (forespørslerOmDelingAvCv.kind === Nettstatus.Suksess) {
        const forespørsel = forespørslerOmDelingAvCv[kandidat.aktørid];

        if (forespørsel) {
            return suksess(forespørsel);
        } else {
            return finnesIkke();
        }
    }

    return forespørslerOmDelingAvCv;
};

export default useForespørselOmDelingAvCv;
