import { ReactNode } from 'react';
import Kandidathandlinger from '../kandidathandlinger/Kandidathandlinger';
import css from './Stillingsheader.module.css';

type Props = {
    kandidatlisteId: string;
    children: ReactNode;
    erEier: boolean;
    erFormidling: boolean;
};

const Stillingsheader = ({ kandidatlisteId, children, erEier, erFormidling }: Props) => (
    <div className={css.stillingsheader}>
        <div>
            {(erEier || !erFormidling) && (
                <Kandidathandlinger erEier={erEier} kandidatlisteId={kandidatlisteId} />
            )}
        </div>
        <div className={css.knapper}>{children}</div>
    </div>
);

export default Stillingsheader;
