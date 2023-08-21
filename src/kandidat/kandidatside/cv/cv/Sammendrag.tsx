import { InformationIcon } from '@navikt/aksel-icons';
import Kort from './kort/Kort';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';

type Props = {
    cv: KandidatCv;
};

const Sammendrag = ({ cv }: Props) => {
    return cv.beskrivelse?.length > 0 ? (
        <Kort overskrift={'Sammendrag'} ikon={<InformationIcon />}>
            <div className={css.erfaringer}>
                <Erfaring key={`${cv.beskrivelse}`} beskrivelse={cv.beskrivelse} />
            </div>
        </Kort>
    ) : null;
};

export default Sammendrag;
