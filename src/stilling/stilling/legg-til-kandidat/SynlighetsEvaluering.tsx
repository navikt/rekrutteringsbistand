import { Loader } from '@navikt/ds-react';
import * as React from 'react';
import KandidatenFinnesIkke from '../../../felles/komponenter/legg-til-kandidat/KandidatenFinnesIkke';
import useSynlighetsevaluering from '../../../kandidat/kandidatliste/hooks/useSynlighetsevaluering';

export interface ISynlighetsEvaluering {
    fødselsnummer: string | null;
}

const SynlighetsEvaluering: React.FC<ISynlighetsEvaluering> = ({ fødselsnummer }) => {
    // @ts-ignore TODO: written before strict-mode enabled
    const { data, isLoading, error } = useSynlighetsevaluering(fødselsnummer);

    if (isLoading || !data) {
        return <Loader size="medium" />;
    }

    if (error) {
        return <span> Klarte ikke hente synlighetsevaluering </span>;
    }
    return (
        <>
            <KandidatenFinnesIkke synlighetsevaluering={data} />
        </>
    );
};

export default SynlighetsEvaluering;
