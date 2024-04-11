import { Alert } from '@navikt/ds-react';
import * as React from 'react';
import { ApplikasjonContext } from '../ApplikasjonContext';
import { erIkkeProd } from '../miljø';

import css from './TilgangskontrollForInnhold.module.css';

export enum Rolle {
    AD_GRUPPE_MODIA_GENERELL_TILGANG = 'AD_GRUPPE_MODIA_GENERELL_TILGANG',
    AD_GRUPPE_MODIA_OPPFOLGING = 'AD_GRUPPE_MODIA_OPPFOLGING',
    AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET = 'AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET',
    AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET = 'AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET',
    AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER = 'AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER',
}

export interface ITilgangskontrollForInnhold {
    kreverEnAvRollene: Rolle[];
    children: React.ReactNode;
    skjulVarsel?: boolean;
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
    kreverEnAvRollene,
    children,
    skjulVarsel,
}) => {
    const { roller } = React.useContext(ApplikasjonContext);

    // TODO Feature-toggle!
    const aktivTilgangskontroll = erIkkeProd;

    const harTilgang = kreverEnAvRollene.some((r) => {
        return (
            roller?.includes(r) || roller?.includes(Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER)
        );
    });

    if (!aktivTilgangskontroll) {
        return <>{children}</>;
    }

    if (harTilgang) {
        return <>{children}</>;
    }

    if (!harTilgang && skjulVarsel) {
        return null;
    }
    return (
        <>
            <div className={css.container}>
                <Alert variant="error" className={css.alert}>
                    <div>
                        <strong>Du har ikke tistrekkelig tilgang til å se denne siden.</strong>
                        <p>Du må ha en av følgende roller:</p>
                        <ul>
                            {kreverEnAvRollene
                                .filter((r) => r !== Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER)
                                .map((rolle) => (
                                    <li>{rolleTilNavn(rolle)}</li>
                                ))}
                        </ul>
                    </div>
                </Alert>
            </div>
            {children}
        </>
    );
};

export default TilgangskontrollForInnhold;
