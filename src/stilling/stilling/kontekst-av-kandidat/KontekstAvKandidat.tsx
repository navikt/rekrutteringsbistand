import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Alert, CopyButton } from '@navikt/ds-react';
import { api } from 'felles/api';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import Stilling from 'felles/domene/stilling/Stilling';
import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import Kandidatbanner from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import KandidatenFinnesIkke from 'felles/komponenter/legg-til-kandidat/KandidatenFinnesIkke';
import { ikkeLastet, lasterInn, Nettressurs, Nettstatus } from 'felles/nettressurs';
import { hentAnnonselenke, stillingErPublisert } from '../adUtils';
import AnbefalKandidatModal from './AnbefalKandidatModal';
import Kandidatlistehandlinger from './Kandidatlistehandlinger';
import css from './KontekstAvKandidat.module.css';
import useEsKandidat from 'felles/komponenter/banner/useEsKandidat';
import EsKandidat from 'felles/domene/kandidat/EsKandidat';

type Props = {
    fnr: string;
    kandidatliste: Nettressurs<Kandidatliste>;
    setKandidatliste: (kandidatliste: Nettressurs<Kandidatliste>) => void;
    stilling: Stilling;
};

const KontekstAvKandidat = ({ fnr, kandidatliste, setKandidatliste, stilling }: Props) => {
    const { kandidat, feilmelding } = useEsKandidat(fnr);
    const { state } = useLocation();
    const [visModal, setVisModal] = useState<boolean>(false);

    const brødsmulesti = byggBrødsmulesti(fnr, stilling, kandidat, state?.stillingsssøk);

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
                {synlighetsevaluering.kind === Nettstatus.Feil && (
                    <div className={css.synlighetsevalueringfeil}>
                        <Alert variant="error">
                            Klarte ikke laste inn forklaring på hvorfor brukeren ikke finnes
                        </Alert>
                    </div>
                )}
            </>
        );
    } else {
        return (
            <>
                <Kandidatbanner
                    kandidat={kandidat}
                    brødsmulesti={brødsmulesti}
                    bunnHoyre={
                        <div className={css.knapper}>
                            {stillingErPublisert(stilling) && (
                                <CopyButton
                                    copyText={hentAnnonselenke(stilling.uuid)}
                                    text="Kopier annonselenke"
                                    size="small"
                                />
                            )}
                            <Kandidatlistehandlinger
                                fnr={fnr}
                                kandidatliste={kandidatliste}
                                onAnbefalClick={() => {
                                    setVisModal(true);
                                }}
                            />
                        </div>
                    }
                />
                {kandidat && kandidatliste.kind === Nettstatus.Suksess && (
                    <AnbefalKandidatModal
                        fnr={fnr}
                        kandidat={kandidat}
                        kandidatliste={kandidatliste.data}
                        setKandidatliste={setKandidatliste}
                        onClose={() => setVisModal(false)}
                        vis={visModal}
                    />
                )}
            </>
        );
    }
};

const byggBrødsmulesti = (
    fnr: string,
    stilling: Stilling,
    kandidat?: EsKandidat,
    stillingssøk?: string
) => {
    if (!kandidat) {
        return undefined;
    }

    let urlTilFinnStilling = `/stillingssok/${fnr}`;
    if (stillingssøk) {
        urlTilFinnStilling += `?${stillingssøk}`;
    }

    return [
        {
            href: '/kandidatsok',
            tekst: 'Kandidater',
        },
        {
            href: `/kandidater/kandidat/${kandidat?.arenaKandidatnr}/cv?fraKandidatsok=true`,
            tekst: `${kandidat?.fornavn} ${kandidat?.etternavn}`,
        },
        {
            tekst: 'Finn stilling',
            href: urlTilFinnStilling,
        },
        {
            tekst: stilling.title,
        },
    ];
};

export default KontekstAvKandidat;
