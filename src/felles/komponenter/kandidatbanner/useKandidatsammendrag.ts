import useSWR from 'swr';
import { postApi } from '../../../api/fetcher';
import { kandidatSøkEndepunkter } from '../../../api/kandidat-søk-api/kandidat-søk.api';

interface IuseKandidatsammendrag {
    kandidatnr: string;
}

const useKandidatsammendrag = ({ kandidatnr }: IuseKandidatsammendrag) => {
    const { data: swrData } = useSWR(
        { path: kandidatSøkEndepunkter.kandidatsammendrag, kandidatnr },
        ({ path }) => postApi(path, { kandidatnr })
    );
    const kandidatsammendrag = swrData?.hits?.hits[0]?._source;

    return { ...swrData, kandidatsammendrag };
};

export default useKandidatsammendrag;
