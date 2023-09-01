import { KandidatlisteState } from '../kandidatliste/reducer/kandidatlisteReducer';
import { ListeoversiktState } from '../kandidatlisteoversikt/reducer/listeoversiktReducer';
import { CvState } from '../kandidatside/cv/reducer/cvReducer';
import { HistorikkState } from '../kandidatside/historikk/historikkReducer';
import { VarslingState } from '../varsling/varslingReducer';
import { ErrorState } from './errorReducer';

type AppState = {
    cv: CvState;
    enhetsregister: any;
    historikk: HistorikkState;
    kandidatliste: KandidatlisteState;
    listeoversikt: ListeoversiktState;
    varsling: VarslingState;
    error: ErrorState;
};

export default AppState;
