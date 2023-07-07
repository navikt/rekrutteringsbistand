import { Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { Respons } from './elasticSearchTyper';

type Props = {
    respons: Nettressurs<Respons>;
};

const AntallKandidater: FunctionComponent<Props> = ({ respons }) => {
    if (respons.kind !== Nettstatus.Suksess && respons.kind !== Nettstatus.Oppdaterer) {
        return <div />;
    }

    const antallTreff = formaterStortTall(respons.data.hits.total.value);

    return (
        <Heading size="medium" level="2">
            {antallTreff} kandidater
        </Heading>
    );
};

const formaterStortTall = (n: number) => n.toLocaleString('nb-NO');

export default AntallKandidater;
