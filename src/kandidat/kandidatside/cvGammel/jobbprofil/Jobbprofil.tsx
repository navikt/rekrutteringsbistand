import Cv from '../reducer/cv-typer';
import { BodyShort, Heading, Panel } from '@navikt/ds-react';
import { HeartIcon, PinIcon, ClockIcon, TimerStartIcon, HourglassIcon } from '@navikt/aksel-icons';
import css from './Jobbprofil.module.css';

const oppstartskoder = {
    LEDIG_NAA: { key: 'LEDIG_NAA', label: 'Nå' },
    ETTER_TRE_MND: { key: 'ETTER_TRE_MND', label: '3 måneders oppsigelse' },
    ETTER_AVTALE: { key: 'ETTER_AVTALE', label: 'Etter avtale' },
};

type Props = {
    cv: Cv;
};

const Jobbprofil = ({ cv }: Props) => {
    return (
        <Panel border className={css.panel}>
            <Heading level="2" size="small" className={css.panelOverskrift}>
                <div className={css.overskriftMedIkon}>
                    <div className={css.ikonRamme}>
                        <HeartIcon />
                    </div>
                    Ønsker
                </div>
            </Heading>
            <BodyShort size="medium" className={css.jobbønsker}>
                <MangeTekstelementerSeparertMedKomma
                    elementer={cv.yrkeJobbonsker.map((j) => j.styrkBeskrivelse)}
                />
            </BodyShort>
            <BodyShort size="small" className={css.kompetanse}>
                <MangeTekstelementerSeparertMedKomma
                    elementer={cv.kompetanse.map((u) => u.kompetanseKodeTekst)}
                />
            </BodyShort>
            <div className={css.bunn}>
                <BodyShort size="small" className={css.uthevetTekstOgIkon}>
                    <PinIcon />
                    <MangeTekstelementerSeparertMedMellomrom
                        elementer={cv.geografiJobbonsker.map((u) => u.geografiKodeTekst)}
                    />
                </BodyShort>
                <BodyShort size="small" className={css.uthevetTekstOgIkon}>
                    <ClockIcon />
                    <MangeTekstelementerSeparertMedOg
                        elementer={cv.omfangJobbprofil.map((u) => u.heltidDeltidKodeTekst)}
                    />
                </BodyShort>
                <BodyShort size="small" className={css.uthevetTekstOgIkon}>
                    <TimerStartIcon />
                    <MangeTekstelementerSeparertMedOg
                        elementer={cv.arbeidstidJobbprofil.map((u) => u.arbeidstidKodeTekst)}
                    />
                </BodyShort>
                <BodyShort size="small" className={css.uthevetTekstOgIkon}>
                    <HourglassIcon />
                    <MangeTekstelementerSeparertMedKomma
                        elementer={[oppstartskoder[cv.oppstartKode.toUpperCase()]?.label]}
                    />
                </BodyShort>
            </div>
        </Panel>
    );
};

const MangeTekstelementerSeparertMedKomma = ({
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

export default Jobbprofil;
