import { ReactNode } from 'react';
import { BodyLong, BodyShort, Heading, Skeleton } from '@navikt/ds-react';
import {
    CandleIcon,
    EnvelopeClosedIcon,
    PersonIcon,
    PhoneIcon,
    PinIcon,
} from '@navikt/aksel-icons';
import { ReactComponent as Piktogram } from './minekandidater.svg';
import { brukStorForbokstav } from 'felles/utils/stringUtils';
import { EsKandidat } from 'felles/domene/kandidat/EsKandidat';
import css from './Kandidatbanner.module.css';
import BrødsmuleKomponent, { Brødsmule } from './BrødsmuleKomponent';

type Props = {
    kandidat?: EsKandidat;
    brødsmulesti?: Brødsmule[];
    toppHoyre?: ReactNode;
    bunnHoyre?: ReactNode;
};

const Kandidatbanner = ({ kandidat, brødsmulesti, bunnHoyre, toppHoyre }: Props) => {
    return (
        <div className={css.banner}>
            <div className={css.piktogramOgInnhold}>
                <Piktogram className={css.piktogram} />

                <div className={css.innhold}>
                    <div className={css.hovedinnhold}>
                        <div className={css.topplinje}>
                            <BrødsmuleKomponent brødsmulesti={brødsmulesti} />
                            <div>{toppHoyre}</div>
                        </div>
                        {!kandidat ? (
                            <BodyLong>Informasjonen om kandidaten kan ikke vises</BodyLong>
                        ) : (
                            <>
                                <Heading size="large" level="3">
                                    {formaterNavn(kandidat)}
                                </Heading>

                                <div className={css.bunnlinje}>
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
                                            {kandidat ? (
                                                hentAdresse(kandidat) ?? '-'
                                            ) : (
                                                <Skeleton width={240} />
                                            )}
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
                                            {kandidat ? (
                                                kandidat.telefon ?? '-'
                                            ) : (
                                                <Skeleton width={100} />
                                            )}
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
                                    <div className={css.bynnHoyre}>{bunnHoyre}</div>
                                </div>
                            </>
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

const hentAdresse = (kandidat?: EsKandidat) => {
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

export const formaterNavn = (kandidat: EsKandidat) => {
    const fornavn = brukStorForbokstav(kandidat.fornavn);
    const etternavn = brukStorForbokstav(kandidat.etternavn);

    return `${fornavn} ${etternavn}`;
};

export default Kandidatbanner;
