import { DownloadIcon } from '@navikt/aksel-icons';
import { Link as NavLink } from '@navikt/ds-react';

import { sendEvent } from 'felles/amplitude';
import LenkeTilAktivitetsplan from '../../../komponenter/lenke-til-aktivitetsplan/LenkeTilAktivitetsplan';
import { lastNedCvUrl } from '../../../utils/eksterneUrler';
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

export default Lenker;
