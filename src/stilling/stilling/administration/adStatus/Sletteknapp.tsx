import { Button } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ApplikasjonContext } from '../../../../felles/ApplikasjonContext';
import { State } from '../../../redux/store';
import css from './AdStatusEdit.module.css';

type Props = {
    onDeleteClick: () => void;
    isDeleting: boolean;
};

const Sletteknapp: FunctionComponent<Props> = ({ onDeleteClick, isDeleting }) => {
    const { eierSjekk } = useContext(ApplikasjonContext);
    const stilling = useSelector((state: State) => state.adData);
    const erEier = eierSjekk(stilling);

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
