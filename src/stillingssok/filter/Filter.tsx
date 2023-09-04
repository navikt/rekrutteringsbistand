import css from './Filter.module.css';
import FylkerOgKommuner from './geografi/FylkerOgKommuner';
import Inkludering from './inkludering/Inkludering';
import Annonsestatus from './om-annonsen/Annonsestatus';
import HvorErAnnonsenPublisert from './om-annonsen/HvorErAnnonsenPublisert';
import VelgStillingskategori from './om-annonsen/VelgStillingskategori';
import BrukStandardsøk from './standardsøk/BrukStandardsøk';
import Søkefelt from './søkefelt/Søkefelt';

type Props = {
    finnerStillingForKandidat: boolean;
};

const Filter = ({ finnerStillingForKandidat }: Props) => {
    return (
        <div className={css.filter}>
            <Søkefelt />
            {!finnerStillingForKandidat && <BrukStandardsøk />}
            <div className={css.filtercheckbokser}>
                {!finnerStillingForKandidat && <Annonsestatus />}
                <FylkerOgKommuner />
                <Inkludering />
                {!finnerStillingForKandidat && <VelgStillingskategori />}
                <HvorErAnnonsenPublisert />
            </div>
        </div>
    );
};

export default Filter;
