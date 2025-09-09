import { CheckmarkCircleIcon, RocketIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Heading, HStack, Link, List, Tag, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { getMiljø, Miljø } from '../felles/miljø';
import UtfasingIllustrasjon from './utfasing.svg';
export interface UtfasingProps {
    children?: React.ReactNode | undefined;
}

const Utfasing: React.FC<UtfasingProps> = ({ children }) => {
    const handleButtonClick = () => {
        console.log('Sjekk ut nye rekrutteringsbistand klikket');
    };

    return (
        <VStack
            gap="8"
            align="start"
            style={{
                padding: '2rem',
                margin: '0 0 2rem 0',
                backgroundColor: 'white',
                border: '1px solid #C6C2BF',
                borderRadius: '4px',
            }}
        >
            <HStack gap="8" align="center" wrap={false}>
                <VStack gap="6" style={{ flex: 1 }}>
                    <HStack gap="2" align="center">
                        <Heading level="2" size="large">
                            Adjø til gamle rekrutteringsbistand fra 15. september
                        </Heading>
                        <Tag variant="success" icon={<RocketIcon aria-hidden />}>
                            Nyhet
                        </Tag>
                    </HStack>

                    <BodyLong>
                        Etter en sommer med testing og oppussing er det på tide å flytte over i nye
                        rekrutteringsbistand.
                    </BodyLong>

                    <Heading level="2" size="medium">
                        Hva som skjer
                    </Heading>

                    <List>
                        <List.Item icon={<CheckmarkCircleIcon aria-hidden />}>
                            Den gamle løsningen <strong>slåes av 15. september 2025.</strong>
                        </List.Item>
                        <List.Item icon={<CheckmarkCircleIcon aria-hidden />}>
                            Hvis du ikke har prøvd den nye versjonen ennå kan du{' '}
                            <Link
                                href={
                                    getMiljø() === Miljø.ProdGcp
                                        ? 'https://rekrutteringsbistand-frontend.intern.nav.no/'
                                        : 'https://rekrutteringsbistand-frontend.intern.dev.nav.no/'
                                }
                            >
                                sjekke den ut allerede i dag
                            </Link>
                            . Vi har gjort flere endringer over sommeren.
                        </List.Item>
                        <List.Item icon={<CheckmarkCircleIcon aria-hidden />}>
                            Merker du at noe ikke fungerer så godt, er det fint om du gir oss
                            tilbakemelding om det! Vi fortsetter med forbedringer i tiden fremover.
                            Innspillene dine hjelper oss med å prioritere hva som er viktigst å
                            fikse.
                        </List.Item>
                    </List>

                    <BodyLong>
                        Takk for til alle som allerede har testet den nye løsningen og bidratt med
                        tilbakemeldinger frem til nå. Vi jobber hele tiden med å gjøre
                        rekrutteringsbistand så god som mulig. Flere forbedringer er på vei 🫶.
                    </BodyLong>

                    <div>
                        <Link
                            href={
                                getMiljø() === Miljø.ProdGcp
                                    ? 'https://rekrutteringsbistand-frontend.intern.nav.no/'
                                    : 'https://rekrutteringsbistand-frontend.intern.dev.nav.no/'
                            }
                        >
                            <Button onClick={handleButtonClick} style={{ marginTop: '1rem' }}>
                                Sjekk ut nye rekrutteringsbistand →
                            </Button>
                        </Link>
                    </div>
                </VStack>

                <div style={{ flexShrink: 0 }}>
                    <UtfasingIllustrasjon />
                </div>
            </HStack>
            {children}
        </VStack>
    );
};

export default Utfasing;
