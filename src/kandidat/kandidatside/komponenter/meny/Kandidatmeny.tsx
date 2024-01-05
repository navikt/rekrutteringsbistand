import { DownloadIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { FunctionComponent, ReactNode } from 'react';

import { sendEvent } from 'felles/amplitude';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { Miljø, getMiljø } from 'felles/miljø';
import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import LenkeTilAktivitetsplan from '../lenker/LenkeTilAktivitetsplan';
import css from './Kandidatmeny.module.css';

type Props = {
    cv: Nettressurs<Kandidat>;
    tabs: ReactNode;
    children?: ReactNode;
};

const Kandidatmeny: FunctionComponent<Props> = ({ cv, tabs, children }) => {
    return (
        <div className={css.wrapper}>
            <div className={css.meny}>
                <nav className={css.faner}>{tabs}</nav>
                <div className={css.menyvalg}>
                    {children}
                    {cv.kind === Nettstatus.Suksess && (
                        <>
                            <LenkeTilAktivitetsplan fnr={cv.data.fodselsnummer} somKnapp={true} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Kandidatmeny;
