import { KandidatlisteState } from '../kandidatliste/reducer/kandidatlisteReducer';
import { VarslingState } from '../varsling/varslingReducer';
import { ErrorState } from './errorReducer';

type AppState = {
    enhetsregister: any;
    kandidatliste: KandidatlisteState;
    varsling: VarslingState;
    error: ErrorState;
};

export default AppState;
