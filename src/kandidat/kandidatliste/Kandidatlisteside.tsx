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
            console.log('Med stillingsid');
        } else if (kandidatlisteId) {
            dispatch({
                type: KandidatlisteActionType.HentKandidatlisteMedKandidatlisteId,
                kandidatlisteId,
            });
            console.log('Uten stillingsid');
        }

        const hentArbeidsgiversVurderinger = async (stillingId: string) => {
            try {
                const respons = await fetch(
                    `${api.presenterteKandidaterApi}/kandidatliste/${stillingId}/vurdering`,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const vurderingerJson = await respons.json();
                console.log(
                    'Arbeidsgivers vurderinger: ',
                    vurderingerJson,
                    JSON.stringify(vurderingerJson)
                );
            } catch (e) {
                console.log('Kall mot arbeidsgivers vurderinger feilet: ' + e);
            }
        };
        console.log('stillingsId er ' + stillingsId);
        if (stillingsId) {
            console.log('inne i if');
            hentArbeidsgiversVurderinger(stillingsId);
        }
    }, [dispatch, stillingsId, kandidatlisteId]);

    if (kandidatliste.kind === Nettstatus.LasterInn) {
        return <Sidelaster />;
    } else if (kandidatliste.kind !== Nettstatus.Suksess) {
        return null;
    }

    return <KandidatlisteOgModaler kandidatliste={kandidatliste.data} />;
};

export default Kandidatlisteside;
