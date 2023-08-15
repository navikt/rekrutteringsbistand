import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
import { sendEvent } from 'felles/amplitude';
import { api, post } from 'felles/api';
import { Nettstatus } from 'felles/nettressurs';
import { MouseEvent } from 'react';
import { arbeidsrettetOppfølgingUrl } from '../../utils/eksterneUrler';

type Props = {
    fnr: string;
};

const LenkeTilAktivitetsplan = ({ fnr }: Props) => {
    const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        sendEvent('cv_aktivitetsplan_lenke', 'klikk');

        const response = await post(`${api.modiaContextHolder}/context`, {
            verdi: fnr,
            eventType: 'NY_AKTIV_BRUKER',
        });

        if (response.kind !== Nettstatus.Suksess) {
            throw new Error('Klarte ikke å sette fnr-kontekst i modiacontextholder');
        }

        const element = event.target as HTMLAnchorElement;
        window.open(element.href, '_blank');
    };

    return (
        <Link target="_blank" href={arbeidsrettetOppfølgingUrl} onClick={handleClick}>
            Se aktivitetsplan
            <ExternalLinkIcon />
        </Link>
    );
};

export default LenkeTilAktivitetsplan;
