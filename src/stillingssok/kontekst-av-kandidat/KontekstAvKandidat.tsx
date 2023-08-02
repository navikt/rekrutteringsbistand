import useKandidat from './useKandidat';
import Kandidatbanner from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import { Alert } from '@navikt/ds-react';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import { Nettressurs, Nettstatus, ikkeLastet, lasterInn } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import { api } from 'felles/api';
import KandidatenFinnesIkke from 'felles/komponenter/legg-til-kandidat/KandidatenFinnesIkke';

type Props = {
    fnr: string;
};

const KontekstAvKandidat = ({ fnr }: Props) => {
    const { kandidat, feilmelding } = useKandidat(fnr);

    const [synlighetsevaluering, setSynlighetsevaluering] = useState<
        Nettressurs<Synlighetsevaluering>
    >(ikkeLastet());

    useEffect(() => {
        const fetchSynlighetsevaluering = async (
            fødselsnummer: string
        ): Promise<Nettressurs<Synlighetsevaluering>> => {
            const url = `${api.synlighet}/evaluering/${fødselsnummer}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                });

                if (response.ok) {
                    const body = await response.json();

                    return {
                        kind: Nettstatus.Suksess,
                        data: body,
                    };
                } else {
                    throw await response.text();
                }
            } catch (e) {
                console.log('fetchSynlighetsevaluering feilet');
            }
        };

        const evaluerSynlighet = async () => {
            setSynlighetsevaluering(lasterInn());
            const synlighetPromise = fetchSynlighetsevaluering(fnr);

            setSynlighetsevaluering(await synlighetPromise);
        };

        if (feilmelding) {
            evaluerSynlighet();
        }
    }, [feilmelding, fnr]);

    if (feilmelding) {
        return (
            <>
                <Alert variant="error">Kandidaten er ikke synlig i Rekrutteringsbistand</Alert>
                {synlighetsevaluering.kind === Nettstatus.Suksess && (
                    <KandidatenFinnesIkke synlighetsevaluering={synlighetsevaluering.data} />
                )}
            </>
        );
    } else {
        return (
            <Kandidatbanner
                kandidat={kandidat}
                brødsmulesti={
                    kandidat
                        ? [
                              {
                                  href: '/kandidatsok',
                                  tekst: 'Kandidater',
                              },
                              {
                                  href: `/kandidater/kandidat/${kandidat.arenaKandidatnr}/cv?fraKandidatsok=true`,
                                  tekst: `${kandidat.fornavn} ${kandidat.etternavn}`,
                              },

                              {
                                  tekst: 'Finn stilling',
                              },
                          ]
                        : undefined
                }
            />
        );
    }
};

export default KontekstAvKandidat;
