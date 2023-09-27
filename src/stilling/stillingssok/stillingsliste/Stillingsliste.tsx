import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';
import { FunctionComponent } from 'react';
import css from './Stillingsliste.module.css';
import Stillingsrad from './stillingsrad/Stillingsrad';

type Props = {
    esResponse: EsResponse<EsRekrutteringsbistandstilling>;
    kandidatnr?: string;
    navIdent?: string;
};

const Stillingsliste: FunctionComponent<Props> = ({ esResponse, kandidatnr, navIdent }) => {
    const hits = esResponse.hits.hits;

    return (
        <ul className={css.stillingliste}>
            {hits.map((hit) => (
                <Stillingsrad
                    navIdent={navIdent}
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
