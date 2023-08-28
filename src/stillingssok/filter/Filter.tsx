import css from './Filter.module.css';
import FylkerOgKommuner from './geografi/FylkerOgKommuner';
import Inkludering from './inkludering/Inkludering';
import Annonsestatus from './om-annonsen/Annonsestatus';
import HvorErAnnonsenPublisert from './om-annonsen/HvorErAnnonsenPublisert';
import VelgStillingskategori from './om-annonsen/VelgStillingskategori';
import BrukStandardsøk from './standardsøk/BrukStandardsøk';
import Søkefelt from './søkefelt/Søkefelt';

type Props = {
    visStandardsøk: boolean;
    visStatusfilter: boolean;
};

const Filter = ({ visStandardsøk, visStatusfilter }: Props) => {
    return (
        <div className={css.filter}>
            <Søkefelt />
            {visStandardsøk && <BrukStandardsøk />}
            <div className={css.filtercheckbokser}>
                {visStatusfilter && <Annonsestatus />}
                <FylkerOgKommuner />
                <Inkludering />
                <VelgStillingskategori />
                <HvorErAnnonsenPublisert />
            </div>
        </div>
    );
};

export default Filter;
