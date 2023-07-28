import { ClipboardIcon } from '@navikt/aksel-icons';
import css from './Cv.module.css';
import CvTyper, { Omfang, Omfangenhet } from '../reducer/cv-typer';
import Kort from '../kort/Kort';
import sortByDato from '../tidsperiode/sortByDato';
import Erfaring from './erfaring/Erfaring';

type Props = {
    cv: CvTyper;
};

const Kurs = ({ cv }: Props) => {
    return (
        <Kort
            overskrift={'Kurs'}
            ikon={<ClipboardIcon />}
            innhold={
                <div className={css.erfaringer}>
                    {cv.kurs?.length > 0 &&
                        sortByDato(cv.kurs).map((kurs) => (
                            <Erfaring
                                key={`${kurs.tittel}-${kurs.fraDato}`}
                                overskrift={kurs.tittel}
                                beskrivelse={hentKursvarighet(kurs.omfang)}
                                tidsperiode={null}
                            />
                        ))}
                </div>
            }
        />
    );
};

const hentKursvarighet = (omfang: Omfang) => {
    switch (omfang.enhet) {
        case Omfangenhet.Time:
            return `${omfang.verdi} ${omfang.verdi > 1 ? 'timer' : 'time'}`;
        case Omfangenhet.Dag:
            return `${omfang.verdi} ${omfang.verdi > 1 ? 'dager' : 'dag'}`;
        case Omfangenhet.Uke:
            return `${omfang.verdi} ${omfang.verdi > 1 ? 'uker' : 'uke'}`;
        case Omfangenhet.Måned:
            return `${omfang.verdi} ${omfang.verdi > 1 ? 'måneder' : 'måned'}`;
        default:
            return `${omfang.verdi} (mangler tidsenhet)`;
    }
};

export default Kurs;
