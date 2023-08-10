import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import { formaterDato } from '../../../utils/dateUtils';

type Props = {
    cv: KandidatCv;
};

const Fødselsinfo = ({ cv }: Props) =>
    cv.fodselsdato ? (
        <span>
            Fødselsdato:{' '}
            <strong>
                {formaterDato(cv.fodselsdato)} {cv.fodselsnummer && <>({cv.fodselsnummer})</>}
            </strong>
        </span>
    ) : (
        <span>
            Fødselsnummer: <strong>{cv.fodselsnummer}</strong>
        </span>
    );

export default Fødselsinfo;
