import { BriefcaseIcon, ClockIcon, PersonIcon, PinIcon } from '@navikt/aksel-icons';
import { Tag } from '@navikt/ds-react';
import classNames from 'classnames';
import { FunctionComponent, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import {
    EsRekrutteringsbistandstilling,
    EsStilling,
    stillingErUtløpt,
} from 'felles/domene/stilling/EsStilling';
import {
    Geografi,
    Privacy,
    Stillingskategori,
    USE_STYRK_AS_TITLE_FEATURE_TOGGLE,
} from 'felles/domene/stilling/Stilling';
import { ApplikasjonContext } from '../../../../felles/ApplikasjonContext';
import RekBisKortStilling from '../../../../felles/komponenter/rekbis-kort/RekBisKortStilling';
import TekstlinjeMedIkon from '../../../../felles/komponenter/tekstlinje-med-ikon/TekstlinjeMedIkon';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../../../stilling/Stilling';
import { hentHovedtags } from '../../filter/inkludering/tags';
import { lagUrlTilStilling, skalViseLenkeTilKandidatliste } from '../../utils/stillingsUtils';
import formaterMedStoreOgSmåBokstaver from '../../utils/stringUtils';
import css from './Stillingsrad.module.css';
import { konverterTilPresenterbarDato } from './datoUtils';

type Props = {
    rekrutteringsbistandstilling: EsRekrutteringsbistandstilling;
    score: number | null;
    kandidatnr?: string;
    navIdent?: string;
};
export const tittelfelt = USE_STYRK_AS_TITLE_FEATURE_TOGGLE ? 'tittel' : 'title';

const Stillingsrad: FunctionComponent<Props> = ({
    rekrutteringsbistandstilling,
    kandidatnr,
    score,
}) => {
    const { eierSjekk } = useContext(ApplikasjonContext);
    const [searchParams] = useSearchParams();
    const stillingskategori = rekrutteringsbistandstilling?.stillingsinfo?.stillingskategori;
    const stilling = rekrutteringsbistandstilling.stilling;
    const eierNavn = formaterEiernavn(hentEier(rekrutteringsbistandstilling));

    const antallStillinger = Number(stilling.properties.positioncount);
    const antallStillingerSuffix = antallStillinger === 1 ? ` stilling` : ` stillinger`;

    const erInternStilling = stilling.privacy === Privacy.Intern;

    const arbeidsgiversNavn = hentArbeidsgiversNavn(stilling);

    const registrertMedInkluderingsmulighet = stilling.properties.tags?.some((tag) =>
        hentHovedtags().includes(tag)
    );

    const urlTilStilling = lagUrlTilStilling(stilling, kandidatnr);

    const erEier =
        eierSjekk(rekrutteringsbistandstilling.stilling) ||
        eierSjekk(rekrutteringsbistandstilling.stillingsinfo);

    const erUtløptStilling = stillingErUtløpt(rekrutteringsbistandstilling.stilling);

    const status = rekrutteringsbistandstilling.stilling.status;

    const publisertDato = konverterTilPresenterbarDato(stilling.published);
    const utløpsDato = konverterTilPresenterbarDato(stilling.expires);

    const erSlettet = status === 'DELETED';

    return (
        <RekBisKortStilling
            erJobbmesse={stillingskategori === Stillingskategori.Jobbmesse}
            erEier={erEier}
            erIkkePublisert={
                stilling.publishedByAdmin && status === 'INACTIVE' && !erUtløptStilling
            }
            erUtkast={!rekrutteringsbistandstilling.stilling.publishedByAdmin}
            erUtløpt={status === 'INACTIVE' && erUtløptStilling}
            erStoppet={status === 'STOPPED' || status === 'REJECTED'}
            erSlettet={erSlettet}
            publisertDato={
                rekrutteringsbistandstilling.stilling.publishedByAdmin
                    ? publisertDato !== utløpsDato
                        ? `${publisertDato} -
                ${utløpsDato}`
                        : `Publisert ${publisertDato}`
                    : null
            }
            arbeidsgiversNavn={arbeidsgiversNavn}
            score={score}
            lenkeTilStilling={
                erSlettet ? (
                    stilling[tittelfelt]
                ) : (
                    <Link
                        className={classNames(css.stillingslenke, 'navds-link')}
                        to={urlTilStilling}
                        state={{
                            stillingssøk: searchParams.toString(),
                        }}
                    >
                        {stilling[tittelfelt]}
                    </Link>
                )
            }
            stillingsinfo={
                <div className={css.tekstrad}>
                    <TekstlinjeMedIkon
                        ikon={<PinIcon />}
                        tekst={
                            formaterMedStoreOgSmåBokstaver(hentArbeidssted(stilling.locations)) ||
                            '-'
                        }
                    />
                    <TekstlinjeMedIkon
                        ikon={<BriefcaseIcon />}
                        tekst={
                            antallStillinger ? `${antallStillinger} ${antallStillingerSuffix}` : '-'
                        }
                    />

                    <TekstlinjeMedIkon
                        ikon={<ClockIcon />}
                        tekst={
                            stilling.properties.applicationdue
                                ? konverterTilPresenterbarDato(stilling.properties.applicationdue)
                                : '-'
                        }
                    />

                    {erInternStilling && (
                        <TekstlinjeMedIkon ikon={<PersonIcon />} tekst={eierNavn || '-'} />
                    )}
                </div>
            }
            knapper={
                <div className={css.lenker}>
                    {erEier && !erSlettet && (
                        <Link
                            className={css.lenke}
                            to={`/stillinger/stilling/${stilling.uuid}?${REDIGERINGSMODUS_QUERY_PARAM}=true`}
                        >
                            Rediger
                        </Link>
                    )}
                    {erEier &&
                        !erSlettet &&
                        rekrutteringsbistandstilling.stilling.publishedByAdmin &&
                        skalViseLenkeTilKandidatliste(rekrutteringsbistandstilling) && (
                            <Link
                                className={css.lenke}
                                to={lagUrlTilStilling(stilling, undefined, 'kandidater')}
                            >
                                Vis kandidater
                            </Link>
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
        ? formaterMedStoreOgSmåBokstaver(stilling.businessName)
        : formaterMedStoreOgSmåBokstaver(stilling.employer?.name);

export default Stillingsrad;
