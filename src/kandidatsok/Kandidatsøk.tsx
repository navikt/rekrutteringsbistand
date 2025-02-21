import Piktogram from 'felles/komponenter/piktogrammer/finn-kandidater.svg';
import { KandidatsokQueryParam } from 'felles/lenker';
import { useSearchParams } from 'react-router-dom';
import Layout from '../felles/komponenter/layout/Layout';
import css from './Kandidatsøk.module.css';
import Filter from './filter/Filter';
import TømFiltre from './filter/TømFiltre';
import PorteføljeTabs from './filter/porteføljetabs/PorteføljeTabs';
import { MarkerteKandidaterProvider } from './hooks/MarkerteKandidaterContext';
import Kandidater from './kandidater/Kandidater';
import Kandidatlistebanner from './kandidatlistebanner/Kandidatlistebanner';

const Kandidatsøk = () => {
    const [searchParams] = useSearchParams();
    const stillingId = searchParams.get(KandidatsokQueryParam.Stilling);

    return (
        <Layout
            tittel="Kandidatsøk"
            ikon={<Piktogram />}
            banner={stillingId ? <Kandidatlistebanner stillingId={stillingId} /> : undefined}
            knappIBanner={<TømFiltre />}
            sidepanel={<Filter />}
        >
            <MarkerteKandidaterProvider stillingId={stillingId}>
                <PorteføljeTabs stillingId={stillingId}>
                    <div className={css.hovedinnhold}>
                        <Kandidater stillingId={stillingId} />
                    </div>
                </PorteføljeTabs>
            </MarkerteKandidaterProvider>
        </Layout>
    );
};

export default Kandidatsøk;
