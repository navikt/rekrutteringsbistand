import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
import { sendEvent } from 'felles/amplitude';
import { arbeidsrettetOppfølgingUrl } from 'felles/komponenter/lenker-til-modia/eksterneUrler';
import navigerMedAktivBrukerIModia from 'felles/komponenter/lenker-til-modia/navigerMedAktivBrukerIModia';
import { erIkkeProd } from 'felles/miljø';
import { MouseEvent } from 'react';

type Props = {
    fnr: string;
};

const LenkeTilAktivitetsplan = ({ fnr }: Props) => {
    const handleClick = async (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        sendEvent('cv_aktivitetsplan_lenke', 'klikk');

        const element = event.target as HTMLAnchorElement;
        navigerMedAktivBrukerIModia(element.href, fnr);
    };

    const lenke = erIkkeProd ? arbeidsrettetOppfølgingUrl : `${arbeidsrettetOppfølgingUrl}/${fnr}`;

    return (
        <Link target="_blank" href={lenke} onClick={handleClick}>
            Se aktivitetsplan
            <ExternalLinkIcon />
        </Link>
    );
};

export default LenkeTilAktivitetsplan;
