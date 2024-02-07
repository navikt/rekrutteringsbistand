import { PersonPlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Loader } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useMemo } from 'react';

import { KandidatTilKandidatsøk } from 'felles/domene/kandidat/Kandidat';
import { Nettstatus } from 'felles/nettressurs';
import Paginering from '../filter/Paginering';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import useQuery from '../hooks/useQuery';
import { Økt } from '../Økt';
import AntallKandidater from './AntallKandidater';
import css from './Kandidater.module.css';
import MarkerAlle from './MarkerAlle';
import Kandidatrad from './kandidatrad/Kandidatrad';
import Sortering from './sortering/Sortering';

type Props = {
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling | null;
    onLagreIKandidatlisteClick: () => void;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatnr: string | string[]) => void;
    fjernMarkering: () => void;
    forrigeØkt: Økt | null;
    setKandidaterPåSiden: (kandidater: KandidatTilKandidatsøk[]) => void;
};

const Kandidater: FunctionComponent<Props> = ({
    kontekstAvKandidatlisteEllerStilling,
    onLagreIKandidatlisteClick,
    markerteKandidater,
    onMarkerKandidat,
    fjernMarkering,
    forrigeØkt,
    setKandidaterPåSiden,
}) => {
    const response = useQuery();

    const totaltAntallKandidater = useMemo(() => {
        if (response.kind === Nettstatus.Suksess || response.kind === Nettstatus.Oppdaterer) {
            const hits = response.data.hits;
            return hits.total.value;
        } else {
            return 0;
        }
    }, [response]);

    const kandidater = useMemo(() => {
        if (response.kind === Nettstatus.Suksess || response.kind === Nettstatus.Oppdaterer) {
            const hits = response.data.hits;
            const kandidater = hits.hits.map((t) => t._source);
            return kandidater;
        } else {
            return [];
        }
    }, [response]);

    useEffect(() => {
        setKandidaterPåSiden(kandidater);
    }, [kandidater, setKandidaterPåSiden]);

    return (
        <div className={css.kandidater}>
            <div className={css.handlinger}>
                <AntallKandidater response={response} />
                <div className={css.knapper}>
                    {markerteKandidater.size > 0 && (
                        <Button
                            size="small"
                            variant="secondary"
                            aria-label="Fjern markerte kandidater"
                            icon={<XMarkIcon aria-hidden />}
                            className={css.fjernMarkeringKnapp}
                            onClick={fjernMarkering}
                        >
                            {markerteKandidater.size} markert
                        </Button>
                    )}
                    <Button
                        size="small"
                        variant="primary"
                        icon={<PersonPlusIcon aria-hidden />}
                        disabled={markerteKandidater.size === 0}
                        onClick={onLagreIKandidatlisteClick}
                    >
                        Lagre i kandidatliste
                    </Button>
                </div>
            </div>

            {response.kind === Nettstatus.LasterInn && (
                <Loader variant="interaction" size="2xlarge" className={css.lasterInn} />
            )}

            {response.kind === Nettstatus.Feil && (
                <BodyShort className={css.feilmelding} aria-live="assertive">
                    {response.error.status === 403
                        ? 'Du har ikke tilgang til kandidatsøket'
                        : response.error.message}
                </BodyShort>
            )}

            {kandidater.length > 0 && (
                <>
                    <div className={css.overKandidater}>
                        <MarkerAlle
                            kandidater={kandidater}
                            markerteKandidater={markerteKandidater}
                            onMarkerKandidat={onMarkerKandidat}
                            kontekstAvKandidatlisteEllerStilling={
                                kontekstAvKandidatlisteEllerStilling
                            }
                        />
                        <Sortering />
                    </div>
                    <ul className={css.kandidatrader}>
                        {kandidater.map((kandidat) => (
                            <Kandidatrad
                                key={kandidat.arenaKandidatnr}
                                kandidat={kandidat}
                                markerteKandidater={markerteKandidater}
                                kontekstAvKandidatlisteEllerStilling={
                                    kontekstAvKandidatlisteEllerStilling
                                }
                                forrigeØkt={forrigeØkt}
                                onMarker={() => {
                                    onMarkerKandidat(kandidat.arenaKandidatnr);
                                }}
                            />
                        ))}
                    </ul>
                    <Paginering antallTreff={totaltAntallKandidater} />
                </>
            )}
        </div>
    );
};

export default Kandidater;
