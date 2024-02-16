import { Alert } from '@navikt/ds-react';
import * as React from 'react';
import { ApplikasjonContext } from '../ApplikasjonContext';
import { tilgangsKontrollAktiv } from './tilgangskontroll_aktiv';

export enum Rolle {
    AD_GRUPPE_MODIA_GENERELL_TILGANG = 'AD_GRUPPE_MODIA_GENERELL_TILGANG',
    AD_GRUPPE_MODIA_OPPFOLGING = 'AD_GRUPPE_MODIA_OPPFOLGING',
    AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET = 'AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET',
    AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET = 'AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET',
    AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER = 'AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER',
}

export interface ITilgangskontrollForInnhold {
    kreverRoller: Rolle[];
    children: React.ReactNode;
}

const rolleTilNavn = (rolle: Rolle): string | null => {
    switch (rolle) {
        case Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET:
            return 'Arbeidsgiverrettet';

        case Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET:
            return 'Jobbsøkerrettet';

        case Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER:
            return 'Utvikler';

        default:
            return null;
    }
};

const TilgangskontrollForInnhold: React.FC<ITilgangskontrollForInnhold> = ({
    kreverRoller,
    children,
}) => {
    const { roller } = React.useContext(ApplikasjonContext);

    const harTilgang = kreverRoller.some((r) => {
        return roller?.includes(r);
    });

    //todo temp
    if (!tilgangsKontrollAktiv) {
        return <>{children}</>;
    }

    if (harTilgang) {
        return <>{children}</>;
    }

    return (
        <div style={{ margin: '2rem' }}>
            <Alert variant="error">
                <div>
                    <strong>Du har ikke tistrekkelig tilgang til å se denne siden.</strong>
                    <p>Du må ha en av følgende roller:</p>
                    <ul>
                        {kreverRoller.map((rolle) => (
                            <li>{rolleTilNavn(rolle)}</li>
                        ))}
                    </ul>
                </div>
            </Alert>
            {children}
        </div>
    );
};

export default TilgangskontrollForInnhold;
