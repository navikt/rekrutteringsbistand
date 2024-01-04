import { Tabs } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import Sidefeil from '../komponenter/sidefeil/Sidefeil';
import FraKandidatliste from './fraKandidatliste/FraKandidatliste';
import FraSøkMedKandidatliste from './fraSøkMedKandidatliste/FraSøkMedKandidatliste';
import FraSøkUtenKontekst from './fraSøkUtenKontekst/FraSøkUtenKontekst';

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
    const kandidatnr = routeParams.kandidatnr!;

    const kandidatlisteIdFraUrl = searchParams.get(KandidatQueryParam.KandidatlisteId);
    const stillingidFraUrl = searchParams.get(KandidatQueryParam.StillingId);
    const kommerFraKandidatliste = searchParams.get(KandidatQueryParam.FraKandidatliste) === 'true';
    const kommerFraKandidatsøket = searchParams.get(KandidatQueryParam.FraKandidatsøk) === 'true';

    if (kommerFraKandidatliste) {
        if (kandidatlisteIdFraUrl) {
            return (
                <FraKandidatliste
                    tabs={<Faner />}
                    kandidatnr={kandidatnr}
                    kandidatlisteId={kandidatlisteIdFraUrl}
                >
                    <Outlet />
                </FraKandidatliste>
            );
        } else {
            return <Sidefeil feilmelding="Mangler kandidatlisteId i URL" />;
        }
    } else if (kommerFraKandidatsøket) {
        if (kandidatlisteIdFraUrl) {
            return (
                <FraSøkMedKandidatliste
                    tabs={<Faner />}
                    kandidatnr={kandidatnr}
                    kandidatlisteId={kandidatlisteIdFraUrl}
                    stillingId={stillingidFraUrl}
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
        <Tabs.Tab value="historikk" label="Historikk" />
    </Tabs.List>
);

export default Kandidatside;
