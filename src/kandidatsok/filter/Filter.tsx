import Arbeidserfaring from './Arbeidserfaring';
import Fritekstsøk from './Fritekstsøk';
import Førerkort from './Førerkort';
import Hovedmål from './Hovedmål';
import Jobbmuligheter from './Jobbmuligheter';
import BorPåØnsketSted from './jobbønsker/BorPåØnsketSted';
import ØnsketSted from './jobbønsker/ØnsketSted';
import ØnsketYrke from './jobbønsker/ØnsketYrke';
import Kompetanse from './kompetanse/Kompetanse';
import PrioriterteMålgrupper from './prioriterte-målgrupper/PrioriterteMålgrupper';
import Språk from './Språk';
import Utdanningsnivå from './Utdanningsnivå';

const Filter = () => {
    return (
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
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
