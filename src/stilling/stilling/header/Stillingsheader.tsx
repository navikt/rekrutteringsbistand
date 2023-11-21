import { ReactNode } from 'react';
import Kandidathandlinger from '../kandidathandlinger/Kandidathandlinger';
import css from './Stillingsheader.module.css';

type Props = {
    kandidatlisteId: string;
    children: ReactNode;
    erEier: boolean;
};

const Stillingsheader = ({ kandidatlisteId, children, erEier }: Props) => (
    <div className={css.stillingsheader}>
        <div>
            <Kandidathandlinger erEier={erEier} kandidatlisteId={kandidatlisteId} />
        </div>
        <div className={css.knapper}>{children}</div>
    </div>
);

export default Stillingsheader;
