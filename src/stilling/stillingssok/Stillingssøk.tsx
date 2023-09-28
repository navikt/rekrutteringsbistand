import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Tabs } from '@navikt/ds-react';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { ReactComponent as Piktogram } from 'felles/komponenter/piktogrammer/finn-stillinger.svg';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useInnloggetBruker from '../../felles/hooks/useBrukerensIdent';
import Layout from '../../felles/layout/Layout';
import OpprettNyStilling from '../opprett-ny-stilling/OpprettNyStilling';
import AlleStillinger from './AlleStillinger';
import MineStillinger from './MineStillinger';
import Filter from './filter/Filter';
import { Status } from './filter/om-annonsen/Annonsestatus';
import { Publisert } from './filter/om-annonsen/HvorErAnnonsenPublisert';
import KontekstAvKandidat from './kontekst-av-kandidat/KontekstAvKandidat';
import { Sortering } from './sorter/Sorter';
import { Søkefelt } from './søkefelter/Søkefelter';
import useNavigering from './useNavigering';
import { QueryParam, oppdaterUrlMedParam } from './utils/urlUtils';

export type Søkekriterier = {
    side: number;
    tekst: Set<string>;
    publisert: Set<Publisert>;
    fylker: Set<string>;
    kommuner: Set<string>;
    statuser: Set<Status>;
    stillingskategorier: Set<Stillingskategori>;
    hovedinkluderingstags: Set<string>;
    subinkluderingstags: Set<string>;
    sortering: Sortering;
    felter: Set<Søkefelt>;
    portefolje: Set<string>;
};

enum TabVisning {
    VIS_ALLE = 'visAlle',
    VIS_MINE = 'visMine',
}

const Stillingssøk = () => {
    const innloggetBruker = useInnloggetBruker();
    const { searchParams, navigate } = useNavigering();
    const { kandidat: kandidatnr } = useParams<{ kandidat?: string }>();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const skalViseOpprettStillingModal = () => {
        return queryParams.get('modal') === 'opprettStillingModal';
    };
    const oppdaterTab = (tab: TabVisning) =>
        oppdaterUrlMedParam({
            searchParams,
            navigate,
            parameter: QueryParam.Portofølje,
            verdi: tab === TabVisning.VIS_MINE ? TabVisning.VIS_MINE : null,
        });

    const portefolje = queryParams.get('portefolje') ?? TabVisning.VIS_ALLE;

    const [visOpprettStillingModal, setVisOpprettStillingModal] = useState(
        skalViseOpprettStillingModal()
    );

    const finnerStillingForKandidat = kandidatnr !== undefined;

    const onOpprettNyClick = () => {
        setVisOpprettStillingModal(true);
    };

    const onOpprettNyStillingClose = () => {
        setVisOpprettStillingModal(false);
        oppdaterUrlMedParam({
            searchParams,
            navigate,
            parameter: QueryParam.Modal,
            verdi: null,
        });
    };

    return (
        <Layout
            tittel="Stillinger"
            ikon={<Piktogram />}
            bannerKnapp={
                <Button
                    variant="secondary"
                    onClick={onOpprettNyClick}
                    icon={<PlusCircleIcon aria-hidden />}
                >
                    Opprett ny
                </Button>
            }
            altBanner={kandidatnr !== undefined && <KontekstAvKandidat kandidatnr={kandidatnr} />}
            sidepanel={<Filter finnerStillingForKandidat={finnerStillingForKandidat} />}
        >
            <Tabs defaultValue={portefolje} onChange={(e) => oppdaterTab(e as TabVisning)}>
                <Tabs.List>
                    <Tabs.Tab value={TabVisning.VIS_ALLE} label="Alle stillinger" />
                    <Tabs.Tab value={TabVisning.VIS_MINE} label="Mine stillinger" />
                </Tabs.List>
                <Tabs.Panel value={TabVisning.VIS_ALLE}>
                    <AlleStillinger
                        kandidatnr={kandidatnr}
                        finnerStillingForKandidat={finnerStillingForKandidat}
                    />
                </Tabs.Panel>
                <Tabs.Panel value={TabVisning.VIS_MINE}>
                    {innloggetBruker ? (
                        <MineStillinger
                            navIdent={innloggetBruker}
                            kandidatnr={kandidatnr}
                            finnerStillingForKandidat={finnerStillingForKandidat}
                        />
                    ) : null}
                </Tabs.Panel>
            </Tabs>
            {visOpprettStillingModal && <OpprettNyStilling onClose={onOpprettNyStillingClose} />}
        </Layout>
    );
};

export const formaterAntallAnnonser = (antallAnnonser: number) => {
    const suffiks = antallAnnonser === 1 ? ' annonse' : ' annonser';
    return antallAnnonser.toLocaleString('nb-NO') + suffiks;
};

export default Stillingssøk;
