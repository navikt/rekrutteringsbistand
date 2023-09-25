import { ClockIcon, PersonIcon, PinIcon } from '@navikt/aksel-icons';
import { Button, Tag } from '@navikt/ds-react';
import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { EsRekrutteringsbistandstilling, EsStilling } from 'felles/domene/stilling/EsStilling';
import { Geografi, Privacy } from 'felles/domene/stilling/Stilling';
import useInnloggetBruker from '../../../../felles/hooks/useBrukerensIdent';
import RekBisKortStilling from '../../../../felles/komponenter/rekbis-kort/RekBisKortStilling';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../../../stilling/Stilling';
import { hentHovedtags } from '../../filter/inkludering/tags';
import {
    lagUrlTilKandidatliste,
    lagUrlTilStilling,
    skalViseLenkeTilKandidatliste,
} from '../../utils/stillingsUtils';
import formaterMedStoreOgSmåBokstaver from '../../utils/stringUtils';
import css from './Stillingsrad.module.css';
import { konverterTilPresenterbarDato } from './datoUtils';

type Props = {
    rekrutteringsbistandstilling: EsRekrutteringsbistandstilling;
    score: number | null;
    kandidatnr?: string;
};

const Stillingsrad: FunctionComponent<Props> = ({
    rekrutteringsbistandstilling,
    kandidatnr,
    score,
}) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const navId = useInnloggetBruker();

    const stilling = rekrutteringsbistandstilling.stilling;
    const eierNavn = formaterEiernavn(hentEier(rekrutteringsbistandstilling));

    const antallStillinger = Number(stilling.properties.positioncount);
    const antallStillingerSuffix = antallStillinger === 1 ? ` stilling` : ` stillinger`;

    const erInternStilling = stilling.privacy === Privacy.Intern;

    const arbeidsgiversNavn = hentArbeidsgiversNavn(stilling);

    const registrertMedInkluderingsmulighet = stilling.properties.tags?.some((tag) =>
        hentHovedtags().includes(tag)
    );

    let urlTilStilling = lagUrlTilStilling(stilling, kandidatnr);

    const erEier = hentEierId(rekrutteringsbistandstilling) === navId;

    return (
        <RekBisKortStilling
            erEier={erEier}
            publisertDato={konverterTilPresenterbarDato(stilling.published)}
            arbeidsgiversNavn={arbeidsgiversNavn}
            status={rekrutteringsbistandstilling.stilling.status}
            lenkeTilStilling={
                <Link
                    className={classNames(css.lenkeTilStilling)}
                    to={urlTilStilling}
                    state={{
                        stillingssøk: searchParams.toString(),
                    }}
                >
                    {stilling.title}
                </Link>
            }
            stillingsinfo={
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
            }
            knapper={
                <div>
                    {erEier && (
                        <Button
                            onClick={() =>
                                navigate(
                                    `/stillinger/stilling/${stilling.uuid}?${REDIGERINGSMODUS_QUERY_PARAM}=true`
                                )
                            }
                            variant="tertiary"
                        >
                            Rediger
                        </Button>
                    )}
                    {skalViseLenkeTilKandidatliste(rekrutteringsbistandstilling) && (
                        <Button
                            onClick={() => navigate(lagUrlTilKandidatliste(stilling))}
                            variant="tertiary"
                        >
                            Vis kandidater
                        </Button>
                    )}
                </div>
            }
            etiketter={
                <div>
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
            }
        />
    );
};

const hentEierId = (rekrutteringsbistandstilling: EsRekrutteringsbistandstilling) => {
    const eierId = rekrutteringsbistandstilling.stillingsinfo?.eierNavident;
    const reporteeId = rekrutteringsbistandstilling.stilling?.administration?.navIdent;

    return eierId ?? reporteeId;
};

const formaterEiernavn = (eierNavn: string | null) => {
    if (eierNavn == null) return null;
    const navnDel = eierNavn.split(',');
    return navnDel.length !== 2 ? eierNavn : navnDel[1].trim() + ' ' + navnDel[0].trim();
};

const hentEier = (rekrutteringsbistandstilling: EsRekrutteringsbistandstilling) => {
    const eierNavn = rekrutteringsbistandstilling.stillingsinfo?.eierNavn;
    const reportee = rekrutteringsbistandstilling.stilling.administration?.reportee;
    return eierNavn != null ? eierNavn : reportee != null ? reportee : null;
};

const hentArbeidssted = (locations: Geografi[]): string | null => {
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

const hentArbeidsgiversNavn = (stilling: EsStilling) =>
    stilling.businessName && stilling.businessName.length > 0
        ? stilling.businessName
        : formaterMedStoreOgSmåBokstaver(stilling.employer?.name);

export default Stillingsrad;
