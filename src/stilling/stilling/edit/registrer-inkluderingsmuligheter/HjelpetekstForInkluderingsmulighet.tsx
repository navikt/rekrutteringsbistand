import { FunctionComponent } from 'react';
import { Inkluderingsmulighet } from '../../tags/hierarkiAvTags';
import { BodyLong, Heading, Link } from '@navikt/ds-react';

type Props = {
    inkluderingsmulighet: Inkluderingsmulighet;
};

const Tilrettelegging = () => (
    <>
        <Heading level="3" size="xsmall">
            Arbeidstid
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgiveren kan tilpasse arbeidstiden. For eksempel legge til rette for kortere
            dager, eller gradvis øke stillingsprosenten.
        </BodyLong>
        <Heading level="3" size="xsmall">
            Fysisk tilrettelegging
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgiveren kan tilrettelegge arbeidsplassen fysisk. For eksempel ergonomisk
            tilpasning og/eller tilby en universelt utformet arbeidsplass.
        </BodyLong>
        <Heading level="3" size="xsmall">
            Arbeidshverdagen
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgiveren kan tilpasse arbeidshverdagen, for eksempel ved opplæring,
            arbeidsoppgaver eller tett oppfølging. Personer med psykiske eller kognitive
            utfordringer m.fl. kan ha slike behov.
        </BodyLong>
        <Heading level="3" size="xsmall">
            Utfordringer med norsk
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgiveren kan tilpasse arbeidsoppgaver for medarbeidere som har utfordringer med å
            snakke, skrive eller lese norsk. Eksempler er ved lese- og skrivevansker, språk- og
            taleforstyrrelser eller utfordringer med norsk fordi man kommer fra et annet land.
        </BodyLong>
    </>
);

const TiltakEllerVirkemiddel = () => (
    <>
        <Heading level="3" size="xsmall">
            Lønnstilskudd
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgiveren er åpen for en kandidat som har behov for midlertidig eller varig
            lønnstilskudd. Kandidaten blir ansatt på ordinære lønns- og arbeidsvilkår, men kan få
            tilskudd til lønn fra NAV som skal kompensere for lavere produktivitet.
        </BodyLong>
        <Heading level="3" size="xsmall">
            Mentor (tilskudd)
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgiveren er åpen for kandidater som trenger en mentor på arbeidsplassen. En mentor
            er en kollega som kan gi praktisk bistand, veiledning eller opplæring slik at kandidaten
            kan mestre jobben. Det er arbeidsgiveren som søker og mottar mentortilskuddet.
        </BodyLong>
        <Heading level="3" size="xsmall">
            Lærlingplass
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgiver er åpen for å ta inn personer som lærlinger, og kan gi opplæring i
            lærerplanen for faget. Bedriften må godkjennes som en lærebedrift.{' '}
            <Link href="https://laerlingplass.no/blog/bli-en-godkjent-l%C3%A6rebedrift/">
                Les mer om hva bedriften må gjøre.
            </Link>
        </BodyLong>
    </>
);

const PrioriterteMålgrupper = () => (
    <>
        <Heading level="3" size="xsmall">
            Har arbeidsgiveren et ekstra engasjement for enkelte målgrupper?
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgivere kan ha et ekstra engasjement eller interesse for enkelte målgrupper som de
            gjerne vil hjelpe. Har arbeidsgiveren erfaring eller ekstra motivasjon for å gi en
            mulighet til noen av disse målgruppene?{' '}
        </BodyLong>
        <Heading level="3" size="xsmall">
            Unge under 30 år
        </Heading>
        <BodyLong size="small" spacing>
            Unge under 30 år er en målgruppe med høy prioritet i NAV. Tidlig og tett oppfølging er
            viktig for å hindre at unge blir stående utenfor arbeidslivet.
        </BodyLong>
        <Heading level="3" size="xsmall">
            Senior 50+
        </Heading>
        <BodyLong size="small" spacing>
            Å få arbeidsgivere til å ansette og beholde personer som er 50+, er med på å forlenge
            yrkeslivet og senkarrieren til kandidater. Ansettelse av seniorer bidrar til at vi har
            et inkluderende, kompetent og lønnsomt arbeidsliv.
        </BodyLong>
        <Heading level="3" size="xsmall">
            Innvandrere fra land utenfor EØS
        </Heading>
        <BodyLong size="small" spacing>
            Innvandrere fra land utenfor EØS er en prioritert målgruppe i NAV, og sysselsettingen i
            denne gruppen er lav. Mange innvandrere vil ha behov for å utvikle kompetanse og få
            erfaring som det norske arbeidslivet etterspør.
        </BodyLong>
        <Heading level="3" size="xsmall">
            Hull i CV-en
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgiveren er åpen for å ta imot en person som ikke har vært i arbeid, utdanning
            eller opplæring i to av de siste fem årene.
        </BodyLong>
        <Heading level="3" size="xsmall">
            Ingen eller lav utdanning
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgiveren er åpen for en kandidat som kun har grunnskole eller ikke har fullført
            videregående skole.
        </BodyLong>
        <Heading level="3" size="xsmall">
            Lite eller ingen arbeidserfaring
        </Heading>
        <BodyLong size="small" spacing>
            Arbeidsgiveren er åpen for en kandidat som har 1 år eller mindre arbeidserfaring.
        </BodyLong>
    </>
);

const StatligInkluderingsdugnad = () => (
    <>
        <Heading level="3" size="xsmall">
            Statlig inkluderingsdugnad
        </Heading>
        <BodyLong size="small" spacing>
            Statlig inkluderingsdugnad skal benyttes når NAV har inngått en samarbeidsavtale med
            statlige bedrifter. Avtalen går ut på at NAV får forsprang til å jobbe med
            (midlertidige) stillinger.
        </BodyLong>
    </>
);

export const HjelpetekstForInkluderingsmulighet: FunctionComponent<Props> = ({
    inkluderingsmulighet,
}) => {
    switch (inkluderingsmulighet) {
        case Inkluderingsmulighet.Tilrettelegging:
            return <Tilrettelegging />;
        case Inkluderingsmulighet.TiltakEllerVirkemiddel:
            return <TiltakEllerVirkemiddel />;
        case Inkluderingsmulighet.PrioriterteMålgrupper:
            return <PrioriterteMålgrupper />;
        case Inkluderingsmulighet.StatligInkluderingsdugnad:
            return <StatligInkluderingsdugnad />;
        default:
            return null;
    }
};
