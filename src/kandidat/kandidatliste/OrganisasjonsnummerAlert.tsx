import { Alert, BodyLong, Heading, Link, List, VStack } from '@navikt/ds-react';
import css from './OrganisasjonsnummerAlert.module.css';

const OrganisasjonsnummerAlert = () => (
    <Alert variant="warning" className={css.organisasjonsnummeralert}>
        <VStack gap="4">
            <div>
                <Heading level="3" size="medium" spacing>
                    Stillingen har fått nytt organisasjonsnummer
                </Heading>
                <BodyLong>
                    Organisasjonsnummeret til stillingen har blitt endret i et annet system, men
                    ikke i kandidatlisten. Det kan føre til at CVer deles med feil organisasjon,
                    siden det ikke er mulig å endre organisasjonsnummer på kandidatlisten.
                </BodyLong>
            </div>

            <div>
                <Heading level="4" size="small">
                    Hva betyr det for meg?
                </Heading>
                <BodyLong>
                    Legger du til kandidater på stillingen og deler CV med arbeidsgiver blir de delt
                    med den forrige organisasjonen. Deler du CVene deres, vil det føre til
                    personvernsbrudd.
                </BodyLong>
            </div>

            <div>
                <Heading level="4" size="small">
                    Hva kan jeg gjøre med det?
                </Heading>
                <BodyLong>For å dele CVene til disse kandidatene må du:</BodyLong>
                <List as="ol" className="mt-4">
                    <List.Item>Slett kandidatene fra denne stillingen.</List.Item>
                    <List.Item>
                        Opprette en direktemeldt stilling med det nye organisasjonsnummeret
                    </List.Item>
                    <List.Item>Legge til kandidatene igjen på den nye stillingen.</List.Item>
                </List>
            </div>

            <div>
                <Heading level="4" size="small">
                    Hva hvis jeg har delt CVene til disse kandidatene allerede?
                </Heading>
                <List as="ol" className="mt-4">
                    <List.Item>
                        Slett delingen: Finn kandidatene i listen, trykk på redigeringsknappen, og
                        velg &quot;Slett CV hos arbeidsgiver&quot;.
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
            </div>
        </VStack>
    </Alert>
);

export default OrganisasjonsnummerAlert;
