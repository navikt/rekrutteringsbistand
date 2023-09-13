import { BagdeIcon } from '@navikt/aksel-icons';
import Kort from './kort/Kort';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import Kandidat from 'felles/domene/kandidat/Kandidat';

type Props = {
    cv: Kandidat;
};

const Fagbrev = ({ cv }: Props) => {
    const autorisasjoner = cv.fagdokumentasjon?.filter((f) => f.type !== 'Autorisasjon') ?? [];

    return autorisasjoner?.length > 0 ? (
        <Kort overskrift={'Fagbrev/svennebrev og mesterbrev'} ikon={<BagdeIcon />}>
            <div className={css.erfaringer}>
                {autorisasjoner.map(({ tittel }) => {
                    return <Erfaring key={`${tittel}`} overskrift={tittel} />;
                })}
            </div>
        </Kort>
    ) : null;
};

export default Fagbrev;
