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
import { ReactNode } from 'react';

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
                    'Ingen oppgitte jobbønsker'
                )}
            </BodyShort>
            <ul className={css.bunn}>
                <Jobbønskeinformasjon label="Sted" ikon={<PinIcon aria-hidden />}>
                    {cv.geografiJobbonsker?.length > 0 ? (
                        <MangeTekstelementerSeparertMedMellomrom
                            elementer={cv.geografiJobbonsker.map((u) => u.geografiKodeTekst)}
                        />
                    ) : (
                        'Ikke oppgitt'
                    )}
                </Jobbønskeinformasjon>
                <Jobbønskeinformasjon
                    label="Heltid/Deltid"
                    ikon={<BriefcaseClockIcon aria-hidden />}
                >
                    {cv.omfangJobbprofil?.length > 0 ? (
                        <MangeTekstelementerSeparertMedOg
                            elementer={cv.omfangJobbprofil.map((u) => u.heltidDeltidKodeTekst)}
                        />
                    ) : (
                        'Ikke oppgitt'
                    )}
                </Jobbønskeinformasjon>
                <Jobbønskeinformasjon label="Arbeidstid" ikon={<ClockIcon aria-hidden />}>
                    {cv.arbeidstidJobbprofil?.length > 0 ? (
                        <MangeTekstelementerSeparertMedOg
                            elementer={cv.arbeidstidJobbprofil.map((u) => u.arbeidstidKodeTekst)}
                        />
                    ) : (
                        'Ikke oppgitt'
                    )}
                </Jobbønskeinformasjon>
                <Jobbønskeinformasjon label="Kan starte" ikon={<TimerStartIcon aria-hidden />}>
                    {cv.oppstartKode ? (
                        <MangeTekstelementerSeparertMedKomma
                            elementer={[oppstartskoder[cv.oppstartKode]?.label]}
                        />
                    ) : (
                        'Ikke oppgitt'
                    )}
                </Jobbønskeinformasjon>
            </ul>
        </Kort>
    );
};

const Jobbønskeinformasjon = ({
    label,
    ikon,
    children,
}: {
    label: string;
    ikon: ReactNode;
    children: ReactNode;
}) => (
    <BodyShort as="li" size="small">
        {ikon}
        <div>
            <BodyShort size="small">{label}</BodyShort>
            {children}
        </div>
    </BodyShort>
);

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
