import {
    CandleIcon,
    EnvelopeClosedIcon,
    PersonIcon,
    PhoneIcon,
    PinIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Heading, Skeleton } from '@navikt/ds-react';
import { KandidatTilBanner } from 'felles/domene/kandidat/Kandidat';
import { ReactComponent as Piktogram } from 'felles/komponenter/piktogrammer/minekandidater.svg';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { brukStorForbokstav } from 'felles/utils/stringUtils';
import { ReactNode } from 'react';
import Brødsmulesti, { Brødsmule } from './Brødsmulesti';
import css from './Kandidatbanner.module.css';

type Props = {
    kandidat: Nettressurs<KandidatTilBanner>;
    brødsmulesti?: Brødsmule[];
    øverstTilHøyre?: ReactNode;
    nederstTilHøyre?: ReactNode;
};

const Kandidatbanner = ({ kandidat, brødsmulesti, nederstTilHøyre, øverstTilHøyre }: Props) => {
    return (
        <div className={css.banner}>
            <div className={css.piktogramOgInnhold}>
                <Piktogram className={css.piktogram} />

                <div className={css.innhold}>
                    <div className={css.hovedinnhold}>
                        <div className={css.topplinje}>
                            {brødsmulesti ? (
                                <Brødsmulesti brødsmulesti={brødsmulesti} />
                            ) : (
                                <Skeleton width={220} />
                            )}
                            {øverstTilHøyre}
                        </div>
                        {kandidat.kind === Nettstatus.LasterInn && (
                            <Skeleton>
                                <Heading size="large">Placeholder</Heading>
                            </Skeleton>
                        )}
                        {kandidat.kind === Nettstatus.Suksess && (
                            <Heading size="large" level="2">
                                {formaterNavn(kandidat.data)}
                            </Heading>
                        )}
                        {kandidat.kind === Nettstatus.Feil && (
                            <Heading size="large">{kandidat.error.message}</Heading>
                        )}

                        {kandidat.kind !== Nettstatus.Feil && (
                            <div className={css.bunnlinje}>
                                <div className={css.personalia}>
                                    <BodyShort>
                                        <CandleIcon />{' '}
                                        {kandidat.kind === Nettstatus.Suksess ? (
                                            `${lagFødselsdagtekst(kandidat.data.fodselsdato)} (${
                                                kandidat.data.fodselsnummer
                                            }) `
                                        ) : (
                                            <Skeleton width={180} />
                                        )}
                                    </BodyShort>

                                    <BodyShort>
                                        <PinIcon />{' '}
                                        {kandidat.kind === Nettstatus.Suksess ? (
                                            hentAdresse(kandidat.data) ?? '-'
                                        ) : (
                                            <Skeleton width={240} />
                                        )}
                                    </BodyShort>

                                    <BodyShort>
                                        <EnvelopeClosedIcon />
                                        {kandidat.kind === Nettstatus.Suksess ? (
                                            kandidat.data.epostadresse?.toLowerCase() ?? '-'
                                        ) : (
                                            <Skeleton width={100} />
                                        )}
                                    </BodyShort>

                                    <BodyShort>
                                        <PhoneIcon />
                                        {kandidat.kind === Nettstatus.Suksess ? (
                                            kandidat.data.telefon ?? '-'
                                        ) : (
                                            <Skeleton width={100} />
                                        )}
                                    </BodyShort>

                                    <BodyShort>
                                        <PersonIcon />
                                        {kandidat.kind === Nettstatus.Suksess ? (
                                            kandidat.data.veileder ? (
                                                `${kandidat.data.veileder.toUpperCase()} (Veileder)`
                                            ) : (
                                                '-'
                                            )
                                        ) : (
                                            <Skeleton width={100} />
                                        )}
                                    </BodyShort>
                                </div>
                                <div className={css.nederstTilHøyre}>{nederstTilHøyre}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const lagFødselsdagtekst = (inputdato?: string | null) => {
    if (!inputdato) return '-';

    const iDag = new Date();
    const fødselsdag = new Date(inputdato);
    fødselsdag.setTime(fødselsdag.getTime() + 1 * 60 * 60 * 1000); // For å unngå tidssonetrøbbel ved indeksering. Krever at tidspunkt på dag ikke brukes videre.

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

const hentAdresse = (kandidat: KandidatTilBanner) => {
    const { poststed, postnummer, adresselinje1 } = kandidat;

    if (!poststed && !postnummer && !adresselinje1) {
        return undefined;
    }

    return `${formaterAdresse(adresselinje1)}, ${postnummer} ${formaterAdresse(poststed)}`;
};

const formaterAdresse = (input: string | null): string | null => {
    return !input ? null : input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};

export const formaterNavn = (kandidat: KandidatTilBanner) => {
    const fornavn = brukStorForbokstav(kandidat.fornavn);
    const etternavn = brukStorForbokstav(kandidat.etternavn);

    return `${fornavn} ${etternavn}`;
};

export default Kandidatbanner;
