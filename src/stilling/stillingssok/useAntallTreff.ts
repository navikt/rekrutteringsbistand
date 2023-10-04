import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from 'felles/domene/stilling/EsStilling';

const useAntallTreff = (respons: EsResponse<EsRekrutteringsbistandstilling> | null): number => {
    if (respons === null) {
        return 0;
    }

    return respons.hits.total.value;
};

export default useAntallTreff;
