import { BodyShort } from '@navikt/ds-react';
import {
    ClockIcon,
    HeartIcon,
    TimerStartIcon,
    PinIcon,
    BriefcaseClockIcon,
} from '@navikt/aksel-icons';
import css from './Jobbønsker.module.css';
import Kort from '../kort/Kort';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';

const oppstartskoder = {
    LEDIG_NAA: { key: 'LEDIG_NAA', label: 'Nå' },
    ETTER_TRE_MND: { key: 'ETTER_TRE_MND', label: 'Om 3 måneder (oppsigelsestid)' },
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
                    <div>
                        <BodyShort size="small">Sted</BodyShort>
                        {cv.geografiJobbonsker?.length > 0 ? (
                            <MangeTekstelementerSeparertMedMellomrom
                                elementer={cv.geografiJobbonsker.map((u) => u.geografiKodeTekst)}
                            />
                        ) : (
                            '-'
                        )}
                    </div>
                </BodyShort>
                <BodyShort as="li" size="small" aria-label="Heltid/Deltid">
                    <BriefcaseClockIcon aria-hidden />
                    <div>
                        <BodyShort size="small">Heltid/Deltid</BodyShort>
                        {cv.omfangJobbprofil?.length > 0 ? (
                            <MangeTekstelementerSeparertMedOg
                                elementer={cv.omfangJobbprofil.map((u) => u.heltidDeltidKodeTekst)}
                            />
                        ) : (
                            '-'
                        )}
                    </div>
                </BodyShort>
                <BodyShort as="li" size="small" aria-label="Arbeidstid">
                    <ClockIcon aria-hidden />
                    <div>
                        <BodyShort size="small">Arbeidstid</BodyShort>
                        {cv.arbeidstidJobbprofil?.length > 0 ? (
                            <MangeTekstelementerSeparertMedOg
                                elementer={cv.arbeidstidJobbprofil.map(
                                    (u) => u.arbeidstidKodeTekst
                                )}
                            />
                        ) : (
                            '-'
                        )}
                    </div>
                </BodyShort>
                <BodyShort as="li" size="small" aria-label="Kan starte">
                    <TimerStartIcon aria-hidden />
                    <div>
                        <BodyShort size="small">Kan starte</BodyShort>
                        {cv.oppstartKode ? (
                            <MangeTekstelementerSeparertMedKomma
                                elementer={[oppstartskoder[cv.oppstartKode]?.label]}
                            />
                        ) : (
                            '-'
                        )}
                    </div>
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
