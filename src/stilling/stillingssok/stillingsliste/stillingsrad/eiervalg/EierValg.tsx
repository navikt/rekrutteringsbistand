import { Button, Tooltip } from '@navikt/ds-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    EsStilling,
    stillingErUtløpt,
    stillingKommerTilÅBliAktiv,
} from '../../../../../felles/domene/stilling/EsStilling';
import { Status } from '../../../../../felles/domene/stilling/Stilling';
import { getAdStatusLabel } from '../../../../common/enums/getEnumLabels';
import { REDIGERINGSMODUS_QUERY_PARAM } from '../../../../stilling/Stilling';
import { COPY_AD_FROM_MY_ADS, SHOW_STOP_MODAL_MY_ADS } from '../../../../stilling/adReducer';

export interface IEierValg {
    stilling: EsStilling;
    stopAd: (uuid: string) => void;
    copyAd: (uuid: string) => void;
}

const EierValg: React.FC<IEierValg> = ({ stilling, stopAd, copyAd }) => {
    const navigate = useNavigate();
    const onItemClick = (action) => {
        action(stilling.uuid);
    };

    const kanStoppeStilling =
        stilling.status === Status.Aktiv || stillingKommerTilÅBliAktiv(stilling);

    return (
        <>
            <Button
                onClick={() =>
                    navigate(
                        `/stillinger/stilling/${stilling.uuid}?${REDIGERINGSMODUS_QUERY_PARAM}=true`
                    )
                }
                variant="tertiary"
            >
                Rediger
            </Button>

            <Button onClick={() => onItemClick(copyAd)} variant="tertiary">
                Kopier
            </Button>
            {!kanStoppeStilling ? (
                <Tooltip
                    content={`Du kan ikke stoppe en stilling som har status: "${getAdStatusLabel(
                        stilling.status,
                        stillingErUtløpt(stilling)
                    ).toLowerCase()}"`}
                >
                    <Button disabled variant="tertiary">
                        Stopp
                    </Button>
                </Tooltip>
            ) : (
                <Button onClick={() => onItemClick(stopAd)} variant="tertiary">
                    Stopp
                </Button>
            )}
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    stopAd: (uuid: string) => dispatch({ type: SHOW_STOP_MODAL_MY_ADS, uuid }),
    copyAd: (uuid: string) => dispatch({ type: COPY_AD_FROM_MY_ADS, uuid }),
});

export default connect(null, mapDispatchToProps)(EierValg);
