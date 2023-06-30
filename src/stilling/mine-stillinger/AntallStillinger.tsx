import { FunctionComponent } from 'react';
import { Nettressurs, Nettstatus } from '../api/Nettressurs';
import { MineStillingerResultat } from './mineStillingerReducer';
import { Heading } from '@navikt/ds-react';

type Props = {
    resultat: Nettressurs<MineStillingerResultat>;
};

const AntallStillinger: FunctionComponent<Props> = ({ resultat }) => {
    if (resultat.kind !== Nettstatus.Suksess) {
        return (
            <Heading level="2" size="medium">
                &nbsp;
            </Heading>
        );
    }

    const antallStillinger = resultat.data.totalElements;
    let text = antallStillinger.toLocaleString('nb');

    if (antallStillinger === 1) {
        text += ' stilling';
    } else {
        text += ' stillinger';
    }

    return (
        <Heading level="2" size="medium">
            {text}
        </Heading>
    );
};

export default AntallStillinger;
