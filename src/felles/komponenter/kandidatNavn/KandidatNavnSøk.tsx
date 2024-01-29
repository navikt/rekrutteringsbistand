import { Alert, Loader } from '@navikt/ds-react';
import * as React from 'react';
import { useEffect } from 'react';
import {
    IuseKandidatNavnSøk,
    KandidatKilde,
    useKandidatNavnSøk,
} from '../../hooks/useKandidatNavn';

export interface IKandidatNavn {
    fnr: string;
    callback: (resultat: IuseKandidatNavnSøk) => void;
}

const KandidatNavn: React.FC<IKandidatNavn> = ({ fnr, callback }) => {
    const resultat = useKandidatNavnSøk(fnr);
    const { fornavn, mellomnavn, etternavn, laster, kilde } = resultat;

    useEffect(() => {
        callback(resultat);
    }, [callback, resultat]);

    if (laster) {
        return <Loader size="medium" />;
    }

    if (kilde === KandidatKilde.REKRUTTERINGSBISTAND) {
        return (
            <div style={{ marginTop: '1rem' }}>
                <strong>Navn</strong>
                <br />
                <span>
                    {fornavn} {mellomnavn} {etternavn}
                </span>
            </div>
        );
    }

    if (kilde === KandidatKilde.PDL) {
        return (
            <div style={{ marginTop: '1rem' }}>
                <strong>Kandidaten er hentet fra folkeregistret</strong>
                <br />
                <span>
                    {fornavn} {mellomnavn} {etternavn}
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
