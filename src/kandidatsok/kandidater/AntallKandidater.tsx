import { Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

type Props = {
    antallTreff: number;
};

const AntallKandidater: FunctionComponent<Props> = ({ antallTreff }) => {
    return (
        <Heading size="medium" level="2">
            {formaterStortTall(antallTreff)} kandidater
        </Heading>
    );
};

const formaterStortTall = (n: number) => n.toLocaleString('nb-NO');

export default AntallKandidater;
