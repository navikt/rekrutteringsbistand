import { FunctionComponent } from 'react';
import { BodyShort, Detail, Panel, Tag } from '@navikt/ds-react';
import { ClockIcon, PersonIcon, PinIcon } from '@navikt/aksel-icons';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import Stilling, { Location, Privacy, Rekrutteringsbistandstilling } from '../../domene/Stilling';
import { konverterTilPresenterbarDato } from './datoUtils';
import {
    lagUrlTilKandidatliste,
    lagUrlTilStilling,
    skalViseLenkeTilKandidatliste,
} from '../../utils/stillingsUtils';
import formaterMedStoreOgSmåBokstaver from '../../utils/stringUtils';
import { hentHovedtags } from '../../filter/inkludering/tags';
import css from './Stillingsrad.module.css';

type Props = {
    rekrutteringsbistandstilling: Rekrutteringsbistandstilling;
    score: number | null;
    fnr?: string;
};

const Stillingsrad: FunctionComponent<Props> = ({ rekrutteringsbistandstilling, fnr, score }) => {
    const [searchParams] = useSearchParams();

    const stilling = rekrutteringsbistandstilling.stilling;
    const eierNavn = formaterEiernavn(hentEier(rekrutteringsbistandstilling));

    const antallStillinger = stilling.properties.positioncount;
    const antallStillingerSuffix = antallStillinger === 1 ? ` stilling` : ` stillinger`;

    const erInternStilling = stilling.privacy === Privacy.Intern;

    const arbeidsgiversNavn = hentArbeidsgiversNavn(stilling);

    const registrertMedInkluderingsmulighet = stilling.properties.tags?.some((tag) =>
        hentHovedtags().includes(tag)
    );

    let urlTilStilling = lagUrlTilStilling(stilling, fnr);
    if (import.meta.env.DEV) {
        urlTilStilling += `?${searchParams}`;
    }

    return (
        <li className={css.stillingsrad}>
            <Panel border className={css.info}>
                <div className={css.etiketterOgDato}>
                    <div className={css.etiketter}>
                        {registrertMedInkluderingsmulighet && (
                            <Tag
                                size="small"
                                variant="info"
                                className={classNames(css.etikett, css.etikettInkludering)}
                            >
                                Inkludering
                            </Tag>
                        )}
                        {stilling.source === 'DIR' && (
                            <Tag
                                size="small"
                                variant="info"
                                className={classNames(css.etikett, css.etikettIntern)}
                            >
                                Intern
                            </Tag>
                        )}
                        {stilling.privacy === 'SHOW_ALL' && (
                            <Tag
                                size="small"
                                variant="info"
                                className={classNames(css.etikett, css.etikettArbeidsplassen)}
                            >
                                Arbeidsplassen
                            </Tag>
                        )}
                    </div>
                    <Detail size="small">{konverterTilPresenterbarDato(stilling.published)}</Detail>
                </div>
                {arbeidsgiversNavn && <BodyShort>{arbeidsgiversNavn}</BodyShort>}
                <Link
                    className={classNames(css.lenkeTilStilling)}
                    to={urlTilStilling}
                    state={{
                        stillingssøk: searchParams.toString(),
                    }}
                >
                    {stilling.title}
                </Link>
                <span>
                    <span className={css.stillingsinfo}>
                        <span>
                            <PinIcon className={css.ikon} />
                            {formaterMedStoreOgSmåBokstaver(hentArbeidssted(stilling.locations)) ||
                                'Ingen arbeidssted'}
                        </span>
                        {antallStillinger && (
                            <span>
                                {antallStillinger} {antallStillingerSuffix}
                            </span>
                        )}
                        {stilling.properties.applicationdue && (
                            <span>
                                <ClockIcon className={css.ikon} />
                                {konverterTilPresenterbarDato(stilling.properties.applicationdue)}
                            </span>
                        )}
                        {erInternStilling && eierNavn && (
                            <span>
                                <PersonIcon className={css.ikon} />
                                {eierNavn}
                            </span>
                        )}
                    </span>
                    <span>
                        {skalViseLenkeTilKandidatliste(rekrutteringsbistandstilling) && (
                            <Link
                                className={css.stillingsinfolink}
                                to={lagUrlTilKandidatliste(stilling)}
                                title="Se kandidatliste"
                            >
                                Vis kandidater
                            </Link>
                        )}
                    </span>
                </span>
            </Panel>
            {import.meta.env.DEV && score !== null && (
                <code className={css.score} title="Score">
                    {score.toFixed(2)}
                </code>
            )}
        </li>
    );
};

const formaterEiernavn = (eierNavn: string | null) => {
    if (eierNavn == null) return null;
    const navnDel = eierNavn.split(',');
    return navnDel.length !== 2 ? eierNavn : navnDel[1].trim() + ' ' + navnDel[0].trim();
};

const hentEier = (rekrutteringsbistandstilling: Rekrutteringsbistandstilling) => {
    const eierNavn = rekrutteringsbistandstilling.stillingsinfo?.eierNavn;
    const reportee = rekrutteringsbistandstilling.stilling.administration?.reportee;
    return eierNavn != null ? eierNavn : reportee != null ? reportee : null;
};

const hentArbeidssted = (locations: Location[]): string | null => {
    const filtrerteLocations: string[] = [];
    locations.forEach((location) => {
        if (location.municipal) {
            filtrerteLocations.push(location.municipal);
        } else if (location.county) {
            filtrerteLocations.push(location.county);
        }
    });

    return filtrerteLocations.join(', ');
};

const hentArbeidsgiversNavn = (stilling: Stilling) =>
    stilling.businessName && stilling.businessName.length > 0
        ? stilling.businessName
        : formaterMedStoreOgSmåBokstaver(stilling.employer?.name);

export default Stillingsrad;
