import {
    CandleIcon,
    EnvelopeClosedIcon,
    PersonIcon,
    PhoneIcon,
    PinIcon,
} from '@navikt/aksel-icons';
import { BodyShort, CopyButton, Heading, Skeleton } from '@navikt/ds-react';
import { KandidatTilBanner } from 'felles/domene/kandidat/Kandidat';
import { ReactComponent as Piktogram } from 'felles/komponenter/piktogrammer/minekandidater.svg';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { brukStorForbokstav } from 'felles/utils/stringUtils';
import { ReactNode } from 'react';
import Grunnbanner from '../grunnbanner/Grunnbanner';
import Brødsmulesti, { Brødsmule } from './Brødsmulesti';
import css from './Kandidatbanner.module.css';

export type Veileder = {
    navn: string;
    epost: string;
    ident: string;
};

type Props = {
    kandidat: Nettressurs<KandidatTilBanner>;
    veileder?: Veileder;
    brødsmulesti?: Brødsmule[];
    øverstTilHøyre?: ReactNode;
    nederstTilHøyre?: ReactNode;
    heltNederst?: ReactNode;
};

const Kandidatbanner = ({
    kandidat,
    veileder,
    brødsmulesti,
    nederstTilHøyre,
    øverstTilHøyre,
}: Props) => {
    return (
        <Grunnbanner ikon={<Piktogram />}>
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

                    {kandidat.kind === Nettstatus.FinnesIkke && (
                        <Heading size="large">Fant ikke kandidaten</Heading>
                    )}

                    {kandidat.kind === Nettstatus.Feil && (
                        <Heading size="large">{kandidat.error.message}</Heading>
                    )}

                    <div className={css.bunnlinje}>
                        {kandidat.kind === Nettstatus.FinnesIkke && (
                            <div className={css.personalia}>
                                Kandidaten er ikke tilgjengelig i Rekrutteringsbistand
                            </div>
                        )}

                        {kandidat.kind === Nettstatus.LasterInn && (
                            <div className={css.personalia}>
                                <div>
                                    <CandleIcon />
                                    <Skeleton width={180} />
                                </div>
                                <div>
                                    <PinIcon />
                                    <Skeleton width={240} />
                                </div>
                                <div>
                                    <EnvelopeClosedIcon />
                                    <Skeleton width={100} />
                                </div>
                                <div>
                                    <PhoneIcon />
                                    <Skeleton width={100} />
                                </div>
                                <div>
                                    <PersonIcon />
                                    <Skeleton width={100} />
                                </div>
                            </div>
                        )}

                        {kandidat.kind === Nettstatus.Suksess && (
                            <div className={css.personalia}>
                                <BodyShort aria-label="Fødselsdato">
                                    <CandleIcon title="Fødselsdato" aria-hidden />
                                    {lagFødselsdagtekst(kandidat.data.fodselsdato)} (
                                    {kandidat.data.fodselsnummer})
                                </BodyShort>

                                <BodyShort aria-label="Adresse">
                                    <PinIcon title="Adresse" aria-hidden />
                                    {hentAdresse(kandidat.data) ?? '-'}
                                </BodyShort>

                                <BodyShort aria-label="E-post">
                                    <EnvelopeClosedIcon title="E-post" aria-hidden />
                                    {kandidat.data.epostadresse ?? '-'}
                                    {kandidat.data.epostadresse && (
                                        <CopyButton
                                            size="small"
                                            title="Kopier e-postadresse"
                                            className={css.kopieringsknapp}
                                            copyText={kandidat.data.epostadresse}
                                        />
                                    )}
                                </BodyShort>

                                <BodyShort aria-label="Telefon">
                                    <PhoneIcon title="Telefon" aria-hidden />
                                    {kandidat.data.telefon ?? '-'}
                                </BodyShort>

                                {veileder ? (
                                    <BodyShort aria-label="Veileder">
                                        <PersonIcon title="Veileder" aria-hidden />
                                        {veileder.ident ? (
                                            <>
                                                <span>
                                                    Veileder: {veileder.navn} (
                                                    {veileder.ident?.toUpperCase()}){' '}
                                                    {veileder.epost}
                                                </span>
                                                <CopyButton
                                                    size="small"
                                                    title="Kopier e-postadresse"
                                                    className={css.kopieringsknapp}
                                                    copyText={veileder.epost}
                                                />
                                            </>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </BodyShort>
                                ) : (
                                    <BodyShort aria-label="Veileder">
                                        <PersonIcon title="Veileder" aria-hidden />
                                        {kandidat.data.veileder ?? '-'}
                                    </BodyShort>
                                )}
                            </div>
                        )}

                        {nederstTilHøyre && (
                            <div className={css.nederstTilHøyre}>{nederstTilHøyre}</div>
                        )}
                    </div>
                </div>
            </div>
        </Grunnbanner>
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
