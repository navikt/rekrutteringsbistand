import {
    BriefcaseClockIcon,
    ClockIcon,
    HeartIcon,
    PinIcon,
    TimerStartIcon,
} from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { ReactNode } from 'react';
import Kort from '../kort/Kort';
import css from './Jobbønsker.module.css';

const oppstartskoder = {
    LEDIG_NAA: { key: 'LEDIG_NAA', label: 'Nå' },
    ETTER_TRE_MND: { key: 'ETTER_TRE_MND', label: 'Om 3 måneder (oppsigelsestid)' },
    ETTER_AVTALE: { key: 'ETTER_AVTALE', label: 'Etter avtale' },
};

type Props = {
    cv: Kandidat;
};

const Jobbønsker = ({ cv }: Props) => {
    return (
        <Kort overskrift="Ønsker" ikon={<HeartIcon />}>
            <BodyShort size="medium" className={css.jobbønsker}>
                {cv.yrkeJobbonskerObj?.length > 0 ? (
                    <MangeTekstelementerSeparertMedKomma
                        elementer={cv.yrkeJobbonskerObj.map((j) => j.styrkBeskrivelse)}
                    />
                ) : (
                    'Ingen oppgitte jobbønsker'
                )}
            </BodyShort>
            <ul className={css.bunn}>
                <Jobbønskeinformasjon label="Sted" ikon={<PinIcon aria-hidden />}>
                    {cv.geografiJobbonsker?.length > 0 ? (
                        <MangeTekstelementerSeparertMedKomma
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
                    {cv.omfangJobbonskerObj?.length > 0 ? (
                        <MangeTekstelementerSeparertMedOg
                            elementer={cv.omfangJobbonskerObj.map((u) => u.omfangKodeTekst)}
                        />
                    ) : (
                        'Ikke oppgitt'
                    )}
                </Jobbønskeinformasjon>
                <Jobbønskeinformasjon label="Arbeidstid" ikon={<ClockIcon aria-hidden />}>
                    {cv.arbeidstidJobbonskerObj?.length > 0 ? (
                        <MangeTekstelementerSeparertMedOg
                            elementer={cv.arbeidstidJobbonskerObj.map((u) => u.arbeidstidKodeTekst)}
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

export default Jobbønsker;
