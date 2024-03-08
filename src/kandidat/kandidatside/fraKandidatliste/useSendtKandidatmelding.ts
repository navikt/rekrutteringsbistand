import { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppState from '../../state/AppState';
import KandidatlisteAction from '../../kandidatliste/reducer/KandidatlisteAction';
import KandidatlisteActionType from '../../kandidatliste/reducer/KandidatlisteActionType';
import { Nettstatus } from 'felles/nettressurs';
import { KandidatIKandidatliste } from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';

const useSendtKandidatmelding = (
    kandidat: KandidatIKandidatliste,
    kandidatliste: Kandidatliste
) => {
    const dispatch: Dispatch<KandidatlisteAction> = useDispatch();

    const { sendteMeldinger } = useSelector((state: AppState) => state.kandidatliste.sms);

    useEffect(() => {
        dispatch({
            type: KandidatlisteActionType.HentSendteMeldinger,
            stillingId: kandidatliste.stillingId!,
        });
    }, [dispatch, kandidatliste.stillingId]);

    if (sendteMeldinger.kind !== Nettstatus.Suksess || kandidat.fodselsnr === null) {
        return undefined;
    } else {
        return sendteMeldinger.data[kandidat.fodselsnr];
    }
};

export default useSendtKandidatmelding;
