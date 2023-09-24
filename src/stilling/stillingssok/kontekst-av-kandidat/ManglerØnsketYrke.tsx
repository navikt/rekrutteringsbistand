import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, Heading } from '@navikt/ds-react';
import { sendEvent } from 'felles/amplitude';
import { dialogUrl } from 'felles/komponenter/lenker-til-modia/eksterneUrler';
import navigerMedAktivBrukerIModia from 'felles/komponenter/lenker-til-modia/navigerMedAktivBrukerIModia';
import { MouseEventHandler, useEffect } from 'react';
import css from './ManglerØnske.module.css';

type Props = {
    fnr: string;
};

const ManglerØnsketYrke = ({ fnr }: Props) => {
    const handleClick: MouseEventHandler = async (event) => {
        event.preventDefault();

        sendEvent('finn_stilling', 'gå_til_dialogen_i_modia');
        navigerMedAktivBrukerIModia(dialogUrl, fnr);
    };

    useEffect(() => {
        sendEvent('finn_stilling', 'mangler_ønsket_yrke');
    }, []);

    return (
        <div className={css.wrapper}>
            <Alert className={css.manglerØnsketBanner} fullWidth variant="info">
                <div className={css.innhold}>
                    <div>
                        <Heading spacing size="small" level="3">
                            Vi vet ikke hva kandidaten ønsker å jobbe med
                        </Heading>
                        <BodyLong>
                            For å få bedre stillinger, hør med kandidaten om hen kan legge til
                            jobbønsker i CV-sin. I mellomtiden viser vi deg resultater ut i fra hvor
                            kandidaten ønsker å jobbe.
                        </BodyLong>
                    </div>
                    <Button
                        size="small"
                        variant="secondary"
                        as="a"
                        href={dialogUrl}
                        onClick={handleClick}
                        icon={<ExternalLinkIcon />}
                        iconPosition="right"
                    >
                        Gå til dialogen i Modia
                    </Button>
                </div>
            </Alert>
        </div>
    );
};

export default ManglerØnsketYrke;
