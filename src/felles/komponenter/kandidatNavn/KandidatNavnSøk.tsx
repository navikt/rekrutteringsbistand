import { Alert, Loader } from '@navikt/ds-react';
import * as React from 'react';
import { IuseKandidatNavnSøk, KandidatKilde } from '../../../api/kandidat-api/useKandidatNavn';
import { useHentKandidatnavn } from '../../../api/kandidat-søk-api/hentKandidatnavn';

export interface IKandidatNavn {
    fnr: string;
    callback: (resultat: IuseKandidatNavnSøk) => void;
}

const KandidatNavn: React.FC<IKandidatNavn> = ({ fnr, callback }) => {
    const { navn, isLoading } = useHentKandidatnavn({ fodselsnummer: fnr });

    if (isLoading) {
        return <Loader size="medium" />;
    }

    if (navn?.kilde === KandidatKilde.REKRUTTERINGSBISTAND) {
        return (
            <div style={{ marginTop: '1rem' }}>
                <strong>Navn</strong>
                <br />
                <span>
                    {navn.fornavn} {navn.etternavn}
                </span>
            </div>
        );
    }

    if (navn?.kilde === KandidatKilde.PDL) {
        return (
            <div style={{ marginTop: '1rem' }}>
                <strong>Kandidaten er hentet fra folkeregistret</strong>
                <br />
                <span>
                    {navn.fornavn} {navn.etternavn}
                </span>
            </div>
        );
    }

    return (
        <Alert variant="error" style={{ marginTop: '1rem' }}>
            Finner ikke person knyttet til fødselsnummer
        </Alert>
    );
};

export default KandidatNavn;
