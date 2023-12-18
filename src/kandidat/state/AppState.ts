import { KandidatlisteState } from '../kandidatliste/reducer/kandidatlisteReducer';
import { CvState } from '../kandidatside/cv/reducer/cvReducer';
import { HistorikkState } from '../kandidatside/historikk/historikkReducer';
import { VarslingState } from '../varsling/varslingReducer';
import { ErrorState } from './errorReducer';

type AppState = {
    cv: CvState;
    enhetsregister: any;
    historikk: HistorikkState;
    kandidatliste: KandidatlisteState;
    varsling: VarslingState;
    error: ErrorState;
};

export default AppState;
