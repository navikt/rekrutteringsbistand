import { LanguageIcon } from '@navikt/aksel-icons';
import Kort from '../kort/Kort';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import Språkferdighet from './språkferdighet/Språkferdighet';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';

type Props = {
    cv: KandidatCv;
};

const Språk = ({ cv }: Props) => {
    return cv.sprakferdigheter?.length > 0 ? (
        <Kort overskrift={'Språk'} ikon={<LanguageIcon />}>
            <div className={css.erfaringer}>
                {cv.sprakferdigheter.map((ferdighet) => {
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
        </Kort>
    ) : null;
};

export default Språk;
