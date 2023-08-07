import {
    CandleIcon,
    EnvelopeClosedIcon,
    PersonIcon,
    PhoneIcon,
    PinIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Heading, Skeleton } from '@navikt/ds-react';
import { KandidatTilStillingssøk } from 'felles/domene/kandidat/Kandidat';
import { ReactComponent as Piktogram } from 'felles/komponenter/piktogrammer/minekandidater.svg';
import { brukStorForbokstav } from 'felles/utils/stringUtils';
import { Fragment, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import css from './Kandidatbanner.module.css';

type Brødsmule = {
    tekst: string;
    href?: string;
};

type Props = {
    kandidat?: KandidatTilStillingssøk;
    brødsmulesti?: Brødsmule[];
    children?: ReactNode;
};

const Kandidatbanner = ({ kandidat, brødsmulesti, children }: Props) => {
    return (
        <div className={css.banner}>
            <div className={css.piktogramOgInnhold}>
                <Piktogram className={css.piktogram} />
                <div className={css.innhold}>
                    <div className={css.hovedinnhold}>
                        <div>
                            {brødsmulesti ? (
                                brødsmulesti.map(({ tekst, href }, index) => {
                                    const brødsmule = href ? (
                                        <Link to={href}>{tekst}</Link>
                                    ) : (
                                        <BodyShort as="span">{tekst}</BodyShort>
                                    );

                                    return (
                                        <Fragment key={tekst}>
                                            {index !== 0 && <span> / </span>}
                                            {brødsmule}
                                        </Fragment>
                                    );
                                })
                            ) : (
                                <Skeleton width={220} />
                            )}
                        </div>
                        {kandidat ? (
                            <Heading size="large" level="3">
                                {formaterNavn(kandidat)}
                            </Heading>
                        ) : (
                            <Skeleton>
                                <Heading size="large">Placeholder</Heading>
                            </Skeleton>
                        )}

                        <div className={css.personalia}>
                            <BodyShort>
                                <CandleIcon />{' '}
                                {kandidat ? (
                                    lagFødselsdagtekst(kandidat?.fodselsdato)
                                ) : (
                                    <Skeleton width={180} />
                                )}
                            </BodyShort>

                            <BodyShort>
                                <PinIcon />{' '}
                                {kandidat ? hentAdresse(kandidat) ?? '-' : <Skeleton width={240} />}
                            </BodyShort>

                            <BodyShort>
                                <EnvelopeClosedIcon />
                                {kandidat ? (
                                    kandidat.epostadresse?.toLowerCase() ?? '-'
                                ) : (
                                    <Skeleton width={100} />
                                )}
                            </BodyShort>

                            <BodyShort>
                                <PhoneIcon />
                                {kandidat ? kandidat.telefon ?? '-' : <Skeleton width={100} />}
                            </BodyShort>

                            <BodyShort>
                                <PersonIcon />
                                {kandidat ? (
                                    kandidat.veileder ? (
                                        `${kandidat.veileder.toUpperCase()} (Veileder)`
                                    ) : (
                                        '-'
                                    )
                                ) : (
                                    <Skeleton width={100} />
                                )}
                            </BodyShort>
                        </div>
                    </div>
                    <div className={css.ekstrainnhold}>{children}</div>
                </div>
            </div>
        </div>
    );
};

const lagFødselsdagtekst = (inputdato?: string | null) => {
    if (!inputdato) return '-';

    const iDag = new Date();
    const fødselsdag = new Date(inputdato);

    const harIkkeFyltÅrIÅr =
        iDag.getUTCMonth() < fødselsdag.getUTCMonth() ||
        (iDag.getUTCMonth() === fødselsdag.getUTCMonth() &&
            iDag.getUTCDate() < fødselsdag.getUTCDate());

    const fødselsdagString = fødselsdag.toLocaleDateString('nb-NO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const alder = iDag.getUTCFullYear() - fødselsdag.getUTCFullYear() - (harIkkeFyltÅrIÅr ? 1 : 0);

    return `Født: ${fødselsdagString} (${alder} år)`;
};

const hentAdresse = (kandidat?: KandidatTilStillingssøk) => {
    if (!kandidat) return undefined;

    const { poststed, postnummer, adresselinje1 } = kandidat;

    if (!poststed && !postnummer && !adresselinje1) {
        return undefined;
    }

    return `${formaterAdresse(adresselinje1)}, ${postnummer} ${formaterAdresse(poststed)}`;
};

const formaterAdresse = (input: string | null): string | null => {
    return !input ? null : input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};

const formaterNavn = (kandidat: KandidatTilStillingssøk) => {
    const fornavn = brukStorForbokstav(kandidat.fornavn);
    const etternavn = brukStorForbokstav(kandidat.etternavn);

    return `${fornavn} ${etternavn}`;
};

export default Kandidatbanner;
