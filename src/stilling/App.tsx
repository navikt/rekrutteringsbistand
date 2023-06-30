import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { ReporteeAction, ReporteeActionType } from './reportee/ReporteeAction';
import Varsling from './common/varsling/Varsling';
import MineStillinger from './mine-stillinger/MineStillinger';
import Stilling from './stilling/Stilling';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<ReporteeAction>({ type: ReporteeActionType.FetchReportee });
    }, [dispatch]);

    return (
        <>
            <Varsling />
            <Routes>
                <Route path="minestillinger" element={<MineStillinger />} />
                <Route path="stilling/:uuid" element={<Stilling />} />
            </Routes>
        </>
    );
};

export default App;
