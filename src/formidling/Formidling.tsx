import { Tabs } from '@navikt/ds-react';
import useInnloggetBruker from 'felles/hooks/useInnloggetBruker';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { sendEvent } from '../felles/amplitude';
import Layout from '../felles/komponenter/layout/Layout';
import useNavigering from '../stilling/stillingssok/useNavigering';
import { QueryParam, oppdaterUrlMedParam } from '../stilling/stillingssok/utils/urlUtils';
import Formidlingssøk from './Formidlingssøk';
import FormidlingssøkSidebar from './FormidlingssøkSidebar';

enum TabVisning {
    VIS_ALLE = 'visAlle',
    VIS_MINE = 'visMine',
}

const Formidling: React.FC = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const portefolje = queryParams.get('portefolje') ?? TabVisning.VIS_ALLE;
    const { searchParams, navigate } = useNavigering();
    const { navIdent } = useInnloggetBruker(null);

    const oppdaterTab = (tab: TabVisning) => {
        if (tab === TabVisning.VIS_MINE) {
            sendEvent('formidlinger', 'vis_mine_formidlinger_tab');
        }
        oppdaterUrlMedParam({
            searchParams,
            navigate,
            parameter: QueryParam.Portofølje,
            verdi: tab === TabVisning.VIS_MINE ? TabVisning.VIS_MINE : null,
        });
    };

    return (
        <Layout tittel="Formidlinger" sidepanel={<FormidlingssøkSidebar />}>
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
    );
};

export default Formidling;
