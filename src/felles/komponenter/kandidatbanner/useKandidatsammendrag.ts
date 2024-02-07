import useSWR from 'swr';
import { postApi } from '../../../api/fetcher';
import { kandidatSøkEndepunkter } from '../../../api/kandidat-søk-api/kandidat-søk.api';
import { Kandidatsammendrag } from '../../../api/kandidat-søk-api/kandidat-søk-dto';

interface IuseKandidatsammendrag {
    kandidatnr: string;
}

interface IUseKandidatsammendragRetur {
    kandidatsammendrag: Kandidatsammendrag | null;
    isLoading: boolean;
    error: any;
}

const useKandidatsammendrag = ({
    kandidatnr,
}: IuseKandidatsammendrag): IUseKandidatsammendragRetur => {
    const { data: swrData } = useSWR(
        { path: kandidatSøkEndepunkter.kandidatsammendrag, kandidatnr },
        ({ path }) => postApi(path, { kandidatnr })
    );
    const kandidatsammendrag: Kandidatsammendrag | null = swrData?.hits?.hits[0]?._source;

    return { ...swrData, kandidatsammendrag };
};

export default useKandidatsammendrag;
