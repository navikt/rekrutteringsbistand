import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import {
    FormidlingAvUsynligKandidat,
    KandidatIKandidatliste,
    Kandidatstatus,
    Kandidatutfall,
} from 'felles/domene/kandidatliste/KandidatIKandidatliste';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { lenkeTilKandidatlisteoversikt, lenkeTilStilling } from '../../app/paths';
import { capitalizeEmployerName } from '../../utils/formateringUtils';
import { erKobletTilArbeidsgiver, erKobletTilStilling } from '../domene/kandidatlisteUtils';
import css from './SideHeader.module.css';
import Kandidatlistestatus from './kandidatlistestatus/Kandidatlistestatus';

type Props = {
    kandidatliste: Kandidatliste;
    skjulBanner?: boolean;
};

const erIkkeArkivert = (k: KandidatIKandidatliste) => !k.arkivert;
const erAktuell = (k: KandidatIKandidatliste) => k.status === Kandidatstatus.Aktuell;
const erPresentert = (k: KandidatIKandidatliste) => k.utfall === Kandidatutfall.Presentert;
const harFåttJobb = (k: KandidatIKandidatliste) => k.utfall === Kandidatutfall.FåttJobben;
const usynligKandidatHarFåttJobb = (f: FormidlingAvUsynligKandidat) =>
    f.utfall === Kandidatutfall.FåttJobben;

const SideHeader: FunctionComponent<Props> = ({ kandidatliste, skjulBanner }) => {
    const ikkeArkiverteKandidater = kandidatliste.kandidater.filter(erIkkeArkivert);
    const antallAktuelleKandidater = ikkeArkiverteKandidater.filter(erAktuell).length;
    const antallPresenterteKandidater = ikkeArkiverteKandidater.filter(erPresentert).length;
    const antallKandidaterSomHarFåttJobb =
        ikkeArkiverteKandidater.filter(harFåttJobb).length +
        kandidatliste.formidlingerAvUsynligKandidat.filter(usynligKandidatHarFåttJobb).length;

    const oppsummeringTekst = `${
        kandidatliste.kandidater.length
    } kandidater (${antallAktuelleKandidater} er aktuelle${
        erKobletTilStilling(kandidatliste) ? ` / ${antallPresenterteKandidater} er presentert` : ''
    })`;

    if (skjulBanner) {
        return (
            <div className={css.kunKandidatlistestatus}>
                <Kandidatlistestatus
                    className={css.status}
                    status={kandidatliste.status}
                    erKnyttetTilStilling={erKobletTilStilling(kandidatliste)}
                    kanEditere={kandidatliste.kanEditere}
                    besatteStillinger={antallKandidaterSomHarFåttJobb}
                    antallStillinger={kandidatliste.antallStillinger}
                    kandidatlisteId={kandidatliste.kandidatlisteId}
                />
            </div>
        );
    }

    return (
        <header className={css.header}>
            <div className={css.inner}>
                <div className={css.tilbake}>
                    <Link className="navds-link" to={lenkeTilKandidatlisteoversikt}>
                        <ChevronLeftIcon />
                        Til kandidatlister
                    </Link>
                </div>
                <div>
                    <Heading spacing level="2" size="medium">
                        {kandidatliste.tittel}
                    </Heading>

                    <Label spacing as="p">
                        {oppsummeringTekst}
                    </Label>
                    <BodyShort spacing className={css.omKandidatlisten}>
                        {erKobletTilArbeidsgiver(kandidatliste) && (
                            <span>
                                Arbeidsgiver:{' '}
                                {capitalizeEmployerName(kandidatliste.organisasjonNavn)}
                            </span>
                        )}
                        <span>
                            Registrert av: {kandidatliste.opprettetAv.navn} (
                            {kandidatliste.opprettetAv.ident})
                        </span>
                        {erKobletTilStilling(kandidatliste) && (
                            <span>
                                <Link
                                    to={lenkeTilStilling(kandidatliste.stillingId!)}
                                    className="navds-link"
                                >
                                    Se stillingsannonse
                                </Link>
                            </span>
                        )}
                    </BodyShort>
                </div>
                <Kandidatlistestatus
                    className={css.status}
                    status={kandidatliste.status}
                    erKnyttetTilStilling={erKobletTilStilling(kandidatliste)}
                    kanEditere={kandidatliste.kanEditere}
                    besatteStillinger={antallKandidaterSomHarFåttJobb}
                    antallStillinger={kandidatliste.antallStillinger}
                    kandidatlisteId={kandidatliste.kandidatlisteId}
                />
            </div>
        </header>
    );
};

export default SideHeader;
