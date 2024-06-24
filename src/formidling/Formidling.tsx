import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Tabs } from '@navikt/ds-react';
import Piktogram from 'felles/komponenter/piktogrammer/formidlinger.svg';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useMeg } from '../api/frackend/meg';
import { sendEvent } from '../felles/amplitude';
import Layout from '../felles/komponenter/layout/Layout';
import { Rolle } from '../felles/tilgangskontroll/Roller';
import { TilgangskontrollForInnhold } from '../felles/tilgangskontroll/TilgangskontrollForInnhold';
import useNavigering from '../stilling/stillingssok/useNavigering';
import { QueryParam, oppdaterUrlMedParam } from '../stilling/stillingssok/utils/urlUtils';
import Formidlingssøk from './Formidlingssøk';
import FormidlingssøkSidebar from './FormidlingssøkSidebar';

enum TabVisning {
    VIS_ALLE = 'visAlle',
    VIS_MINE = 'visMine',
}

const defaultTab = TabVisning.VIS_ALLE;

const Formidling: React.FC = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const portefolje = queryParams.get('portefolje') ?? defaultTab;
    const { searchParams, navigate } = useNavigering();
    const { navIdent } = useMeg();

    const oppdaterTab = (tab: TabVisning) => {
        if (tab === TabVisning.VIS_MINE) {
            sendEvent('formidlinger', 'vis_mine_formidlinger_tab');
        }
        oppdaterUrlMedParam({
            searchParams,
            navigate,
            parameter: QueryParam.Portofølje,
            verdi: tab === defaultTab ? null : tab,
        });
    };

    const onOpprettNyClick = () => navigate('/stillinger/stillingssok?modal=opprettStillingModal');

    return (
        <TilgangskontrollForInnhold
            kreverEnAvRollene={[
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
            ]}
        >
            <Layout
                tittel="Etterregistrering formidlinger"
                sidepanel={<FormidlingssøkSidebar />}
                ikon={<Piktogram />}
                knappIBanner={
                    <TilgangskontrollForInnhold
                        skjulVarsel
                        kreverEnAvRollene={[
                            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                            Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                        ]}
                    >
                        <Button
                            variant="secondary"
                            onClick={onOpprettNyClick}
                            icon={<PlusCircleIcon aria-hidden />}
                        >
                            Opprett ny
                        </Button>
                    </TilgangskontrollForInnhold>
                }
            >
                <Tabs defaultValue={portefolje} onChange={(e) => oppdaterTab(e as TabVisning)}>
                    <Tabs.List>
                        <Tabs.Tab value={TabVisning.VIS_ALLE} label="Alle" />
                        <Tabs.Tab value={TabVisning.VIS_MINE} label="Mine formidlinger" />
                    </Tabs.List>
                    <Tabs.Panel value={TabVisning.VIS_ALLE}>
                        <Formidlingssøk />
                    </Tabs.Panel>
                    <Tabs.Panel value={TabVisning.VIS_MINE}>
                        <Formidlingssøk navIdent={navIdent} />
                    </Tabs.Panel>
                </Tabs>
            </Layout>
        </TilgangskontrollForInnhold>
    );
};

export default Formidling;
