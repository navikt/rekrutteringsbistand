import { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Nettstatus } from 'felles/nettressurs';
import AppState from '../state/AppState';
import KandidatlisteOgModaler from './KandidatlisteOgModaler';
import useScrollTilToppen from './hooks/useScrollTilToppen';
import KandidatlisteActionType from './reducer/KandidatlisteActionType';
import Sidelaster from '../komponenter/sidelaster/Sidelaster';
import { api } from 'felles/api';

type Props = {
    stillingsId?: string;
    kandidatlisteId?: string;
};

const Kandidatlisteside: FunctionComponent<Props> = ({ stillingsId, kandidatlisteId }) => {
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

        const hentArbeidsgiversVurderinger = async (stillingId: string) => {
            try {
                const respons = await fetch(
                    `${api.presenterteKandidaterApi}/kandidatliste/${stillingId}`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const vurderingerJson = await respons.json();
                console.log('Arbeidsgivers vurderinger: ' + vurderingerJson);
            } catch (e) {
                console.log('Kall mot arbeidsgivers vurderinger feilet: ' + e);
            }

            hentArbeidsgiversVurderinger(stillingId);
        };
    }, [dispatch, stillingsId, kandidatlisteId]);

    if (kandidatliste.kind === Nettstatus.LasterInn) {
        return <Sidelaster />;
    } else if (kandidatliste.kind !== Nettstatus.Suksess) {
        return null;
    }

    return <KandidatlisteOgModaler kandidatliste={kandidatliste.data} />;
};

export default Kandidatlisteside;
