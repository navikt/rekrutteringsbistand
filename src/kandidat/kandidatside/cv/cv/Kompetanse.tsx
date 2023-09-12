import { PersonRectangleIcon } from '@navikt/aksel-icons';
import Kort from './kort/Kort';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { MangeTekstelementerSeparertMedKomma } from './jobbønsker/Jobbønsker';

type Props = {
    cv: Kandidat;
};

const Kompetanse = ({ cv }: Props) => {
    return cv.kompetanseObj?.length > 0 ? (
        <Kort overskrift={'Kompetanse'} ikon={<PersonRectangleIcon />}>
            <div className={css.erfaringer}>
                <Erfaring
                    beskrivelse={
                        <MangeTekstelementerSeparertMedKomma
                            elementer={cv.kompetanseObj.map((u) => u.kompetanseKodeTekst)}
                        />
                    }
                />
            </div>
        </Kort>
    ) : null;
};

export default Kompetanse;
