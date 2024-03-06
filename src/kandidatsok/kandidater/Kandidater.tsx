import { PersonPlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Loader } from '@navikt/ds-react';
import { FunctionComponent, useEffect } from 'react';

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
import { KandidatsøkProps, useKandidatsøk } from '../../api/kandidat-søk-api/kandidatsøk';
import useNavKontor from 'felles/store/navKontor';

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
    const navKontor = useNavKontor((state) => state.navKontor);

    const kandidatsøkProps: KandidatsøkProps = {
        søkekriterier: {
            fritekst: søkekriterier.fritekst,
            portefølje: søkekriterier.portefølje,
            valgtKontor: søkekriterier.valgtKontor,
            orgenhet: navKontor,
            innsatsgruppe: søkekriterier.innsatsgruppe,
            ønsketYrke: søkekriterier.ønsketYrke,
            ønsketSted: søkekriterier.ønsketSted,
            borPåØnsketSted: søkekriterier.borPåØnsketSted,
            kompetanse: søkekriterier.kompetanse,
            førerkort: søkekriterier.førerkort,
            prioritertMålgruppe: søkekriterier.prioritertMålgruppe,
            hovedmål: søkekriterier.hovedmål,
            utdanningsnivå: søkekriterier.utdanningsnivå,
            arbeidserfaring: søkekriterier.arbeidserfaring,
            ferskhet: søkekriterier.ferskhet,
            språk: søkekriterier.språk,
        },
        side: søkekriterier.side,
        sortering: søkekriterier.sortering,
    };
    const { kandidatsøkKandidater, totalHits, isLoading, error } = useKandidatsøk(kandidatsøkProps);

    useEffect(() => {
        setKandidaterPåSiden(kandidatsøkKandidater || []);
    }, [kandidatsøkKandidater, setKandidaterPåSiden]);

    return (
        <div className={css.kandidater}>
            <div className={css.handlinger}>
                {!totalHits ? <div /> : <AntallKandidater antallTreff={totalHits} />}
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
                    {error.message === '403'
                        ? 'Du har ikke tilgang til kandidatsøket'
                        : error.message}
                </BodyShort>
            )}

            {kandidatsøkKandidater && kandidatsøkKandidater.length > 0 && (
                <>
                    <div className={css.overKandidater}>
                        <MarkerAlle
                            kandidater={kandidatsøkKandidater || []}
                            markerteKandidater={markerteKandidater}
                            onMarkerKandidat={onMarkerKandidat}
                            kontekstAvKandidatlisteEllerStilling={
                                kontekstAvKandidatlisteEllerStilling
                            }
                        />
                        <Sortering />
                    </div>
                    <ul className={css.kandidatrader}>
                        {(kandidatsøkKandidater || []).map((kandidat: KandidatTilKandidatsøk) => (
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
                    <Paginering antallTreff={totalHits || 0} />
                </>
            )}
        </div>
    );
};

export default Kandidater;
