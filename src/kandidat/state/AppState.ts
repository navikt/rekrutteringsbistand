import { KandidatlisteState } from '../kandidatliste/reducer/kandidatlisteReducer';
import { HistorikkState } from '../kandidatside/historikk/historikkReducer';
import { VarslingState } from '../varsling/varslingReducer';
import { ErrorState } from './errorReducer';

type AppState = {
    enhetsregister: any;
    historikk: HistorikkState;
    kandidatliste: KandidatlisteState;
    varsling: VarslingState;
    error: ErrorState;
};

export default AppState;
