import { BodyShort } from '@navikt/ds-react';
import { ClockIcon, HeartIcon, HourglassIcon, PinIcon, TimerStartIcon } from '@navikt/aksel-icons';
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
        <Kort overskrift="Ønsker" ikon={<HeartIcon />}>
            <BodyShort size="medium" className={css.jobbønsker}>
                {cv.yrkeJobbonsker?.length > 0 ? (
                    <MangeTekstelementerSeparertMedKomma
                        elementer={cv.yrkeJobbonsker.map((j) => j.styrkBeskrivelse)}
                    />
                ) : (
                    '-'
                )}
            </BodyShort>
            <ul className={css.bunn}>
                <BodyShort as="li" size="small" aria-label="Ønsket sted">
                    <PinIcon aria-hidden />
                    {cv.geografiJobbonsker?.length > 0 ? (
                        <MangeTekstelementerSeparertMedMellomrom
                            elementer={cv.geografiJobbonsker.map((u) => u.geografiKodeTekst)}
                        />
                    ) : (
                        '-'
                    )}
                </BodyShort>
                <BodyShort as="li" size="small" aria-label="Omfang">
                    <ClockIcon aria-hidden />
                    {cv.omfangJobbprofil?.length > 0 ? (
                        <MangeTekstelementerSeparertMedOg
                            elementer={cv.omfangJobbprofil.map((u) => u.heltidDeltidKodeTekst)}
                        />
                    ) : (
                        '-'
                    )}
                </BodyShort>
                <BodyShort as="li" size="small" aria-label="Arbeidstid">
                    <TimerStartIcon aria-hidden />
                    {cv.arbeidstidJobbprofil?.length > 0 ? (
                        <MangeTekstelementerSeparertMedOg
                            elementer={cv.arbeidstidJobbprofil.map((u) => u.arbeidstidKodeTekst)}
                        />
                    ) : (
                        '-'
                    )}
                </BodyShort>
                <BodyShort as="li" size="small" aria-label="Oppstart">
                    <HourglassIcon aria-hidden />
                    {cv.oppstartKode ? (
                        <MangeTekstelementerSeparertMedKomma
                            elementer={[oppstartskoder[cv.oppstartKode]?.label]}
                        />
                    ) : (
                        '-'
                    )}
                </BodyShort>
            </ul>
        </Kort>
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
