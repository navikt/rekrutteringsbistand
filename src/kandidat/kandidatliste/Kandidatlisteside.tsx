import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Nettstatus } from 'felles/nettressurs';
import Stilling from '../../felles/domene/stilling/Stilling';
import Sidelaster from '../../felles/komponenter/sidelaster/Sidelaster';
import KandidatlisteOgModaler from '../../kandidat/kandidatliste/KandidatlisteOgModaler';
import useScrollTilToppen from '../../kandidat/kandidatliste/hooks/useScrollTilToppen';
import KandidatlisteActionType from '../../kandidat/kandidatliste/reducer/KandidatlisteActionType';
import AppState from '../../kandidat/state/AppState';

type Props = {
    skjulBanner?: boolean;
    stilling: Stilling;
};

const Kandidatlisteside: FunctionComponent<Props> = ({ skjulBanner, stilling }) => {
    const dispatch = useDispatch();
    const { kandidatliste } = useSelector((state: AppState) => state.kandidatliste);
    const stillingsId = stilling.uuid;
    useScrollTilToppen(kandidatliste);

    useEffect(() => {
        dispatch({
            type: KandidatlisteActionType.HentKandidatlisteMedStillingsId,
            stillingsId,
        });
    }, [dispatch, stillingsId]);

    if (kandidatliste.kind === Nettstatus.LasterInn) {
        return <Sidelaster />;
    } else if (kandidatliste.kind !== Nettstatus.Suksess) {
        return null;
    }

    if (
        kandidatliste.kind === Nettstatus.Suksess &&
        stillingsId !== kandidatliste.data.stillingId
    ) {
        return <Sidelaster />;
    }

    return (
        <KandidatlisteOgModaler
            kandidatliste={kandidatliste.data}
            skjulBanner={skjulBanner}
            stilling={stilling}
        />
    );
};

export default Kandidatlisteside;
