import { PersonRectangleIcon } from '@navikt/aksel-icons';
import Kort from '../kort/Kort';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import { MangeTekstelementerSeparertMedKomma } from '../jobbønsker/Jobbønsker';

type Props = {
    cv: KandidatCv;
};

const Kompetanse = ({ cv }: Props) => {
    return cv.kompetanse?.length > 0 ? (
        <Kort overskrift={'Kompetanse'} ikon={<PersonRectangleIcon />}>
            <div className={css.erfaringer}>
                <Erfaring
                    beskrivelse={
                        <MangeTekstelementerSeparertMedKomma
                            elementer={cv.kompetanse.map((u) => u.kompetanseKodeTekst)}
                        />
                    }
                />
            </div>
        </Kort>
    ) : null;
};

export default Kompetanse;
