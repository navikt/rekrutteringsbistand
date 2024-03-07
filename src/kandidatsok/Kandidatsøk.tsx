import { useEffect, useState } from 'react';

import Piktogram from 'felles/komponenter/piktogrammer/finn-kandidater.svg';
import Layout from '../felles/komponenter/layout/Layout';
import css from './Kandidatsøk.module.css';
import Filter from './filter/Filter';
import TømFiltre from './filter/TømFiltre';
import PorteføljeTabs from './filter/porteføljetabs/PorteføljeTabs';
import { KontekstAvKandidatlisteEllerStilling } from './hooks/useKontekstAvKandidatlisteEllerStilling';
import useLagreØkt from './hooks/useLagreØkt';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import Kandidater from './kandidater/Kandidater';
import Kandidatlistebanner from './kandidatlistebanner/Kandidatlistebanner';
import { Økt } from './Økt';

export type KandidatsøkProps = {
    forrigeØkt: Økt | null;
    setØkt: (økt: Økt) => void;
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling | null;
};

const Kandidatsøk = ({
    forrigeØkt,
    setØkt,
    kontekstAvKandidatlisteEllerStilling,
}: KandidatsøkProps) => {
    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater(
        forrigeØkt?.markerteKandidater
    );

    useLagreØkt();
    useEffect(() => {
        setØkt({
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
