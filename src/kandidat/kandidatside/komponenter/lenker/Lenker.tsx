import { DownloadIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

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
                <LenkeTilAktivitetsplan fnr={fødselsnummer} somKnapp={true} />
                <Button
                    as="a"
                    variant="secondary"
                    href={`${lastNedCvUrl}${fødselsnummer}`}
                    onClick={() => sendEvent('cv_last_ned', 'klikk')}
                    icon={<DownloadIcon aria-hidden />}
                >
                    Last ned CV
                </Button>
            </div>
        </div>
    );
};

export default Lenker;
