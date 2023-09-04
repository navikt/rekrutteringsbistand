import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, Link } from '@navikt/ds-react';
import { sendEvent } from 'felles/amplitude';
import { arbeidsrettetOppfølgingUrl } from 'felles/komponenter/lenker-til-modia/eksterneUrler';
import navigerMedAktivBrukerIModia from 'felles/komponenter/lenker-til-modia/navigerMedAktivBrukerIModia';
import { MouseEventHandler } from 'react';

type Props = {
    fnr: string;
    somKnapp: boolean;
};

const LenkeTilAktivitetsplan = ({ fnr, somKnapp }: Props) => {
    const lenke = arbeidsrettetOppfølgingUrl;

    const handleClick: MouseEventHandler = async (event) => {
        event.preventDefault();

        sendEvent('cv_aktivitetsplan_lenke', 'klikk');
        navigerMedAktivBrukerIModia(lenke, fnr);
    };

    if (somKnapp) {
        return (
            <Button
                as="a"
                target="_blank"
                href={lenke}
                variant="secondary"
                onClick={handleClick}
                icon={<ExternalLinkIcon aria-hidden />}
            >
                Se aktivitetsplan
            </Button>
        );
    } else {
        return (
            <Link target="_blank" href={lenke} onClick={handleClick}>
                Se aktivitetsplan
                <ExternalLinkIcon />
            </Link>
        );
    }
};

export default LenkeTilAktivitetsplan;
