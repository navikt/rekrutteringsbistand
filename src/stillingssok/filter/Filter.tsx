import BrukStandardsøk from './standardsøk/BrukStandardsøk';
import Inkludering from './inkludering/Inkludering';
import OmAnnonsen from './om-annonsen/OmAnnonsen';
import Søkefelt from './søkefelt/Søkefelt';
import FylkerOgKommuner from './geografi/FylkerOgKommuner';
import css from './Filter.module.css';

type Props = {
    fnr?: string;
};

const Filter = ({ fnr }: Props) => {
    return (
        <div className={css.filter}>
            <Søkefelt />
            {fnr === undefined && <BrukStandardsøk />}
            <OmAnnonsen />
            <FylkerOgKommuner />
            <Inkludering />
        </div>
    );
};

export default Filter;
