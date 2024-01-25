import { Loader } from '@navikt/ds-react';
import * as React from 'react';
import {
    IuseKandidatNavnSøk,
    KandidatKilde,
    useKandidatNavnSøk,
} from '../../hooks/useKandidatNavn';
import {useEffect} from "react";

export interface IKandidatNavn {
    fnr: string;
    callback: (resultat: IuseKandidatNavnSøk) => void;
}

const KandidatNavn: React.FC<IKandidatNavn> = ({ fnr, callback }) => {
    const resultat = useKandidatNavnSøk(fnr);
    const { fornavn, mellomnavn, etternavn, laster, kandidatnr, kilde } = resultat;

    useEffect(() => {
        callback(resultat);
    },[callback, resultat]);

    if (laster) {
        return <Loader size="medium" />;
    }

    if (kilde === KandidatKilde.REKRUTTERINGSBISTAND) {
        return (
            <div style={{ marginTop: '1rem' }}>
                <dl>
                    <dt>Kandidatnr</dt>
                    <dd>{kandidatnr}</dd>
                </dl>

                <dl>
                    <dt>Navn</dt>
                    <dd>
                        {fornavn} {mellomnavn} {etternavn}
                    </dd>
                </dl>
            </div>
        );
    }

    if (kilde === KandidatKilde.PDL) {
        return (
            <div>
                <dl>
                    <dt>Kandidaten er hentet fra folkeregistret</dt>
                </dl>

                <dl>
                    <dt>Navn</dt>
                    <dd>
                        {fornavn} {mellomnavn} {etternavn}
                    </dd>
                </dl>
            </div>
        );
    }

    return <div> Finner ikke person knyttet til fnr </div>;
};

export default KandidatNavn;
