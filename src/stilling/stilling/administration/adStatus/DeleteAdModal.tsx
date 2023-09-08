import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VarslingAction, VarslingActionType } from '../../../common/varsling/varslingReducer';
import { State } from '../../../redux/store';
import { DELETE_AD, HIDE_DELETE_AD_MODAL } from '../../adReducer';

const DeleteAdModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { showDeleteAdModal, hasDeletedAd } = useSelector((state: State) => state.ad);
    const title = useSelector((state: State) => state.adData?.title);

    useEffect(() => {
        if (hasDeletedAd) {
            navigate(
                {
                    pathname: `/stillinger/minestillinger`,
                },
                {
                    replace: true,
                }
            );

            dispatch<VarslingAction>({
                type: VarslingActionType.VisVarsling,
                innhold: `Slettet stilling ${title}`,
            });
        }
    }, [hasDeletedAd, title, dispatch, navigate]);

    const onClose = () => {
        dispatch({ type: HIDE_DELETE_AD_MODAL });
    };

    const onDeleteAdClick = () => {
        dispatch({ type: DELETE_AD });
    };

    return (
        <Modal
            open={showDeleteAdModal}
            onClose={onClose}
            header={{
                heading: 'Slett feilregistrert stilling og kandidatliste',
                closeButton: true,
            }}
        >
            <Modal.Body>
                <BodyLong spacing>
                    Denne funksjonen skal brukes når det er valgt feil bedrift. Stillinger og
                    kandidatlister som er slettet vises ikke i løsningen, og stillingen og
                    kandidatene vil ikke telles i statistikken.
                </BodyLong>
                <BodyLong spacing>
                    Er du sikker på at du ønsker å slette {title} og tilhørende kandidatliste?
                    Stillinger og kandidatlister som er slettet vises ikke i løsningen.
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onDeleteAdClick}>
                    Slett
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteAdModal;
