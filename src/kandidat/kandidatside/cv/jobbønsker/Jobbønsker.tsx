import { BodyShort } from '@navikt/ds-react';
import { HeartIcon, PinIcon, ClockIcon, TimerStartIcon, HourglassIcon } from '@navikt/aksel-icons';
import css from './Jobbønsker.module.css';
import Kort from '../kort/Kort';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';

const oppstartskoder = {
    LEDIG_NAA: { key: 'LEDIG_NAA', label: 'Nå' },
    ETTER_TRE_MND: { key: 'ETTER_TRE_MND', label: '3 måneders oppsigelse' },
    ETTER_AVTALE: { key: 'ETTER_AVTALE', label: 'Etter avtale' },
};

type Props = {
    cv: KandidatCv;
};

const Jobbønsker = ({ cv }: Props) => {
    return (
        <Kort
            overskrift={'Ønsker'}
            ikon={<HeartIcon />}
            innhold={
                <div className={css.innhold}>
                    <BodyShort size="medium" className={css.jobbønsker}>
                        {cv.yrkeJobbonsker?.length > 0 ? (
                            <MangeTekstelementerSeparertMedKomma
                                elementer={cv.yrkeJobbonsker.map((j) => j.styrkBeskrivelse)}
                            />
                        ) : (
                            '-'
                        )}
                    </BodyShort>
                    <BodyShort size="small" className={css.kompetanse}>
                        {cv.kompetanse?.length > 0 ? (
                            <MangeTekstelementerSeparertMedKomma
                                elementer={cv.kompetanse.map((u) => u.kompetanseKodeTekst)}
                            />
                        ) : (
                            '-'
                        )}
                    </BodyShort>
                    <div className={css.bunn}>
                        <BodyShort size="small" className={css.uthevetTekstOgIkon}>
                            <PinIcon />
                            {cv.geografiJobbonsker?.length > 0 ? (
                                <MangeTekstelementerSeparertMedMellomrom
                                    elementer={cv.geografiJobbonsker.map(
                                        (u) => u.geografiKodeTekst
                                    )}
                                />
                            ) : (
                                '-'
                            )}
                        </BodyShort>
                        <BodyShort size="small" className={css.uthevetTekstOgIkon}>
                            <ClockIcon />
                            {cv.omfangJobbprofil?.length > 0 ? (
                                <MangeTekstelementerSeparertMedOg
                                    elementer={cv.omfangJobbprofil.map(
                                        (u) => u.heltidDeltidKodeTekst
                                    )}
                                />
                            ) : (
                                '-'
                            )}
                        </BodyShort>
                        <BodyShort size="small" className={css.uthevetTekstOgIkon}>
                            <TimerStartIcon />
                            {cv.arbeidstidJobbprofil?.length > 0 ? (
                                <MangeTekstelementerSeparertMedOg
                                    elementer={cv.arbeidstidJobbprofil.map(
                                        (u) => u.arbeidstidKodeTekst
                                    )}
                                />
                            ) : (
                                '-'
                            )}
                        </BodyShort>
                        <BodyShort size="small" className={css.uthevetTekstOgIkon}>
                            <HourglassIcon />
                            {cv.oppstartKode ? (
                                <MangeTekstelementerSeparertMedKomma
                                    elementer={[oppstartskoder[cv.oppstartKode]?.label]}
                                />
                            ) : (
                                '-'
                            )}
                        </BodyShort>
                    </div>
                </div>
            }
        />
    );
};

export const MangeTekstelementerSeparertMedKomma = ({
    elementer,
}: {
    elementer: Array<string | null>;
}) => {
    return (
        <span>
            {elementer
                .filter((e) => e !== null)
                .map((element) => element)
                .join(', ')}
        </span>
    );
};

const MangeTekstelementerSeparertMedOg = ({ elementer }: { elementer: Array<string | null> }) => {
    return (
        <span>
            {elementer
                .filter((e) => e !== null)
                .map((element) => element)
                .join(' og ')}
        </span>
    );
};

const MangeTekstelementerSeparertMedMellomrom = ({
    elementer,
}: {
    elementer: Array<string | null>;
}) => {
    return (
        <span>
            {elementer
                .filter((e) => e !== null)
                .map((element) => element)
                .join(' ')}
        </span>
    );
};

export default Jobbønsker;
