import { Alert, Link } from '@navikt/ds-react';
import * as React from 'react';
import { ApplikasjonContext } from '../ApplikasjonContext';

import ErrorBoundary from '../feilhåndtering/ErrorBoundary';
import { Rolle } from './Roller';
import css from './TilgangskontrollForInnhold.module.css';

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

export const TilgangskontrollForInnhold: React.FC<ITilgangskontrollForInnhold> = ({
    kreverEnAvRollene,
    children,
    skjulVarsel,
}) => {
    const { roller, tilgangskontrollErPå } = React.useContext(ApplikasjonContext);

    const harTilgang = kreverEnAvRollene.some((r) => {
        return (
            roller?.includes(r) || roller?.includes(Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER)
        );
    });

    // TODO: Feature-toggle!
    if (!tilgangskontrollErPå) {
        return <>{children}</>;
    }

    if (harTilgang) {
        return <>{children}</>;
    }

    if (!harTilgang && skjulVarsel) {
        return null;
    }
    return (
        <ErrorBoundary>
            <div className={css.container}>
                <Alert variant="error" className={css.alert}>
                    <div>
                        <span>
                            Hei, du trenger rollen
                            {kreverEnAvRollene
                                .filter(
                                    (r, i) => r !== Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER
                                )
                                .map((rolle, i) => (
                                    <span>
                                        {' '}
                                        {rolleTilNavn(rolle)}{' '}
                                        {i < kreverEnAvRollene.length - 1 ? 'eller' : ''}{' '}
                                    </span>
                                ))}{' '}
                            for å få tilgang til innhold på denne siden. Husk at du må ha et
                            tjenstlig behov for det den spesifikke rollen gir deg tilgang til. Snakk
                            med din nærmeste leder.
                            <br />
                            <Link href="https://navno.sharepoint.com/:u:/r/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Tilgangskontroll.aspx?csf=1&web=1&e=yp2Ibk">
                                Trykk her for å lese mer
                            </Link>
                        </span>
                    </div>
                </Alert>
            </div>
        </ErrorBoundary>
    );
};
