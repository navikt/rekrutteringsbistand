import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { NavKontorAction, NavKontorActionTypes } from '../state/navKontorReducer';
import { TilToppenKnapp } from '../komponenter/tilToppenKnapp/TilToppenKnapp';
import CvSide from '../cv/CvSide';
import Historikkside from '../historikk/Historikkside';
import Kandidatlisteoversikt from '../kandidatlisteoversikt/Kandidatlisteoversikt';
import KandidatlistesideMedStilling from '../kandidatliste/KandidatlistesideMedStilling';
import KandidatlisteUtenStilling from '../kandidatliste/KandidatlistesideUtenStilling';
import Kandidatside from '../kandidatside/Kandidatside';
import NotFound from '../komponenter/errorside/NotFound';
import Varsling from '../varsling/Varsling';
import ManglerTilgang from './ManglerTilgang';
import useNavKontor from '../../felles/store/navKontor';
import css from './App.module.css';

const App = () => {
    const dispatch = useDispatch();
    const { navKontor } = useNavKontor();

    useEffect(() => {
        dispatch<NavKontorAction>({
            type: NavKontorActionTypes.VelgNavKontor,
            valgtNavKontor: navKontor,
        });
    }, [navKontor, dispatch]);

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

export default App;
