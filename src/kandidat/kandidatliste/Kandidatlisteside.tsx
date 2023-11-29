import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Nettstatus } from 'felles/nettressurs';
import Sidelaster from '../../felles/komponenter/sidelaster/Sidelaster';
import KandidatlisteOgModaler from '../../kandidat/kandidatliste/KandidatlisteOgModaler';
import useScrollTilToppen from '../../kandidat/kandidatliste/hooks/useScrollTilToppen';
import KandidatlisteActionType from '../../kandidat/kandidatliste/reducer/KandidatlisteActionType';
import AppState from '../../kandidat/state/AppState';

type Props = {
    stillingsId?: string;
    kandidatlisteId?: string;
    skjulBanner?: boolean;
};

const Kandidatlisteside: FunctionComponent<Props> = ({
    stillingsId,
    kandidatlisteId,
    skjulBanner,
}) => {
    const dispatch = useDispatch();
    const { kandidatliste } = useSelector((state: AppState) => state.kandidatliste);

    useScrollTilToppen(kandidatliste);

    useEffect(() => {
        if (stillingsId) {
            dispatch({
                type: KandidatlisteActionType.HentKandidatlisteMedStillingsId,
                stillingsId,
            });
        } else if (kandidatlisteId) {
            dispatch({
                type: KandidatlisteActionType.HentKandidatlisteMedKandidatlisteId,
                kandidatlisteId,
            });
        }
    }, [dispatch, stillingsId, kandidatlisteId]);

    if (kandidatliste.kind === Nettstatus.LasterInn) {
        return <Sidelaster />;
    } else if (kandidatliste.kind !== Nettstatus.Suksess) {
        return null;
    }

    return <KandidatlisteOgModaler kandidatliste={kandidatliste.data} skjulBanner={skjulBanner} />;
};

export default Kandidatlisteside;
