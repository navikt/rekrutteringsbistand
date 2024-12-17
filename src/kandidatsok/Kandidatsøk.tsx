import Piktogram from 'felles/komponenter/piktogrammer/finn-kandidater.svg';
import { KandidatsokQueryParam } from 'felles/lenker';
import { useSearchParams } from 'react-router-dom';
import Layout from '../felles/komponenter/layout/Layout';
import css from './Kandidatsøk.module.css';
import Filter from './filter/Filter';
import TømFiltre from './filter/TømFiltre';
import PorteføljeTabs from './filter/porteføljetabs/PorteføljeTabs';
import useLagreØkt from './hooks/useLagreØkt';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import Kandidater from './kandidater/Kandidater';
import Kandidatlistebanner from './kandidatlistebanner/Kandidatlistebanner';

const Kandidatsøk = () => {
    const [searchParams] = useSearchParams();
    const stillingId = searchParams.get(KandidatsokQueryParam.Stilling);

    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater();

    useLagreØkt();

    return (
        <Layout
            tittel="Kandidatsøk"
            ikon={<Piktogram />}
            banner={stillingId ? <Kandidatlistebanner stillingId={stillingId} /> : undefined}
            knappIBanner={<TømFiltre />}
            sidepanel={<Filter />}
        >
            <PorteføljeTabs stillingId={stillingId}>
                <div className={css.hovedinnhold}>
                    <Kandidater
                        markerteKandidater={markerteKandidater}
                        onMarkerKandidat={onMarkerKandidat}
                        fjernMarkering={fjernMarkering}
                        stillingId={stillingId}
                    />
                </div>
            </PorteføljeTabs>
        </Layout>
    );
};

export default Kandidatsøk;
