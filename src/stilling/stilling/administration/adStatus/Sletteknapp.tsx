import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { Button } from '@navikt/ds-react';
import css from './AdStatusEdit.module.css';

type Props = {
    onDeleteClick: () => void;
    isDeleting: boolean;
};

const Sletteknapp: FunctionComponent<Props> = ({ onDeleteClick, isDeleting }) => {
    const innloggetBrukerident = useSelector((state: State) => state.reportee.data)?.navIdent;
    const stillingensNavIdent = useSelector(
        (state: State) => state.adData?.administration?.navIdent
    );
    const erEier = innloggetBrukerident === stillingensNavIdent;

    if (!erEier) return null;

    return (
        <Button
            variant="secondary"
            onClick={onDeleteClick}
            loading={isDeleting}
            className={css.knapp}
        >
            Slett stilling
        </Button>
    );
};

export default Sletteknapp;
