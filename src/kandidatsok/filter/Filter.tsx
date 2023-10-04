import Arbeidserfaring from './Arbeidserfaring';
import css from './Filter.module.css';
import Fritekstsøk from './Fritekstsøk';
import Førerkort from './Førerkort';
import Hovedmål from './Hovedmål';
import Jobbmuligheter from './Jobbmuligheter';
import Språk from './Språk';
import Utdanningsnivå from './Utdanningsnivå';
import BorPåØnsketSted from './jobbønsker/BorPåØnsketSted';
import ØnsketSted from './jobbønsker/ØnsketSted';
import ØnsketYrke from './jobbønsker/ØnsketYrke';
import Kompetanse from './kompetanse/Kompetanse';
import PrioriterteMålgrupper from './prioriterte-målgrupper/PrioriterteMålgrupper';

const Filter = () => {
    return (
        <div className={css.filter}>
            <Fritekstsøk />
            <ØnsketYrke />
            <ØnsketSted />
            <BorPåØnsketSted />
            <Jobbmuligheter />
            <Hovedmål />
            <Kompetanse />
            <Førerkort />
            <Språk />
            <Arbeidserfaring />
            <Utdanningsnivå />
            <PrioriterteMålgrupper />
        </div>
    );
};

export default Filter;
