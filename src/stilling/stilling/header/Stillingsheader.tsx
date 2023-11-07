import { ReactNode } from 'react';
import Kandidathandlinger from '../kandidathandlinger/Kandidathandlinger';
import css from './Stillingsheader.module.css';
import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';

type Props = {
    kandidatliste: Nettressurs<Kandidatliste>;
    children: ReactNode;
};

// TODO: Vi trenger ikke sende inn nettressurs om vi kun viser komponenten når vi har kind = success
const Stillingsheader = ({ kandidatliste, children }: Props) => (
    <div className={css.stillingsheader}>
        {kandidatliste.kind === Nettstatus.Suksess && (
            <Kandidathandlinger kandidatliste={kandidatliste} />
        )}

        <div className={css.knapper}>{children}</div>
    </div>
);

export default Stillingsheader;
