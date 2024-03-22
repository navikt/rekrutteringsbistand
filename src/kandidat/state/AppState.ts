import { KandidatlisteState } from '../kandidatliste/reducer/kandidatlisteReducer';
import { ErrorState } from './errorReducer';

type AppState = {
    enhetsregister: any;
    kandidatliste: KandidatlisteState;
    error: ErrorState;
};

export default AppState;
