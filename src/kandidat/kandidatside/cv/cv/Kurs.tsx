import { ClipboardIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { Kurs as Kurstype, Omfangenhet } from 'felles/domene/kandidat/Cv';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { formaterDatoHvisIkkeNull } from '../../../utils/dateUtils';
import css from './Cv.module.css';
import Detaljer from './detaljer/Detaljer';
import Erfaring from './erfaring/Erfaring';
import Kort from './kort/Kort';
import sortByDato from './sortByDato';

type Props = {
    cv: Kandidat;
};

const Kurs = ({ cv }: Props) => {
    return cv.kursObj?.length > 0 ? (
        <Kort overskrift={'Kurs'} ikon={<ClipboardIcon />}>
            <div className={css.erfaringer}>
                {sortByDato(cv.kursObj).map((kurs) => (
                    <Erfaring
                        key={`${kurs.tittel}-${kurs.fraDato}`}
                        overskrift={kurs.tittel}
                        detaljer={<TidsperiodeKurs kurs={kurs} />}
                    />
                ))}
            </div>
        </Kort>
    ) : null;
};

const TidsperiodeKurs = ({ kurs }: { kurs: Kurstype }) => {
    if (kurs.fraDato && kurs.omfangEnhet.length > 0 && kurs.omfangVerdi > 0) {
        return (
            <Detaljer>
                <BodyShort size="small" className={css.tekst}>
                    Fullført {formaterDatoHvisIkkeNull(kurs.fraDato)}
                </BodyShort>
                <BodyShort size="small" className={css.tekst}>
                    {hentKursvarighet(kurs.omfangEnhet, kurs.omfangVerdi)}
                </BodyShort>
            </Detaljer>
        );
    } else if (kurs.fraDato && (kurs.omfangEnhet.length === 0 || kurs.omfangVerdi === 0)) {
        return (
            <BodyShort size="small" className={css.tekst}>
                Fullført {formaterDatoHvisIkkeNull(kurs.fraDato)}
            </BodyShort>
        );
    } else if (!kurs.fraDato && kurs.omfangEnhet.length > 0 && kurs.omfangVerdi > 0) {
        return (
            <BodyShort size="small" className={css.tekst}>
                {hentKursvarighet(kurs.omfangEnhet, kurs.omfangVerdi)}
            </BodyShort>
        );
    } else {
        return null;
    }
};

const hentKursvarighet = (omfangEnhet: string, omfangVerdi: number) => {
    switch (omfangEnhet) {
        case Omfangenhet.Time:
            return `${omfangVerdi} ${omfangVerdi > 1 ? 'timer' : 'time'}`;
        case Omfangenhet.Dag:
            return `${omfangVerdi} ${omfangVerdi > 1 ? 'dager' : 'dag'}`;
        case Omfangenhet.Uke:
            return `${omfangVerdi} ${omfangVerdi > 1 ? 'uker' : 'uke'}`;
        case Omfangenhet.Måned:
            return `${omfangVerdi} ${omfangVerdi > 1 ? 'måneder' : 'måned'}`;
        default:
            return '';
    }
};

export default Kurs;
