import { api } from 'felles/api';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import { useEffect, useState } from 'react';
import { formaterDatoTilApi } from './datoUtils';

export type Antall = {
    totalt: number;
    under30år: number;
    innsatsgruppeIkkeStandard: number;
};
export type Utfallsstatistikk = {
    antPresentasjoner: Antall;
    antFåttJobben: Antall;
    antallPresentert: number; // TODO Are: Slettes
    antallPresentertIPrioritertMålgruppe: number; // TODO Are: Slettes
    antallFåttJobben: number; // TODO Are: Slettes
    antallFåttJobbenIPrioritertMålgruppe: number; // TODO Are: Slettes
};

const useUtfallsstatistikk = (
    navKontor: string,
    fraOgMed: Date,
    tilOgMed: Date
): Nettressurs<Utfallsstatistikk> => {
    const [statistikk, setStatistikk] = useState<Nettressurs<Utfallsstatistikk>>({
        kind: Nettstatus.LasterInn,
    });

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
                const formidlinger = await respons.json();

                setStatistikk({
                    kind: Nettstatus.Suksess,
                    data: formidlinger,
                });
            } else {
                setStatistikk({
                    kind: Nettstatus.Feil,
                    error: {
                        message: 'Klarte ikke å hente inn statistikk',
                        status: respons.status,
                    },
                });
            }
        };
        hentData();
    }, [navKontor, fraOgMed, tilOgMed]);

    return statistikk;
};

export default useUtfallsstatistikk;
