import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { FunctionComponent } from 'react';
import css from './Stillingsliste.module.css';
import Stillingsrad from './stillingsrad/Stillingsrad';

type Props = {
    esResponse: EsResponse<EsRekrutteringsbistandstilling>;
    kandidatnr?: string;
};

const Stillingsliste: FunctionComponent<Props> = ({ esResponse, kandidatnr }) => {
    const hits = esResponse.hits.hits;

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
