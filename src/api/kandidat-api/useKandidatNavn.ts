import React from 'react';
import { postApi } from '../fetcher';
// import { hentKandidatFraPDL } from '../../api/kandidat-api/kandidat.api';
// import { kandidatNavnDTO } from '../../api/kandidat-api/kandidat.dto';
import { api } from '../../felles/api';
import { EsQuery } from '../../felles/domene/elastic/ElasticSearch';
import { hentKandidatFraPDL } from './hentKandidatFraPDL';

export enum KandidatKilde {
    REKRUTTERINGSBISTAND = 'REKRUTTERINGSBISTAND',
    PDL = 'PDL',
    FINNES_IKKE = 'FINNES_IKKE',
}

/**
 *
 * TODO Midlertidig kode til nytt hent navn endepunkt er på plass
 *
 */
const byggQueryFnr = (
    fodselsnummer: string
): EsQuery<{
    fodselsnummer: string;
}> => ({
    query: {
        term: {
            fodselsnummer,
        },
    },
    size: 1,
});

export type KandidatNavnDTO = {
    fornavn?: string;
    mellomnavn?: string | null;
    etternavn?: string;
    kandidatnr?: string | null;
};

export interface IuseKandidatNavnSøk extends KandidatNavnDTO {
    laster: boolean;
    kilde: KandidatKilde | null;
}
export const useKandidatNavnSøk = (fnr: string): IuseKandidatNavnSøk => {
    const [navneData, setNavneData] = React.useState<KandidatNavnDTO | null>(null);
    const [laster, setLaster] = React.useState<boolean>(true);
    const [kilde, setKilde] = React.useState<KandidatKilde | null>(null);

    const reset = () => {
        setLaster(true);
        setNavneData(null);
        setKilde(null);
    };

    const ingenTreff = () => {
        setKilde(KandidatKilde.FINNES_IKKE);
        setLaster(false);
    };

    React.useEffect(() => {
        const hentData = async () => {
            reset();
            const rekbisData = await postApi(api.kandidatsøk, byggQueryFnr(fnr));
            const rekbisKandidat = rekbisData?.hits?.hits[0]?._source;
            if (rekbisKandidat && rekbisKandidat.kandidatnr) {
                setNavneData(rekbisKandidat);
                setLaster(false);
                setKilde(KandidatKilde.REKRUTTERINGSBISTAND);
            } else {
                const response = await hentKandidatFraPDL(fnr);
                if (response.ok) {
                    const pdlData = await response.json();
                    if (pdlData[0]) {
                        setLaster(false);
                        setKilde(KandidatKilde.PDL);
                        setNavneData(pdlData[0]);
                    } else {
                        ingenTreff();
                    }
                } else {
                    ingenTreff();
                }
            }
        };
        hentData();
    }, [fnr]);

    return { ...navneData, laster, kilde };
};
