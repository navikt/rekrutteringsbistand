import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import KandidatlisteActionType from '../reducer/KandidatlisteActionType';

const useHentSendteMeldinger = ({ stillingId }: { stillingId: string | null }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (stillingId === null) {
            dispatch({
                type: KandidatlisteActionType.ResetSendSmsStatus,
            });
        } else {
            dispatch({
                type: KandidatlisteActionType.HentSendteMeldinger,
                stillingId: stillingId,
            });
        }
    }, [dispatch, stillingId]);
};

export default useHentSendteMeldinger;
