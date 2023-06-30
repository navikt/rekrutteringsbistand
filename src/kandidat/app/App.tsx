import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { NavKontorAction, NavKontorActionTypes } from '../state/navKontorReducer';
import { TilToppenKnapp } from '../komponenter/tilToppenKnapp/TilToppenKnapp';
import { ErrorAction, ErrorActionType } from '../state/errorReducer';
import AppState from '../state/AppState';
import CvSide from '../cv/CvSide';
import Historikkside from '../historikk/Historikkside';
import Kandidatlisteoversikt from '../kandidatlisteoversikt/Kandidatlisteoversikt';
import KandidatlistesideMedStilling from '../kandidatliste/KandidatlistesideMedStilling';
import KandidatlisteUtenStilling from '../kandidatliste/KandidatlistesideUtenStilling';
import Kandidatside from '../kandidatside/Kandidatside';
import NotFound from '../komponenter/errorside/NotFound';
import Varsling from '../varsling/Varsling';
import ManglerTilgang from './ManglerTilgang';
import css from './App.module.css';

const App = () => {
    return (
        <>
            <Varsling />
            <div className={css.app}>
                <main className={css.main}>
                    <Routes>
                        <Route path="mangler-tilgang" element={<ManglerTilgang />} />

                        <Route path="lister" element={<Kandidatlisteoversikt />} />
                        <Route
                            path="lister/stilling/:id/detaljer"
                            element={<KandidatlistesideMedStilling />}
                        />
                        <Route
                            path="lister/detaljer/:listeid"
                            element={<KandidatlisteUtenStilling />}
                        />
                        <Route path="kandidat/:kandidatnr" element={<Kandidatside />}>
                            <Route path="cv" element={<CvSide />} />
                            <Route path="historikk" element={<Historikkside />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
            <TilToppenKnapp />
        </>
    );
};

const mapStateToProps = (state: AppState) => ({
    error: state.error.error,
});

const mapDispatchToProps = (dispatch: Dispatch<ErrorAction | NavKontorAction>) => ({
    fjernError: () => dispatch({ type: ErrorActionType.FjernError }),
    velgNavKontor: (valgtNavKontor: string) =>
        dispatch({ type: NavKontorActionTypes.VelgNavKontor, valgtNavKontor }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
