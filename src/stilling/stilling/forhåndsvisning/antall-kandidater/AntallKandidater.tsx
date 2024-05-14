import { Alert, Loader } from '@navikt/ds-react';
import { useHentAntallKandidaterIStilling } from '../../../../api/kandidat-api/hentAntallKandidaterIStilling';

type Props = {
    kandidatelisteId: string;
};

export const AntallKandidaterIStilling = ({ kandidatelisteId }: Props) => {
    const { data, isLoading } = useHentAntallKandidaterIStilling({
        kandidatlisteId: kandidatelisteId,
    });
    return isLoading ? (
        <Loader />
    ) : (
        <Alert variant="info">
            Antall kandidater registrert for stillingen: {data?.antallKandidater}
        </Alert>
    );
};
