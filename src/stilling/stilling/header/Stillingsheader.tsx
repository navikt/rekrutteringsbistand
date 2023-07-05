import { ReactNode } from 'react';
import Kandidathandlinger from '../kandidathandlinger/Kandidathandlinger';
import css from './Stillingsheader.module.css';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs } from 'felles/nettressurs';

type Props = {
    kandidatliste: Nettressurs<Kandidatliste>;
    children: ReactNode;
};

const Stillingsheader = ({ kandidatliste, children }: Props) => (
    <div className={css.stillingsheader}>
        <Kandidathandlinger kandidatliste={kandidatliste} />
        <div className={css.knapper}>{children}</div>
    </div>
);

export default Stillingsheader;
