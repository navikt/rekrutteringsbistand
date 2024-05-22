import { PersonPlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Loader } from '@navikt/ds-react';
import { FunctionComponent, useContext, useState } from 'react';

import useNavKontor from 'felles/store/navKontor';
import {
    KandidatsøkKandidat,
    KandidatsøkProps,
    useKandidatsøk,
} from '../../api/kandidat-søk-api/kandidatsøk';
import { ApplikasjonContext } from '../../felles/ApplikasjonContext';
import { Rolle } from '../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import Paginering from '../filter/Paginering';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import useSøkekriterier from '../hooks/useSøkekriterier';
import LagreKandidaterIMineKandidatlisterModal from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import LagreKandidaterISpesifikkKandidatlisteModal from '../kandidatliste/LagreKandidaterISpesifikkKandidatlisteModal';
import { Økt } from '../Økt';
import AntallKandidater from './AntallKandidater';
import css from './Kandidater.module.css';
import MarkerAlle from './MarkerAlle';
import Kandidatrad from './kandidatrad/Kandidatrad';
import Sortering from './sortering/Sortering';

type Props = {
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling | null;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatnr: string | string[]) => void;
    fjernMarkering: () => void;
    forrigeØkt: Økt | null;
};

enum Modal {
    IngenModal,
    LagreIMineKandidatlister,
    BekreftLagreIKandidatliste,
}

const Kandidater: FunctionComponent<Props> = ({
    kontekstAvKandidatlisteEllerStilling,
    markerteKandidater,
    onMarkerKandidat,
    fjernMarkering,
    forrigeØkt,
}) => {
    const { søkekriterier } = useSøkekriterier();
    const navKontor = useNavKontor((state) => state.navKontor);
    const [aktivModal, setAktivModal] = useState<Modal>(Modal.IngenModal);

    const { harRolle, enheter } = useContext(ApplikasjonContext);

    const onLagreIKandidatlisteClick = () => {
        setAktivModal(
            kontekstAvKandidatlisteEllerStilling
                ? Modal.BekreftLagreIKandidatliste
                : Modal.LagreIMineKandidatlister
        );
    };

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

    const begrensTilKontorer =
        søkekriterier.portefølje === 'mineKontorer' ||
        (harRolle([Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET]) &&
            !harRolle([Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET]));

    const begrensTilEnheter = begrensTilKontorer ? enheter : null;

    const søkeprops = {
        søkeprops: kandidatsøkProps,
        enheter: begrensTilEnheter,
    };

    const { kandidatsøkKandidater, totalHits, isLoading, error } = useKandidatsøk(søkeprops);

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

            {kandidatsøkKandidater && kandidatsøkKandidater.length > 0 ? (
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
                        {(kandidatsøkKandidater || []).map((kandidat: KandidatsøkKandidat) => (
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
            ) : (
                <BodyShort> Fant ingen kandidater </BodyShort>
            )}
            {kontekstAvKandidatlisteEllerStilling === null ? (
                <LagreKandidaterIMineKandidatlisterModal
                    vis={aktivModal === Modal.LagreIMineKandidatlister}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    kandidaterPåSiden={kandidatsøkKandidater || []}
                />
            ) : (
                <LagreKandidaterISpesifikkKandidatlisteModal
                    vis={aktivModal === Modal.BekreftLagreIKandidatliste}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    kontekstAvKandidatlisteEllerStilling={kontekstAvKandidatlisteEllerStilling}
                />
            )}
        </div>
    );
};

export default Kandidater;
