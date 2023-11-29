import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Route, Routes } from 'react-router-dom';
import Varsling from './common/varsling/Varsling';
import { ReporteeAction, ReporteeActionType } from './reportee/ReporteeAction';
import Stilling from './stilling/Stilling';
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
                <Route path="stillingssok/*" element={<StillingsSøkIndex />} />
                <Route path="stillingssok/kandidat/:kandidat" element={<StillingsSøkIndex />} />
                <Route path="stilling/:uuid/:fane?" element={<Stilling />} />
            </Routes>
        </>
    );
};

export default App;
