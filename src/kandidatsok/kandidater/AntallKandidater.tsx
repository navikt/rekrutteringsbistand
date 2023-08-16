import { Heading } from '@navikt/ds-react';
import { EsResponse } from 'felles/domene/elastic/ElasticSearch';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { FunctionComponent } from 'react';

type Props = {
    response: Nettressurs<EsResponse<Kandidat>>;
};

const AntallKandidater: FunctionComponent<Props> = ({ response }) => {
    if (response.kind !== Nettstatus.Suksess && response.kind !== Nettstatus.Oppdaterer) {
        return <div />;
    }

    const antallTreff = formaterStortTall(response.data.hits.total.value);

    return (
        <Heading size="medium" level="2">
            {antallTreff} kandidater
        </Heading>
    );
};

const formaterStortTall = (n: number) => n.toLocaleString('nb-NO');

export default AntallKandidater;
