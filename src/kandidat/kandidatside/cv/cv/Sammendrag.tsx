import { InformationIcon } from '@navikt/aksel-icons';
import Kort from '../kort/Kort';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';

type Props = {
    cv: KandidatCv;
};

const Sammendrag = ({ cv }: Props) => {
    return (
        <Kort
            overskrift={'Sammendrag'}
            ikon={<InformationIcon />}
            innhold={
                <div className={css.erfaringer}>
                    {cv.beskrivelse?.length > 0 && (
                        <Erfaring
                            key={`${cv.beskrivelse}`}
                            overskrift={null}
                            beskrivelse={cv.beskrivelse}
                            tidsperiode={null}
                        />
                    )}
                </div>
            }
        />
    );
};

export default Sammendrag;
