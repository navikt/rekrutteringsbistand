import { BagdeIcon } from '@navikt/aksel-icons';
import Kort from '../kort/Kort';
import css from './Cv.module.css';
import Erfaring from './erfaring/Erfaring';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';

type Props = {
    cv: KandidatCv;
};

const Fagbrev = ({ cv }: Props) => {
    const autorisasjoner = cv.fagdokumentasjon?.filter((f) => f.type !== 'Autorisasjon') ?? [];

    return autorisasjoner?.length > 0 ? (
        <Kort
            overskrift={'Fagbrev/svennebrev og mesterbrev'}
            ikon={<BagdeIcon />}
            innhold={
                <div className={css.erfaringer}>
                    {autorisasjoner.map(({ tittel }) => {
                        return (
                            <Erfaring
                                key={`${tittel}`}
                                overskrift={tittel}
                                beskrivelse={null}
                                tidsperiode={null}
                            />
                        );
                    })}
                </div>
            }
        />
    ) : null;
};

export default Fagbrev;
