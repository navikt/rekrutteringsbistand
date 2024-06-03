import { useContext, useEffect } from 'react';

import Piktogram from 'felles/komponenter/piktogrammer/finn-kandidater.svg';
import Layout from '../felles/komponenter/layout/Layout';
import { KandidatSøkContext } from './KandidatSøkContext';
import css from './Kandidatsøk.module.css';
import Filter from './filter/Filter';
import TømFiltre from './filter/TømFiltre';
import PorteføljeTabs from './filter/porteføljetabs/PorteføljeTabs';
import useKontekstAvKandidatlisteEllerStilling from './hooks/useKontekstAvKandidatlisteEllerStilling';
import useLagreØkt from './hooks/useLagreØkt';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import Kandidater from './kandidater/Kandidater';
import Kandidatlistebanner from './kandidatlistebanner/Kandidatlistebanner';

const Kandidatsøk = () => {
    const navigeringsstate = useNavigeringsstate();

    const { økt: kandidatsøkØkt } = useContext(KandidatSøkContext);

    const kontekstAvKandidatlisteEllerStilling =
        useKontekstAvKandidatlisteEllerStilling(navigeringsstate);

    const forrigeØkt =
        navigeringsstate.brukKriterierFraStillingen || navigeringsstate.fraMeny
            ? null
            : kandidatsøkØkt?.forrigeØkt;

    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater(
        forrigeØkt?.markerteKandidater
    );

    useLagreØkt();
    useEffect(() => {
        kandidatsøkØkt?.setØkt &&
            kandidatsøkØkt.setØkt({
                markerteKandidater: Array.from(markerteKandidater),
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markerteKandidater]);

    return (
        <Layout
            tittel="Kandidatsøk"
            ikon={<Piktogram />}
            banner={
                kontekstAvKandidatlisteEllerStilling ? (
                    <Kandidatlistebanner kontekst={kontekstAvKandidatlisteEllerStilling} />
                ) : undefined
            }
            knappIBanner={<TømFiltre />}
            sidepanel={<Filter />}
        >
            <PorteføljeTabs>
                <div className={css.hovedinnhold}>
                    <Kandidater
                        kontekstAvKandidatlisteEllerStilling={kontekstAvKandidatlisteEllerStilling}
                        markerteKandidater={markerteKandidater}
                        onMarkerKandidat={onMarkerKandidat}
                        fjernMarkering={fjernMarkering}
                        forrigeØkt={forrigeØkt}
                    />
                </div>
            </PorteføljeTabs>
        </Layout>
    );
};

export default Kandidatsøk;
