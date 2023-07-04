import { useState, useEffect } from 'react';
import { formaterDatoTilApi } from './datoUtils';
import { api } from '../../felles/api';

type AntallFormidlingerInboundDto = {
    antallPresentert: number;
    antallFåttJobben: number;
};

const useUtfallsstatistikk = (navKontor: string, fraOgMed: Date, tilOgMed: Date) => {
    const [antallPresentert, setAntallPresentert] = useState<number>(0);
    const [antallFåttJobben, setAntallFåttJobben] = useState<number>(0);

    useEffect(() => {
        const url =
            `${api.statistikk}/statistikk?` +
            new URLSearchParams({
                fraOgMed: formaterDatoTilApi(fraOgMed),
                tilOgMed: formaterDatoTilApi(tilOgMed),
                navKontor,
            });

        const hentData = async () => {
            const respons = await fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
            });

            if (respons.ok) {
                const formidlinger: AntallFormidlingerInboundDto = await respons.json();

                setAntallPresentert(formidlinger.antallPresentert);
                setAntallFåttJobben(formidlinger.antallFåttJobben);
            }
        };
        hentData();
    }, [navKontor, fraOgMed, tilOgMed]);

    return { antallPresentert, antallFåttJobben };
};

export default useUtfallsstatistikk;
