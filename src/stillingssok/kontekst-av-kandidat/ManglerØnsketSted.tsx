import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, Heading } from '@navikt/ds-react';
import { dialogUrl } from 'felles/komponenter/lenker-til-modia/eksterneUrler';
import navigerMedAktivBrukerIModia from 'felles/komponenter/lenker-til-modia/navigerMedAktivBrukerIModia';
import { MouseEventHandler } from 'react';
import css from './ManglerØnsketSted.module.css';

type Props = {
    fnr: string;
};

const ManglerØnsketSted = ({ fnr }: Props) => {
    const handleClick: MouseEventHandler = async (event) => {
        event.preventDefault();

        navigerMedAktivBrukerIModia(dialogUrl, fnr);
    };

    return (
        <Alert className={css.manglerØnsketSted} fullWidth variant="info">
            <div className={css.innhold}>
                <div>
                    <Heading spacing size="small" level="3">
                        Vi vet ikke hvor kandidaten ønsker å jobbe
                    </Heading>
                    <BodyLong>
                        For å få bedre stillinger, hør med kandidaten om vedkommende kan legge til
                        ønsket jobbsted i CV-en sin. I mellomtiden viser vi deg resultater ut i fra
                        kommunen der kandidaten bor.
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
    );
};

export default ManglerØnsketSted;
