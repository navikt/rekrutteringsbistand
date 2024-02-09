import { PersonPlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Loader } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useMemo } from 'react';

import { KandidatTilKandidatsøk } from 'felles/domene/kandidat/Kandidat';
import Paginering from '../filter/Paginering';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import { Økt } from '../Økt';
import AntallKandidater from './AntallKandidater';
import css from './Kandidater.module.css';
import MarkerAlle from './MarkerAlle';
import Kandidatrad from './kandidatrad/Kandidatrad';
import Sortering from './sortering/Sortering';
import useSøkekriterier from '../hooks/useSøkekriterier';
import { useKandidatsøk } from '../../api/kandidat-søk-api/kandidatsøk';

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
    const { søkekriterier } = useSøkekriterier();
    const { kandidatsøkKandidater, totalHits, isLoading, error } = useKandidatsøk(søkekriterier);

    const suksessEllerLaster =
        (kandidatsøkKandidater && kandidatsøkKandidater.length > 0) || isLoading;

    const totaltAntallKandidater = useMemo(() => {
        if (suksessEllerLaster) {
            return totalHits;
        } else {
            return 0;
        }
    }, [suksessEllerLaster, totalHits]);

    const kandidater = useMemo(() => {
        if (suksessEllerLaster) {
            return kandidatsøkKandidater;
        } else {
            return [];
        }
    }, [suksessEllerLaster, kandidatsøkKandidater]);

    useEffect(() => {
        setKandidaterPåSiden(kandidatsøkKandidater);
    }, [kandidatsøkKandidater, setKandidaterPåSiden]);

    return (
        <div className={css.kandidater}>
            <div className={css.handlinger}>
                {!suksessEllerLaster ? <div /> : <AntallKandidater antallTreff={totalHits} />}
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

            {isLoading && <Loader variant="interaction" size="2xlarge" className={css.lasterInn} />}

            {error && (
                <BodyShort className={css.feilmelding} aria-live="assertive">
                    {error.message === 403
                        ? 'Du har ikke tilgang til kandidatsøket'
                        : error.message}
                </BodyShort>
            )}

            {kandidatsøkKandidater.length > 0 && (
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
