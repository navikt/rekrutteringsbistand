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
import { brukStorForbokstav } from 'felles/utils/stringUtils';
import { ReactNode } from 'react';
import Grunnbanner from '../grunnbanner/Grunnbanner';
import Brødsmulesti, { Brødsmule } from './Brødsmulesti';
import css from './Kandidatbanner.module.css';
import useKandidatsammendrag from './useKandidatsammendrag';

export type Veileder = {
    navn: string;
    epost: string;
    ident: string;
};

type Props = {
    kandidatnr: string;
    brødsmulesti?: Brødsmule[];
    øverstTilHøyre?: ReactNode;
    nederstTilHøyre?: ReactNode;
    nederst?: ReactNode;
};

const Kandidatbanner = ({
    brødsmulesti,
    nederstTilHøyre,
    øverstTilHøyre,
    nederst,
    kandidatnr,
}: Props) => {
    const { kandidatsammendrag, error, isLoading } = useKandidatsammendrag(kandidatnr);
    return (
        <Grunnbanner ikon={<Piktogram />} nederst={nederst}>
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

                    {!kandidatsammendrag && (
                        <Skeleton>
                            <Heading size="large">Placeholder</Heading>
                        </Skeleton>
                    )}

                    {kandidatsammendrag && (
                        <Heading size="large" level="2">
                            {formaterNavn(kandidatsammendrag)}
                        </Heading>
                    )}

                    {error?.message === '404' && (
                        <Heading size="large">Fant ikke kandidaten</Heading>
                    )}

                    {error?.message && error.message !== '404' && (
                        <Heading size="large">{kandidatsammendrag.message}</Heading>
                    )}

                    <div className={css.bunnlinje}>
                        {error?.message === '404' && (
                            <div className={css.personalia}>
                                Kandidaten er ikke tilgjengelig i Rekrutteringsbistand
                            </div>
                        )}

                        {isLoading && (
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

                        {kandidatsammendrag && (
                            <div className={css.personalia}>
                                <BodyShort aria-label="Fødselsdato">
                                    <CandleIcon title="Fødselsdato" aria-hidden />
                                    {lagFødselsdagtekst(kandidatsammendrag.fodselsdato)} (
                                    {kandidatsammendrag.fodselsnummer})
                                </BodyShort>

                                <BodyShort aria-label="Adresse">
                                    <PinIcon title="Adresse" aria-hidden />
                                    {hentAdresse(kandidatsammendrag) ?? '-'}
                                </BodyShort>

                                <BodyShort aria-label="E-post">
                                    <EnvelopeClosedIcon title="E-post" aria-hidden />
                                    {kandidatsammendrag.epostadresse ?? '-'}
                                    {kandidatsammendrag.epostadresse && (
                                        <CopyButton
                                            size="small"
                                            title="Kopier e-postadresse"
                                            className={css.kopieringsknapp}
                                            copyText={kandidatsammendrag.epostadresse}
                                        />
                                    )}
                                </BodyShort>

                                <BodyShort aria-label="Telefon">
                                    <PhoneIcon title="Telefon" aria-hidden />
                                    {kandidatsammendrag.telefon ?? '-'}
                                </BodyShort>

                                <BodyShort aria-label="Veileder">
                                    <PersonIcon title="Veileder" aria-hidden />
                                    {kandidatsammendrag.veilederIdent ? (
                                        <>
                                            <span>
                                                Veileder: {kandidatsammendrag.veilederVisningsnavn}{' '}
                                                ({kandidatsammendrag.veilederIdent?.toUpperCase()}){' '}
                                                {kandidatsammendrag.veilederEpost}
                                            </span>
                                            <CopyButton
                                                size="small"
                                                title="Kopier e-postadresse"
                                                className={css.kopieringsknapp}
                                                copyText={kandidatsammendrag.veilederEpost}
                                            />
                                        </>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </BodyShort>
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
