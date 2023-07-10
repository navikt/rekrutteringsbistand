import BrukStandardsøk from './standardsøk/BrukStandardsøk';
import Inkludering from './inkludering/Inkludering';
import Søkefelt from './søkefelt/Søkefelt';
import FylkerOgKommuner from './geografi/FylkerOgKommuner';
import css from './Filter.module.css';
import Annonsestatus from './om-annonsen/Annonsestatus';
import HvorErAnnonsenPublisert from './om-annonsen/HvorErAnnonsenPublisert';
import VelgStillingskategori from './om-annonsen/VelgStillingskategori';

type Props = {
    fnr?: string;
};

const Filter = ({ fnr }: Props) => {
    return (
        <div className={css.filter}>
            <Søkefelt />
            {fnr === undefined && <BrukStandardsøk />}
            <Annonsestatus />
            <FylkerOgKommuner />
            <Inkludering />
            <VelgStillingskategori />
            <HvorErAnnonsenPublisert />
        </div>
    );
};

export default Filter;
