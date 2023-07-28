import { LanguageIcon } from '@navikt/aksel-icons';
import CvTyper from '../reducer/cv-typer';
import Kort from '../kort/Kort';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import Språkferdighet from './språkferdighet/Språkferdighet';

type Props = {
    cv: CvTyper;
};

const Språk = ({ cv }: Props) => {
    return (
        <Kort
            overskrift={'Språk'}
            ikon={<LanguageIcon />}
            innhold={
                <div className={css.erfaringer}>
                    {cv.sprakferdigheter?.length > 0 &&
                        cv.sprakferdigheter.map((ferdighet) => {
                            return (
                                <Erfaring
                                    key={`${ferdighet.sprak}${ferdighet.ferdighetMuntlig}${ferdighet.ferdighetSkriftlig}`}
                                    overskrift={ferdighet.sprak}
                                    beskrivelse={<Språkferdighet ferdighet={ferdighet} />}
                                    tidsperiode={null}
                                />
                            );
                        })}
                </div>
            }
        />
    );
};

export default Språk;
