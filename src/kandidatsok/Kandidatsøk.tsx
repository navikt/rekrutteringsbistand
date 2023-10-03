import { useEffect, useState } from 'react';

import Kandidat from 'felles/domene/kandidat/Kandidat';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { InnloggetBruker } from 'felles/hooks/useInnloggetBruker';
import { ReactComponent as Piktogram } from 'felles/komponenter/piktogrammer/finn-kandidater.svg';
import Layout from '../felles/komponenter/layout/Layout';
import css from './Kandidatsøk.module.css';
import Filter from './filter/Filter';
import TømFiltre from './filter/TømFiltre';
import PorteføljeTabs from './filter/porteføljetabs/PorteføljeTabs';
import { KontekstAvKandidatlisteEllerStilling } from './hooks/useKontekstAvKandidatlisteEllerStilling';
import useLagreØkt from './hooks/useLagreØkt';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import Kandidater from './kandidater/Kandidater';
import LagreKandidaterIMineKandidatlisterModal from './kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import LagreKandidaterISpesifikkKandidatlisteModal from './kandidatliste/LagreKandidaterISpesifikkKandidatlisteModal';
import Kandidatlistebanner from './kandidatlistebanner/Kandidatlistebanner';
import { Økt } from './Økt';

export type KandidatsøkProps = {
    forrigeØkt: Økt | null;
    setØkt: (økt: Økt) => void;
    innloggetBruker: InnloggetBruker;
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling | null;
    navKontor: string | null;
};

enum Modal {
    IngenModal,
    LagreIMineKandidatlister,
    BekreftLagreIKandidatliste,
}

const Kandidatsøk = ({
    forrigeØkt,
    setØkt,
    innloggetBruker,
    kontekstAvKandidatlisteEllerStilling,
}: KandidatsøkProps) => {
    const [aktivModal, setAktivModal] = useState<Modal>(Modal.IngenModal);
    const [kandidaterPåSiden, setKandidaterPåSiden] = useState<Kandidat[]>([]);
    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater(
        forrigeØkt?.markerteKandidater
    );

    useLagreØkt(innloggetBruker);
    useEffect(() => {
        setØkt({
            markerteKandidater: Array.from(markerteKandidater),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markerteKandidater]);

    const onLagreIKandidatlisteClick = () => {
        setAktivModal(
            kontekstAvKandidatlisteEllerStilling
                ? Modal.BekreftLagreIKandidatliste
                : Modal.LagreIMineKandidatlister
        );
    };

    const onSuccessLagretKandidaterISpesifikkKandidatliste = (
        oppdatertKandidatliste: Kandidatliste
    ) => {
        fjernMarkering();
        kontekstAvKandidatlisteEllerStilling?.setOppdatertKandidatliste(oppdatertKandidatliste);
    };

    return (
        <Layout
            tittel="Kandidatsøk"
            ikon={<Piktogram />}
            banner={
                kontekstAvKandidatlisteEllerStilling && (
                    <Kandidatlistebanner kontekst={kontekstAvKandidatlisteEllerStilling} />
                )
            }
            knappIBanner={<TømFiltre />}
            sidepanel={<Filter />}
        >
            <PorteføljeTabs>
                <div className={css.hovedinnhold}>
                    <Kandidater
                        innloggetBruker={innloggetBruker}
                        kontekstAvKandidatlisteEllerStilling={kontekstAvKandidatlisteEllerStilling}
                        onLagreIKandidatlisteClick={onLagreIKandidatlisteClick}
                        markerteKandidater={markerteKandidater}
                        onMarkerKandidat={onMarkerKandidat}
                        fjernMarkering={fjernMarkering}
                        forrigeØkt={forrigeØkt}
                        setKandidaterPåSiden={setKandidaterPåSiden}
                    />
                </div>
            </PorteføljeTabs>
            {kontekstAvKandidatlisteEllerStilling === null ? (
                <LagreKandidaterIMineKandidatlisterModal
                    vis={aktivModal === Modal.LagreIMineKandidatlister}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    kandidaterPåSiden={kandidaterPåSiden}
                />
            ) : (
                <LagreKandidaterISpesifikkKandidatlisteModal
                    vis={aktivModal === Modal.BekreftLagreIKandidatliste}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    kontekstAvKandidatlisteEllerStilling={kontekstAvKandidatlisteEllerStilling}
                    onSuksess={onSuccessLagretKandidaterISpesifikkKandidatliste}
                />
            )}
        </Layout>
    );
};

export default Kandidatsøk;
