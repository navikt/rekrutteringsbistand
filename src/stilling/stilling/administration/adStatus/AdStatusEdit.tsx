import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    PUBLISH_AD,
    SAVE_AD,
    PUBLISH_AD_CHANGES,
    SHOW_STOP_AD_MODAL,
    SHOW_DELETE_AD_MODAL,
    PREVIEW_EDIT_AD,
    FETCH_AD,
} from '../../adReducer';
import PublishErrorModal from './PublishErrorModal';
import css from './AdStatusEdit.module.css';
import StopAdModal from './StopAdModal';
import AdPublishedModal from './AdPublishedModal';
import SaveAdErrorModal from './SaveAdErrorModal';
import { Link } from 'react-router-dom';
import DeleteAdModal from './DeleteAdModal';
import Sletteknapp from './Sletteknapp';
import { Button } from '@navikt/ds-react';
import classNames from 'classnames';
import { Status, System } from '../../../domene/Stilling';

enum ButtonEnum {
    PUBLISH = 'PUBLISH',
    REPUBLISH = 'REPUBLISH',
    PUBLISH_CHANGES = 'PUBLISH_CHANGES',
    STOP = 'STOP',
    CANCEL = 'CANCEL',
    SAVE = 'SAVE',
    DELETE = 'DELETE',
}

const ButtonGroupEnum = {
    NEW_AD: 'NEW_AD',
    PUBLISHED_BEFORE: 'PUBLISHED_BEFORE',
    IS_PUBLISHED_NOW: 'IS_PUBLISHED_NOW',
    LIMITED_ACCESS: 'LIMITED_ACCESS',
};

