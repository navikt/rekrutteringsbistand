import { useContext, useEffect } from 'react';

import Piktogram from 'felles/komponenter/piktogrammer/finn-kandidater.svg';
import Layout from '../felles/komponenter/layout/Layout';
import { KandidatSøkContext } from './KandidatSøkContext';
import css from './Kandidatsøk.module.css';
import Filter from './filter/Filter';
import TømFiltre from './filter/TømFiltre';
import PorteføljeTabs from './filter/porteføljetabs/PorteføljeTabs';
import useLagreØkt from './hooks/useLagreØkt';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import Kandidater from './kandidater/Kandidater';
import Kandidatlistebanner from './kandidatlistebanner/Kandidatlistebanner';
import { useSearchParams } from 'react-router-dom';
import { KandidatsokQueryParam } from 'felles/lenker';

const Kandidatsøk = () => {
    const navigeringsstate = useNavigeringsstate();
    const [searchParams] = useSearchParams();
    const stillingId = searchParams.get(KandidatsokQueryParam.Stilling);

    const { kandidatSøkØkt } = useContext(KandidatSøkContext);

    const forrigeØkt =
        navigeringsstate.brukKriterierFraStillingen || navigeringsstate.fraMeny
            ? null
            : kandidatSøkØkt?.forrigeØkt;

    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater(
        forrigeØkt?.markerteKandidater
    );

    useLagreØkt();
    useEffect(() => {
        kandidatSøkØkt?.setØkt &&
            kandidatSøkØkt.setØkt({
                markerteKandidater: Array.from(markerteKandidater),
            });
    }, [markerteKandidater, kandidatSøkØkt]);

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
