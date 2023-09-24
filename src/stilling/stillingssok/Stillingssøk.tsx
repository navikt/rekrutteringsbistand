import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Button, Heading, Loader } from '@navikt/ds-react';
import { Stillingskategori } from 'felles/domene/stilling/Stilling';
import { ReactComponent as Piktogram } from 'felles/komponenter/piktogrammer/finn-stillinger.svg';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Layout from '../../felles/layout/Layout';
import OpprettNyStilling from '../opprett-ny-stilling/OpprettNyStilling';
import css from './Stillingssøk.module.css';
import { GlobalAggregering } from './domene/elasticSearchTyper';
import Filter from './filter/Filter';
import Filtermeny from './filter/filtermeny/Filtermeny';
import { Status } from './filter/om-annonsen/Annonsestatus';
import { Publisert } from './filter/om-annonsen/HvorErAnnonsenPublisert';
import KontekstAvKandidat from './kontekst-av-kandidat/KontekstAvKandidat';
import Paginering from './paginering/Paginering';
import Sorter, { Sortering } from './sorter/Sorter';
import Stillingsliste from './stillingsliste/Stillingsliste';
import Søkefelter, { Søkefelt } from './søkefelter/Søkefelter';
import useAntallTreff from './useAntallTreff';
import useNavigering from './useNavigering';
import useSøkMedQuery from './useSøkMedQuery';
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
    visMine: Set<string>;
};

const Stillingssøk = () => {
    const { searchParams, navigate } = useNavigering();
    const { kandidat: kandidatnr } = useParams<{ kandidat?: string }>();
    const { search } = useLocation();
    const skalViseOpprettStillingModal = () => {
        const queryParams = new URLSearchParams(search);
        return queryParams.get('modal') === 'opprettStillingModal';
    };

    const [visOpprettStillingModal, setVisOpprettStillingModal] = useState(
        skalViseOpprettStillingModal()
    );
    const respons = useSøkMedQuery();

    const globalAggregering = respons?.aggregations
        ?.globalAggregering as unknown as GlobalAggregering;
    const antallTreff = useAntallTreff(respons);

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
            {respons ? (
                <div>
                    <Filtermeny finnerStillingForKandidat={finnerStillingForKandidat} />
                    <div className={css.beskrivelseAvSøk}>
                        <Heading level="2" size="medium" className={css.antallStillinger}>
                            {formaterAntallAnnonser(antallTreff)}
                        </Heading>
                        <Søkefelter aggregeringer={globalAggregering?.felter?.buckets} />
                        <Sorter />
                    </div>
                    <Stillingsliste esResponse={respons} kandidatnr={kandidatnr} />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Paginering totaltAntallTreff={antallTreff} />
                    </div>
                    {visOpprettStillingModal && (
                        <OpprettNyStilling onClose={onOpprettNyStillingClose} />
                    )}
                </div>
            ) : (
                <div className={css.spinner}>
                    <Loader size="xlarge" />
                </div>
            )}
        </Layout>
    );
};

const formaterAntallAnnonser = (antallAnnonser: number) => {
    const suffiks = antallAnnonser === 1 ? ' annonse' : ' annonser';
    return antallAnnonser.toLocaleString('nb-NO') + suffiks;
};

export default Stillingssøk;
