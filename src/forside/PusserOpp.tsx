import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Heading, HStack, Link, List, VStack } from '@navikt/ds-react';
import * as React from 'react';
import { getMiljø, Miljø } from '../felles/miljø';
import PusserOppIllustrasjon from './pusser-opp.svg';
// Assuming you have an illustration component or an SVG file
// import PusserOppIllustrasjon from './PusserOppIllustrasjon'; // Example import

export interface PusserOppProps {
    children?: React.ReactNode | undefined;
}

const PusserOpp: React.FC<PusserOppProps> = ({ children }) => {
    const handleButtonClick = () => {
        // TODO: Implement navigation or action
        console.log('Prøv nye rekrutteringsbistand klikket');
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
                    <Heading level="1" size="xlarge">
                        Vi pusser opp!
                    </Heading>
                    <BodyLong>
                        Vi lager en ny versjon av rekrutteringsbistand og da trenger vi litt hjelp
                        fra deg. Vi vil gjerne at du prøver den ut, og gir oss tilbakemeldinger—Hva
                        som funker, og hva som ikke funker like godt.
                    </BodyLong>
                    <List>
                        <List.Item icon={<CheckmarkCircleIcon aria-hidden />}>
                            Du kan bytte mellom gammel og ny versjon når som helst. Så her er det
                            bare å prøve i vei.
                        </List.Item>
                        <List.Item icon={<CheckmarkCircleIcon aria-hidden />}>
                            Gi tilbakemeldinger direkte i løsningen. Det hjelper oss veldig!
                        </List.Item>
                        <List.Item icon={<CheckmarkCircleIcon aria-hidden />}>
                            ✨ Nytt snadder ✨ kommer raskt ut i den nye løsningen. Vi holder deg
                            oppdatert om alle endringene så fort de er tilgjengelige.
                        </List.Item>
                    </List>
                    <BodyLong>Vi håper du vil teste ut og hjelpe oss.</BodyLong>
                    <div>
                        <Link
                            href={
                                getMiljø() === Miljø.ProdGcp
                                    ? 'https://rekrutteringsbistand-frontend.intern.nav.no/'
                                    : 'https://rekrutteringsbistand-frontend.intern.dev.nav.no/'
                            }
                        >
                            <Button onClick={handleButtonClick} style={{ marginTop: '1rem' }}>
                                Prøv nye rekrutteringsbistand
                            </Button>
                        </Link>
                    </div>
                </VStack>
                <div style={{ flexShrink: 0 }}>
                    <PusserOppIllustrasjon />
                </div>
            </HStack>
            {children}
        </VStack>
    );
};

export default PusserOpp;
