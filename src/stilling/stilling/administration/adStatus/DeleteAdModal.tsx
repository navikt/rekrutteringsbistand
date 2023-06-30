import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BodyLong, Button, Heading } from '@navikt/ds-react';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_AD, HIDE_DELETE_AD_MODAL } from '../../adReducer';
import { State } from '../../../redux/store';
import { VarslingAction, VarslingActionType } from '../../../common/varsling/varslingReducer';
import css from './DeleteAdModal.module.css';
import Modal from '../../../common/modal/Modal';

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
        <Modal open={showDeleteAdModal} onClose={onClose} closeButton>
            <Heading level="2" size="small" spacing>
                Slett feilregistrert stilling og kandidatliste
            </Heading>
            <BodyLong spacing>
                Denne funksjonen skal brukes når det er valgt feil bedrift. Stillinger og
                kandidatlister som er slettet vises ikke i løsningen, og stillingen og kandidatene
                vil ikke telles i statistikken.
            </BodyLong>
            <BodyLong spacing>
                Er du sikker på at du ønsker å slette {title} og tilhørende kandidatliste?
                Stillinger og kandidatlister som er slettet vises ikke i løsningen.
            </BodyLong>
            <div className={css.knapper}>
                <Button variant="primary" onClick={onDeleteAdClick}>
                    Slett
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteAdModal;
