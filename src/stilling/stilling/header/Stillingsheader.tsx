import { ReactNode } from 'react';
import { Nettressurs } from '../../api/Nettressurs';
import { Kandidatliste } from '../legg-til-kandidat-modal/kandidatlistetyper';
import Kandidathandlinger from '../kandidathandlinger/Kandidathandlinger';
import css from './Stillingsheader.module.css';

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
