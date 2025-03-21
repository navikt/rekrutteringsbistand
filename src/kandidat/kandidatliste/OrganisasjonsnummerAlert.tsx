import { Alert, BodyLong, Box, Heading, Link, List } from '@navikt/ds-react';
import css from './OrganisasjonsnummerAlert.module.css';

const OrganisasjonsnummerAlert = () => (
    <div className={css.organisasjonsnummeralert}>
        <Alert variant="warning">
            <Heading level="3" size="medium" spacing>
                Stillingen har fått nytt organisasjonsnummer
            </Heading>
            <BodyLong className={css.beskrivelse}>
                Organisasjonsnummeret til stillingen har blitt endret i et annet system. Det kan
                føre til at CVer deles med feil organisasjon.
            </BodyLong>

            <Box paddingBlock="4">
                <Heading level="4" size="small">
                    Hva betyr det for meg?
                </Heading>
                <BodyLong>
                    Har du lagt til kandidater på stillingen blir de delt med den forrige
                    organisasjonen. Deler du CVene deres, vil det føre til personvernsbrudd.
                </BodyLong>
            </Box>

            <List
                as="ol"
                title="Hva kan jeg gjøre med det?"
                description="For å dele CVene til disse kandidatene må du:"
                headingTag="h4"
            >
                <List.Item>Slett kandidatene fra denne stillingen.</List.Item>
                <List.Item>
                    Opprette stillingen på nytt med det nye organisasjonsnummeret.
                </List.Item>
                <List.Item>Legge til kandidatene igjen på den nye stillingen.</List.Item>
            </List>

            <List
                as="ol"
                title="Hva hvis jeg har delt CVene til disse kandidatene allerede?"
                headingTag="h4"
            >
                <List.Item>
                    Slett delingen: Finn kandidatene i listen, trykk på redigeringsknappen, og velg
                    "Slett CV hos arbeidsgiver".
                </List.Item>
                <List.Item>
                    Meld avvik i{' '}
                    <Link
                        target="_blank"
                        rel="noreferrer noopener"
                        href="https://navno.sharepoint.com/sites/intranett-avvik"
                    >
                        avviksrapporteringssystemet
                    </Link>{' '}
                    med informasjon om hva som skjedde.
                </List.Item>
            </List>
        </Alert>
    </div>
);

export default OrganisasjonsnummerAlert;
