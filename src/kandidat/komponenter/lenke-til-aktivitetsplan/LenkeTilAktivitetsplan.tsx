import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, Link } from '@navikt/ds-react';
import { sendEvent } from 'felles/amplitude';
import { api, post } from 'felles/api';
import { erIkkeProd } from 'felles/miljø';
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

        if (response.kind === Nettstatus.Feil) {
            throw new Error(
                'Klarte ikke å sette fnr-kontekst i modiacontextholder: ' + response.error.message
            );
        }

        const element = event.target as HTMLAnchorElement;
        window.open(element.href, '_blank');
    };

    const lenke = erIkkeProd ? arbeidsrettetOppfølgingUrl : `${arbeidsrettetOppfølgingUrl}/${fnr}`;

    return (
        <Link target="_blank" href={lenke} onClick={handleClick}>
            <Button as="a" variant="secondary" icon={<ExternalLinkIcon aria-hidden />}>
                Se aktivitetsplan
            </Button>
        </Link>
    );
};

export default LenkeTilAktivitetsplan;
