import { Alert } from '@navikt/ds-react';
import { api } from 'felles/api';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import Kandidatbanner, { formaterNavn } from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import KandidatenFinnesIkke from 'felles/komponenter/legg-til-kandidat/KandidatenFinnesIkke';
import { Nettressurs, Nettstatus, ikkeLastet, lasterInn } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import useKandidatStillingssøk from './useKandidatStillingssøk';

type Props = {
    fnr: string;
};

const KontekstAvKandidat = ({ fnr }: Props) => {
    const kandidat = useKandidatStillingssøk(fnr);

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

        if (kandidat.kind === Nettstatus.Feil) {
            evaluerSynlighet();
        }
    }, [kandidat.kind, fnr]);

    if (kandidat.kind === Nettstatus.Feil) {
        return (
            <>
                <Alert variant="error">Kandidaten er ikke synlig i Rekrutteringsbistand</Alert>
                {synlighetsevaluering.kind === Nettstatus.Suksess && (
                    <KandidatenFinnesIkke synlighetsevaluering={synlighetsevaluering.data} />
                )}
            </>
        );
    } else {
        const brødsmulesti =
            kandidat.kind === Nettstatus.Suksess
                ? [
                      {
                          href: '/kandidatsok',
                          tekst: 'Kandidater',
                      },
                      {
                          href: `/kandidater/kandidat/${kandidat.data.arenaKandidatnr}/cv?fraKandidatsok=true`,
                          tekst: formaterNavn(kandidat.data),
                      },

                      {
                          tekst: 'Finn stilling',
                      },
                  ]
                : [];

        return <Kandidatbanner kandidat={kandidat} brødsmulesti={brødsmulesti} />;
    }
};

export default KontekstAvKandidat;
