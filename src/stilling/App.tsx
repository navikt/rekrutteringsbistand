import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Navigate, Route, Routes } from 'react-router-dom';
import Appfeil from '../felles/komponenter/feilmelding/Appfeil';
import Varsling from './common/varsling/Varsling';
import { ReporteeAction, ReporteeActionType } from './reportee/ReporteeAction';
import Stilling from './stilling/Stilling';
import Stillingssøk from './stillingssok/Stillingssøk';
import { Component as StillingsSøkIndex } from './stillingssok/index';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<ReporteeAction>({ type: ReporteeActionType.FetchReportee });
    }, [dispatch]);

    return (
        <>
            <Varsling />
            <Routes>
                <Route
                    path="stillingssok/kandidat/:kandidat"
                    element={<Stillingssøk />}
                    errorElement={<Appfeil />}
                />

                <Route
                    path="minestillinger"
                    element={<Navigate to="/stillingssok?portefolje=visMine" />}
                />

                <Route path="stillingssok" element={<StillingsSøkIndex />} />
                <Route path="stilling/:uuid" element={<Stilling />} />
            </Routes>
        </>
    );
};

export default App;
