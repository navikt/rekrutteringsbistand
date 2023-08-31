import { FunctionComponent, ReactNode } from 'react';

import { Nettressurs, Nettstatus } from 'felles/nettressurs';
import css from './Kandidatmeny.module.css';
import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import LenkeTilAktivitetsplan from '../../../komponenter/lenke-til-aktivitetsplan/LenkeTilAktivitetsplan';
import { Button } from '@navikt/ds-react';
import { lastNedCvUrl } from '../../../utils/eksterneUrler';
import { sendEvent } from 'felles/amplitude';
import { DownloadIcon } from '@navikt/aksel-icons';

type Props = {
    cv: Nettressurs<KandidatCv>;
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
                            <Button
                                as="a"
                                variant="secondary"
                                href={`${lastNedCvUrl}${cv.data.fodselsnummer}`}
                                onClick={() => sendEvent('cv_last_ned', 'klikk')}
                                icon={<DownloadIcon aria-hidden />}
                            >
                                Last ned CV
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Kandidatmeny;
