import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { ReporteeAction, ReporteeActionType } from './reportee/ReporteeAction';
import Varsling from './common/varsling/Varsling';
import store from './redux/store';

if (import.meta.env.VITE_MOCK) {
    await import('./mock/mock-api');
}

type Props = {
    children: ReactNode;
};

const AppMedProvider = ({ children }: Props) => (
    <Provider store={store}>
        <App>{children}</App>
    </Provider>
);

const App = ({ children }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<ReporteeAction>({ type: ReporteeActionType.FetchReportee });
    }, [dispatch]);

    return (
        <>
            <Varsling />
            {children}
        </>
    );
};

export default AppMedProvider;
