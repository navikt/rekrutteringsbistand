import React from 'react';
import { postApi } from '../../api/fetcher';
import { kandidatEndepunkter } from '../../api/kandidat-api/kandidat.api';
import { kandidatNavnDTO } from '../../api/kandidat-api/kandidatNavn/kandidatNav.dto';
import { api } from '../api';
import { EsQuery } from '../domene/elastic/ElasticSearch';

export enum KandidatKilde {
    REKRUTTERINGSBISTAND = 'REKRUTTERINGSBISTAND',
    PDL = 'PDL',
    FINNES_IKKE = 'FINNES_IKKE',
}

//todo midlertidig:
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

export interface IuseKandidatNavnSøk extends kandidatNavnDTO {
    laster: boolean;
    kilde: KandidatKilde;
}
export const useKandidatNavnSøk = (fnr: string): IuseKandidatNavnSøk => {
    const [navneData, setNavneData] = React.useState<kandidatNavnDTO>(null);
    const [laster, setLaster] = React.useState<boolean>(false);
    const [kilde, setKilde] = React.useState<KandidatKilde>(null);

    const reset = () => {
        setLaster(true);
        setNavneData(null);
        setKilde(null);
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
                const pdlData = await postApi(kandidatEndepunkter.kandidatNavn, fnr);
                if (pdlData[0]) {
                    setLaster(false);
                    setKilde(KandidatKilde.PDL);
                    setNavneData(pdlData[0]);
                } else {
                    setKilde(KandidatKilde.FINNES_IKKE);
                    setLaster(false);
                }
            }
        };
        hentData();
    }, [fnr]);

    return { ...navneData, laster, kilde };
};