const AdStatusEdit = () => {
    const dispatch = useDispatch();

    const [buttonClicked, setButtonClicked] = useState<ButtonEnum | undefined>(undefined);

    const adStatus = useSelector((state: any) => state.adData?.status);
    const createdBy = useSelector((state: any) => state.adData?.createdBy);
    const activationOnPublishingDate = useSelector(
        (state: any) => state.adData?.activationOnPublishingDate
    );
    const deactivatedByExpiry = useSelector((state: any) => state.adData?.deactivatedByExpiry);
    const isSavingAd = useSelector((state: any) => state.ad.isSavingAd);
    const uuid = useSelector((state: any) => state.adData?.uuid);
    const validation = useSelector((state: any) => state.adValidation.errors);

    const onPublishClick = () => {
        dispatch({ type: PUBLISH_AD });
        setButtonClicked(ButtonEnum.PUBLISH);
    };

    const onRePublishClick = () => {
        dispatch({ type: PUBLISH_AD });
        setButtonClicked(ButtonEnum.REPUBLISH);
    };

    const onPublishAdChangesClick = () => {
        dispatch({ type: PUBLISH_AD_CHANGES });
        setButtonClicked(ButtonEnum.PUBLISH_CHANGES);
    };

    const onStopClick = () => {
        dispatch({ type: SHOW_STOP_AD_MODAL });
        setButtonClicked(ButtonEnum.STOP);
    };

    const onDeleteClick = () => {
        dispatch({ type: SHOW_DELETE_AD_MODAL });
        setButtonClicked(ButtonEnum.DELETE);
    };

    const onSaveAdClick = () => {
        dispatch({ type: SAVE_AD, showModal: true });
        setButtonClicked(undefined);
    };

    const onSavePreviewAdClick = () => {
        dispatch({ type: SAVE_AD, showModal: true });
        if (!(validation && validation.notat)) {
            dispatch({ type: PREVIEW_EDIT_AD });
        }

        setButtonClicked(undefined);
    };

    const onCancelPreviewAdClick = () => {
        dispatch({ type: FETCH_AD, uuid, edit: false });
        setButtonClicked(undefined);
    };

    const isPublished =
        adStatus === Status.Aktiv || (adStatus === Status.Inaktiv && activationOnPublishingDate);
    const isExpired = adStatus === Status.Inaktiv && deactivatedByExpiry;
    const isStopping = buttonClicked === ButtonEnum.STOP && isSavingAd;
    const isDeleting = buttonClicked === ButtonEnum.DELETE && isSavingAd;
    const isPublishing = buttonClicked === ButtonEnum.PUBLISH && isSavingAd;
    const isRePublishing = buttonClicked === ButtonEnum.REPUBLISH && isSavingAd;
    const isPublishingChanges = buttonClicked === ButtonEnum.PUBLISH_CHANGES && isSavingAd;
    const canSave = !isPublished && !isExpired && !isSavingAd;
    const publishingRights = createdBy === System.Rekrutteringsbistand;

    let buttonState = ButtonGroupEnum.NEW_AD;
    if (!publishingRights) {
        buttonState = ButtonGroupEnum.LIMITED_ACCESS;
    } else {
        if (isExpired || (adStatus === Status.Stoppet && !isStopping) || isRePublishing) {
            buttonState = ButtonGroupEnum.PUBLISHED_BEFORE;
        } else if ((isPublished && !isPublishing) || isStopping || isPublishingChanges) {
            buttonState = ButtonGroupEnum.IS_PUBLISHED_NOW;
        }
    }

    return (
        <div>
            <PublishErrorModal />
            <StopAdModal />
            <DeleteAdModal />
            <AdPublishedModal stillingId={uuid} />
            <SaveAdErrorModal />
            {buttonState === ButtonGroupEnum.LIMITED_ACCESS && (
                <div className={css.knapper}>
                    <Button onClick={onSavePreviewAdClick} className={css.knapp}>
                        Lagre endringer
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={onCancelPreviewAdClick}
                        className={css.knapp}
                    >
                        Avbryt
                    </Button>
                </div>
            )}
            {buttonState === ButtonGroupEnum.NEW_AD && (
                <>
                    <Button onClick={onPublishClick} loading={isPublishing} className={css.knapp}>
                        Publiser
                    </Button>
                    <div className={css.knapper}>
                        <AvbrytKnapp />
                        <Sletteknapp onDeleteClick={onDeleteClick} isDeleting={isDeleting} />
                    </div>
                </>
            )}
            {buttonState === ButtonGroupEnum.PUBLISHED_BEFORE && (
                <>
                    <Button
                        onClick={onRePublishClick}
                        loading={isRePublishing}
                        className={css.knapp}
                    >
                        Republiser stilling
                    </Button>
                    <div className={css.knapper}>
                        <AvbrytKnapp />
                        <Sletteknapp onDeleteClick={onDeleteClick} isDeleting={isDeleting} />
                    </div>
                </>
            )}
            {buttonState === ButtonGroupEnum.IS_PUBLISHED_NOW && (
                <>
                    <Button
                        onClick={onPublishAdChangesClick}
                        loading={isPublishingChanges}
                        className={css.knapp}
                    >
                        Publiser endringer
                    </Button>
                    <div className={css.knapper}>
                        <Button onClick={onStopClick} loading={isStopping} className={css.knapp}>
                            Stopp stilling
                        </Button>
                        <Sletteknapp onDeleteClick={onDeleteClick} isDeleting={isDeleting} />
                    </div>
                    <div>
                        <AvbrytKnapp />
                    </div>
                </>
            )}
            {canSave && (
                <div className={css.knapp}>
                    <Button
                        variant="tertiary-neutral"
                        onClick={onSaveAdClick}
                        className={classNames(css.lagreMidlertidig, css.knapp)}
                    >
                        Lagre og fortsett senere
                    </Button>
                </div>
            )}
        </div>
    );
};

const AvbrytKnapp = () => (
    <Link
        className={classNames(
            'navds-button',
            'navds-button--secondary',
            'navds-button--small',
            css.avbrytLink,
            css.knapp
        )}
        to="/stillinger/minestillinger"
    >
        Avbryt
    </Link>
);

export default AdStatusEdit;
