import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { FunctionComponent } from 'react';
import { Hit } from '../../../felles/domene/elastic/ElasticSearch';
import css from './Stillingsliste.module.css';
import Stillingsrad from './stillingsrad/Stillingsrad';

type Props = {
    hits: Hit<EsRekrutteringsbistandstilling>[];
    kandidatnr?: string;
};

const Stillingsliste: FunctionComponent<Props> = ({ hits, kandidatnr }) => {
    return (
        <ul className={css.stillingliste}>
            {hits.map((hit) => (
                <Stillingsrad
                    key={hit._id}
                    rekrutteringsbistandstilling={hit._source}
                    kandidatnr={kandidatnr}
                    score={hit._score}
                />
            ))}
        </ul>
    );
};

export default Stillingsliste;
