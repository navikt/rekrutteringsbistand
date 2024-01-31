import useSWR from 'swr';
import { postApi } from '../../../api/fetcher';
import { kandidatSøkEndepunkter } from '../../../api/kandidat-søk-api/kandidat-søk.api';

const useKandidatsammendrag = (kandidatnr: string) => {
    const swrData = useSWR(
        { path: kandidatSøkEndepunkter.kandidatsammendrag, kandidatnr },
        ({ path }) => postApi(path, { kandidatnr })
    );
    const kandidatsammendrag = swrData?.data?.hits?.hits[0]?._source;

    return { ...swrData, kandidatsammendrag };
};

export default useKandidatsammendrag;
