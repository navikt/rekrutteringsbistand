import { ReactNode } from 'react';
import CvType, { Sertifikat as SertifikatType } from '../reducer/cv-typer';
import { BodyShort, Heading, Panel } from '@navikt/ds-react';
import {
    Buldings2Icon,
    PinIcon,
    ClockIcon,
    TimerStartIcon,
    HourglassIcon,
} from '@navikt/aksel-icons';
import sortByDato from '../../cv/sortByDato';
import Arbeidserfaring from './Arbeidserfaring';
import css from './Cv.module.css';

const oppstartskoder = {
    LEDIG_NAA: { key: 'LEDIG_NAA', label: 'Nå' },
    ETTER_TRE_MND: { key: 'ETTER_TRE_MND', label: '3 måneders oppsigelse' },
    ETTER_AVTALE: { key: 'ETTER_AVTALE', label: 'Etter avtale' },
};

type Props = {
    cv: CvType;
};

const Cv = ({ cv }: Props) => {
    const autorisasjoner = cv.fagdokumentasjon?.filter((f) => f.type !== 'Autorisasjon') ?? [];

    return (
        <Panel border className={css.panel}>
            <Heading level="2" size="small" className={css.panelOverskrift}>
                <div className={css.overskriftMedIkon}>
                    <div className={css.ikonRamme}>
                        <Buldings2Icon />
                    </div>
                    Erfaring
                </div>
            </Heading>

            {cv.yrkeserfaring?.length > 0 && (
                <BolkMedErfaringer tittel="Arbeidserfaring">
                    {sortByDato(cv.yrkeserfaring).map((erfaring) => (
                        <Arbeidserfaring
                            key={`${erfaring.styrkKode}-${erfaring.fraDato}`}
                            arbeidserfaring={erfaring}
                        />
                    ))}
                </BolkMedErfaringer>
            )}

            <BodyShort size="small" className={css.uthevet}>
                <MangeTekstelementerSeparertMedKomma
                    elementer={cv.yrkeJobbonsker.map((j) => j.styrkBeskrivelse)}
                />
            </BodyShort>
            <BodyShort size="small" className={css.kompetanse}>
                <MangeTekstelementerSeparertMedKomma
                    elementer={cv.kompetanse.map((u) => u.kompetanseKodeTekst)}
                />
            </BodyShort>
        </Panel>
    );
};

const BolkMedErfaringer = ({ tittel, children }: { tittel: string; children: ReactNode }) => (
    <div className={css.erfaring}>
        <div className={css.erfaringer}>{children}</div>
    </div>
);

const Erfaring = () => {
    return (
        <div className={css.erfaring}>
            <BodyShort size="small" className={css.uthevet}>
                {}
            </BodyShort>
        </div>
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

export default Cv;
