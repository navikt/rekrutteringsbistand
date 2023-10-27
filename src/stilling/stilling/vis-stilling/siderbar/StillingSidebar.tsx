import { ArrowForwardIcon, PrinterSmallIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import Kandidatliste from '../../../../felles/domene/kandidatliste/Kandidatliste';
import KandidaterForStilling from './KandidaterForStilling';
import css from './StillingSidebar.module.css';
export interface IStillingSidebar {
    kandidatnrFraStillingssøk?: string;
    kandidatliste: Kandidatliste;
}

const StillingSidebar: React.FC<IStillingSidebar> = ({
    kandidatnrFraStillingssøk,
    kandidatliste,
}) => {
    return (
        <div className={css.sidebarWrapper}>
            <div>
                {kandidatnrFraStillingssøk ? (
                    <Button className={css.fullWidthButton} variant="primary">
                        Anbefal kandidat
                    </Button>
                ) : (
                    <Button className={css.fullWidthButton} variant="primary">
                        Finn kandidater
                    </Button>
                )}
                <div className={css.flexButtonBox}>
                    <Button
                        className={css.fullWidthButton}
                        icon={<ArrowForwardIcon />}
                        variant="secondary"
                    >
                        Del med kandidat
                    </Button>
                    <Button
                        className={css.fullWidthButton}
                        icon={<PrinterSmallIcon />}
                        variant="secondary"
                    >
                        Skriv ut
                    </Button>
                </div>
            </div>
            <KandidaterForStilling kandidater={kandidatliste.kandidater} />
        </div>
    );
};

export default StillingSidebar;
