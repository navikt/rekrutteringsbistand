import { Tabs } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import Sidefeil from '../komponenter/sidefeil/Sidefeil';
import FraKandidatliste from './fraKandidatliste/FraKandidatliste';
import FraSøkMedKandidatliste from './fraSøkMedKandidatliste/FraSøkMedKandidatliste';
import FraSøkUtenKontekst from './fraSøkUtenKontekst/FraSøkUtenKontekst';
import { TilgangskontrollForInnhold } from '../../felles/tilgangskontroll/TilgangskontrollForInnhold';
import { Rolle } from '../../felles/tilgangskontroll/Roller';

export enum KandidatQueryParam {
    KandidatlisteId = 'kandidatlisteId',
    StillingId = 'stillingId',
    FraKandidatliste = 'fraKandidatliste',
    FraKandidatsøk = 'fraKandidatsok',
}

type RouteParams = {
    kandidatnr: string;
};

const Kandidatside: FunctionComponent = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const routeParams = useParams<RouteParams>();
    const kandidatnr = routeParams.kandidatnr || null;

    const kandidatlisteIdFraUrl = searchParams.get(KandidatQueryParam.KandidatlisteId);
    const stillingIdFraUrl = searchParams.get(KandidatQueryParam.StillingId);
    const kommerFraKandidatliste = searchParams.get(KandidatQueryParam.FraKandidatliste) === 'true';
    const kommerFraKandidatsøket = searchParams.get(KandidatQueryParam.FraKandidatsøk) === 'true';

    if (kommerFraKandidatliste && kandidatnr) {
        return (
            <FraKandidatliste
                tabs={<Faner />}
                kandidatnr={kandidatnr}
                kandidatlisteId={kandidatlisteIdFraUrl}
                stillingId={stillingIdFraUrl}
            >
                <Outlet />
            </FraKandidatliste>
        );
    } else if (kommerFraKandidatsøket && kandidatnr) {
        if (stillingIdFraUrl || kandidatlisteIdFraUrl) {
            return (
                <FraSøkMedKandidatliste
                    tabs={<Faner />}
                    kandidatnr={kandidatnr}
                    kandidatlisteId={kandidatlisteIdFraUrl}
                    stillingId={stillingIdFraUrl}
                >
                    <Outlet />
                </FraSøkMedKandidatliste>
            );
        } else {
            return (
                <FraSøkUtenKontekst tabs={<Faner />} kandidatnr={kandidatnr}>
                    <Outlet />
                </FraSøkUtenKontekst>
            );
        }
    } else {
        return <Sidefeil feilmelding="Klarte ikke å bestemme riktig kontekst" />;
    }
};

const Faner = () => (
    <Tabs.List>
        <Tabs.Tab value="cv" label="Oversikt" />
        <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
            ]}
        >
            <Tabs.Tab value="historikk" label="Historikk" />
        </TilgangskontrollForInnhold>
    </Tabs.List>
);

export default Kandidatside;
