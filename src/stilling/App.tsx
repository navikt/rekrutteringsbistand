import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { ReporteeAction, ReporteeActionType } from './reportee/ReporteeAction';
import Varsling from './common/varsling/Varsling';
import createReduxStore from './redux/store';

if (import.meta.env.VITE_MOCK) {
    await import('./mock/api');
}

type Props = {
    children: ReactNode;
};

export const store = createReduxStore();

const App = ({ children }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<ReporteeAction>({ type: ReporteeActionType.FetchReportee });
    }, [dispatch]);

    return (
        <Provider store={store}>
            <Varsling />
            {children}
        </Provider>
    );
};

export default App;
