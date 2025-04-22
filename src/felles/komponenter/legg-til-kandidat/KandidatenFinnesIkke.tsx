import { Alert } from '@navikt/ds-react';
import Synlighetsevaluering, {
    KravTilKandidaten,
    KravTilVeileder,
    KriterieUtenforNoensKontroll,
    Synlighetskriterie,
} from 'felles/domene/synlighet/Synlighetsevaluering';
import { FunctionComponent, ReactNode } from 'react';
import css from './KandidatenFinnesIkke.module.css';

type Props = {
    synlighetsevaluering: Synlighetsevaluering;
};

const KandidatenFinnesIkke: FunctionComponent<Props> = ({ synlighetsevaluering }) => {
    const ingenKriterierStemmer = Object.values(synlighetsevaluering).every(
        (kriterie) => kriterie === false
    );
    const alleKriterierStemmer = Object.values(synlighetsevaluering).every(
        (kriterie) => kriterie === true
    );

    let forklaring: ReactNode = null;

    if (ingenKriterierStemmer || alleKriterierStemmer) {
        return null;
    }

    const kandidatensKriterierPerAnsvarsområde =
        hentKandidatensKriterierPerAnsvarsområde(synlighetsevaluering);

    if (kandidatensKriterierPerAnsvarsområde.utenforNoensKontroll.length) {
        forklaring = (
            <>
                <span>Mulige årsaker er:</span>
                {kandidatensKriterierPerAnsvarsområde.utenforNoensKontroll.map((kriterie) => (
                    <li>{kriterieTilForklaring(kriterie)}</li>
                ))}
            </>
        );
    } else {
        forklaring = (
            <>
                {kandidatensKriterierPerAnsvarsområde.kandidat.length > 0 && (
                    <>
                        <ul>
                            {kandidatensKriterierPerAnsvarsområde.kandidat.map((kriterie) => (
                                <li key={kriterie}>{kriterieTilForklaring(kriterie)}</li>
                            ))}
                        </ul>
                    </>
                )}
                {kandidatensKriterierPerAnsvarsområde.veileder.length > 0 && (
                    <>
                        <ul>
                            {kandidatensKriterierPerAnsvarsområde.veileder.map((kriterie) => (
                                <li key={kriterie}>{kriterieTilForklaring(kriterie)}</li>
                            ))}
                        </ul>
                    </>
                )}
            </>
        );
    }

    return (
        <Alert variant="info" aria-live="polite" className={css.forklaring}>
            {forklaring}
        </Alert>
    );
};

export const kriterierPerAnsvarsområde: Record<string, Synlighetskriterie[]> = {
    utenforNoensKontroll: Object.values(KriterieUtenforNoensKontroll),
    kandidat: Object.values(KravTilKandidaten),
    veileder: Object.values(KravTilVeileder),
};

const hentKandidatensKriterierPerAnsvarsområde = (synlighetsevaluering: Synlighetsevaluering) => {
    const ikkeTilfredsstilteKriterier = Object.entries(synlighetsevaluering)
        .filter(([_, verdi]) => verdi === false)
        .map(([kriterie, _]) => kriterie as Synlighetskriterie);

    return {
        utenforNoensKontroll: ikkeTilfredsstilteKriterier.filter((k) =>
            kriterierPerAnsvarsområde.utenforNoensKontroll.includes(k)
        ),
        kandidat: ikkeTilfredsstilteKriterier.filter((k) =>
            kriterierPerAnsvarsområde.kandidat.includes(k)
        ),
        veileder: ikkeTilfredsstilteKriterier.filter((k) =>
            kriterierPerAnsvarsområde.veileder.includes(k)
        ),
    };
};

const kriterieTilForklaring = (kriterie: Synlighetskriterie) => {
    switch (kriterie) {
        case KravTilKandidaten.HarAktivCv:
        case KravTilKandidaten.HarJobbprofil:
            return 'Personbruker mangler CV. Minimum innhold er ett yrkesønske og ett geografisk sted person ønsker å jobbe.';
        case KravTilKandidaten.HarSettHjemmel:
            return 'Personbruker har ikke blitt informert om Navs behandlingsgrunnlag for deling av CV.';
        case KravTilKandidaten.MåIkkeBehandleTidligereCv:
            return 'Personbruker har ikke valgt «Del CV». Dette kravet opptrer kun i overgangs-tilfeller hvor personbruker kommer under oppfølging av Nav med en CV som hen har fra en tidligere oppfølgingsperiode, eller med en CV som ble opprettet før hen kom under oppfølging av Nav.';
        case KravTilVeileder.ErIkkeFritattKandidatsøk:
            return 'Personbruker har personforholdet «Fritatt for kandidatsøk» i Arena.';
        case KravTilKandidaten.ErUnderOppfølging:
        case KravTilVeileder.ErArbeidssøker:
            return 'Personbruker må være i Navs Arbeidssøkerregister.';
        case KriterieUtenforNoensKontroll.ErIkkeDød:
            return 'Er død.';
    }
};

export default KandidatenFinnesIkke;
