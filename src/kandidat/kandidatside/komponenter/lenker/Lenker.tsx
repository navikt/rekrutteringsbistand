import { DownloadIcon } from '@navikt/aksel-icons';
import { Link as NavLink } from '@navikt/ds-react';

import { sendEvent } from 'felles/amplitude';
import { Miljø, getMiljø } from 'felles/miljø';
import LenkeTilAktivitetsplan from './LenkeTilAktivitetsplan';
import css from './Lenker.module.css';

type Props = {
    fødselsnummer: string;
    className: string;
};

const Lenker = ({ fødselsnummer, className }: Props) => {
    return (
        <div className={className}>
            <div className={css.lenker}>
                <LenkeTilAktivitetsplan fnr={fødselsnummer} />
                <NavLink
                    target="_blank"
                    href={`${lastNedCvUrl}${fødselsnummer}`}
                    onClick={() => sendEvent('cv_last_ned', 'klikk')}
                >
                    Last ned CV
                    <DownloadIcon />
                </NavLink>
            </div>
        </div>
    );
};

export const lastNedCvUrl =
    getMiljø() === Miljø.ProdGcp
        ? 'https://pam-personbruker-veileder.intern.nav.no/cv/pdf?fnr='
        : 'https://pam-personbruker-veileder.intern.dev.nav.no/cv/pdf?fnr=';

export default Lenker;
