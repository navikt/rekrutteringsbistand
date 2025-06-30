import { Nyhet } from './Nyheter';

const tilDato = (dag: number, måned: number, år: number, timer = 0, minutter = 0) =>
    new Date(år, måned - 1, dag, timer, minutter);

const nyhetssaker: Nyhet[] = [
    {
        dato: tilDato(30, 6, 2025),
        tittel: '"Fritatt fra kandidatsøk" ikke lenger en synlighetsregel i Rekrutteringsbistand',
        innhold: (
            <>
                <p>
                    Rekrutteringsbistand tar ikke lenger hensyn til FRKAS som synlighetsregel for
                    CV-er kandidatsøket i Rekrutteringsbistand.
                </p>
                <p>
                    FRKAS er en kode som settes i Arena, og betyr «fritatt fra kandidatsøk». De
                    oppdaterte synlighetsreglene kan du se på Navet:
                </p>
                <p>
                    <a
                        target="_blank"
                        href="https://navno.sharepoint.com/:u:/r/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Hvorfor-er-ikke-personen-synlig-i-Rekr.aspx?csf=1&web=1&e=qqMnTh"
                        rel="noopener noreferrer"
                    >
                        Regler som styrer synlighet for CV i Rekrutteringsbistand
                    </a>
                </p>
            </>
        ),
    },
    {
        dato: tilDato(22, 4, 2025),
        tittel: 'Rekrutteringsbistand bruker nå Arbeidssøkerregisteret.',
        innhold: (
            <>
                <p>
                    Det er nå et nytt krav for å være synlig med CV i kandidatsøket i
                    Rekrutteringsbistand. Det nye kravet er at person må opptre i Navs
                    Arbeidssøkerregister. Samtidig opphører krav om at personen må ha Arena-kode
                    ARBS (står for «arbeidssøker»). Dette er ikke lenger noe vi tar hensyn til. For
                    alle reglene som må være oppfylt for å kunne ha synlig CV, se oppdatert
                    informasjon på Navet:
                </p>
                <p>
                    <a
                        target="_blank"
                        href="https://navno.sharepoint.com/:u:/r/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Hvorfor-er-ikke-personen-synlig-i-Rekr.aspx?csf=1&web=1&e=qqMnTh"
                        rel="noopener noreferrer"
                    >
                        Regler som styrer synlighet for CV i Rekrutteringsbistand
                    </a>
                </p>
            </>
        ),
    },
    {
        dato: tilDato(6, 2, 2025),
        tittel: 'Personer som ikke er arbeidssøkere er tatt ut av kandidatsøket',
        innhold: (
            <>
                <p>
                    Personer som ikke er arbeidssøkere, med formidlingskoden "ikke-arbeidssøker"
                    (IARBS) er tatt ut av kandidatsøket. De fjernes for å gjøre søket mer relevant.
                    Les mer på Navet
                </p>
                <p>
                    <a
                        target="_blank"
                        href="https://navno.sharepoint.com/:u:/r/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Vi-rydder-opp-i-kandidats%C3%B8ket-i-Rekrutteringsbistand.aspx?csf=1&web=1&e=3P16XY"
                        rel="noopener noreferrer"
                    >
                        Vi rydder opp i kandidatsøket i Rekrutteringsbistand
                    </a>
                </p>
            </>
        ),
    },
    {
        dato: tilDato(1, 11, 2024),
        tittel: 'STYRK byttet ut med yrkestittel i stillingsregistreringen',
        innhold: (
            <>
                <p>Vi har byttet ut STYRK i stillingsregistreringen.</p>
                <p>
                    Vi har erstattet yrkeskodeverket STYRK med et mer moderne i
                    stillingsregistreringen, som er Janzz yrkesontologi. Det nye har flere tusen
                    flere yrker å velge i sammenlignet med STYRK. Det nye oppdateres jevnlig med
                    endringer som skjer i arbeidsmarkedet.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(13, 6, 2024),
        tittel: 'Ny tilgangsstyring',
        innhold: (
            <>
                <p>Det er ny tilgangsstyring for Rekrutteringsbistand fra 13. juni.</p>
                <p>
                    <a
                        target="_blank"
                        href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Tilgangskontroll.aspx"
                        rel="noreferrer"
                    >
                        Se info her
                    </a>
                </p>
            </>
        ),
    },
    {
        dato: tilDato(14, 5, 2024),
        tittel: 'Antall kandidater vises i stillingen',
        innhold: (
            <>
                <p>
                    Du kan nå se antall kandidater som er lagt til i en stilling, uten å ha tilgang
                    til listen over kandidater. Tallet finner du i en informasjonsboks over
                    stillingsbeskrivelsen, inne i forhåndsvisningen av stillingen.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(8, 5, 2024),
        tittel: 'Hva er nytt',
        innhold: (
            <>
                <p>
                    Knappen "Send SMS" har byttet navn til "Send beskjed". Det er fordi den fungerer
                    litt annerledes fra kandidatens ståsted:
                </p>
                <ul>
                    <li>
                        Kandidaten kan få e-post i stede for SMS, avhenging av hva de har registrert
                        i Kontakt- og reservasjonsregisteret (KRR).
                    </li>
                    <li>
                        Kandidaten vil få en beskjed på Min side inne på nav.no, hvor de kan klikke
                        seg videre til stillingsannonsen.
                    </li>
                    <li>
                        SMS/e-post kommer nå uten lenke til stillingen, men med en instruksjon om å
                        logge inn på NAV for å se stillingen.
                    </li>
                </ul>
            </>
        ),
    },
    {
        dato: tilDato(11, 4, 2024),
        tittel: 'Standardsøk for stilling er endret',
        innhold: (
            <>
                <p>
                    Vi har forbedret søk etter kommuner og fylker i rekrutteringsbistand. Du vil nå
                    kunne få flere treff når du søker etter kommuner og fylker som siste årene har
                    blitt slått sammen eller splittet, eller har endret kommune/fylkesnummer.
                </p>
                <p>
                    I forbindelse med disse endringene kan det være feil i standardsøket for
                    stillingssøk for din bruker. Om dette gjelder deg, vil det stå "Ukjent
                    Kommunenummer" foran kommunenavnet i søkeetikettene for stillingssøket. For å
                    løse problemet, kan du følge denne oppskriften:
                </p>
                <ul>
                    <li>
                        Velg den blå etiketten "Tøm alle filtre", som ligger over listen av
                        stillinger i stillingssøket
                    </li>
                    <li>Legg inn søkekriteriene du ønsker på nytt</li>
                    <li>
                        Velg knappen på høyre side av skjermen "Lagre nytt standardsøk" (ikke trykk
                        "Bruk standardsøk" før du har valgt "Lagre nytt standardsøk")
                    </li>
                    <li>
                        Deretter kan du trykke "Bruk standardsøk", for å se at standardsøket nå
                        fungerer som forventet.
                    </li>
                </ul>
            </>
        ),
    },
    {
        dato: tilDato(28, 11, 2023),
        tittel: 'Endringslogg på Navet',
        innhold: (
            <p>
                <span>
                    På grunn av personvernavviket skjer det nå flere endringer i
                    Rekrutteringsbistand. Se{' '}
                </span>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Funksjonaliteten-i-Rekrutteringsbistand-er-endret(2).aspx"
                >
                    endringslogg på Navet
                </a>
                <span> for oppdatert informasjon.</span>
            </p>
        ),
    },
    {
        dato: tilDato(19, 10, 2023),
        tittel: 'Ny funksjonalitet for lukking av personvernavvik',
        innhold: (
            <p>
                Direktoratet har oppdaget personvernavvik i Rekrutteringsbistand. For å lukke
                avviket er det laget en ny funksjonalitet som NAV-kontorene skal benytte for å gå
                igjennom egne lister og rapportere til Arbeids- og velferdsdirektoratet.&nbsp;
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Rekrutteringsbistand--slik-rydder-vi-op.aspx"
                >
                    Steg for steg veiledning finner du på Navet.
                </a>
            </p>
        ),
    },
    {
        dato: tilDato(21, 8, 2023),
        tittel: 'Endre og slette notater',
        innhold: (
            <p>
                Vi har deaktivert muligheten for å endre og slette notater i kandidatlistene. Denne
                endringen er midlertidig, og mer informasjon kommer fortløpende.
            </p>
        ),
    },
    {
        dato: tilDato(14, 6, 2023),
        tittel: 'Aktive filtre i toppen av stillingssøket',
        innhold: (
            <>
                <p>
                    Vi har mange filtre i søkene våre, og vi vet at flere syns det er slitsomt å få
                    oversikt over hvilke filtre som er valgt.
                </p>
                <p>
                    På grunn av det har lagt inn knapper som viser aktive filtre over resultatene i
                    listen. Filtrering fungerer som før, men nå kan du forhåpentligvis enklere se
                    hva du søker i uten å scrolle langt ned på siden.
                </p>
                <p>
                    Vi vurderer å gjøre det samme i kandidatsøket. Prøv det ut, og send oss gjerne
                    en melding på yammer om hva du tenker.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(7, 6, 2023),
        tittel: '«Mine stillinger» er blitt raskere',
        innhold: (
            <p>
                Vi har lenge vært klar over at det har tatt lang tid å laste inn stillingene i fanen
                «Mine stillinger». Dette skal nå være mye raskere enn før. Når det gjelder
                nyopprettede stillinger, kan det ta noen sekunder før disse er klare i listen.
            </p>
        ),
    },
    {
        dato: tilDato(7, 6, 2023),
        tittel: 'Forbedret e-post til arbeidsgiver',
        innhold: (
            <p>
                Vi har nylig oppdatert e-posten som sendes til arbeidsgivere ved utsending av CV-er.
                Den nye e-posten inneholder en beskrivelse av hvordan man kommer inn på den nye
                løsningen for kandidatlister, etter at denne ble flyttet fra arbeidsplassen til «Min
                side arbeidsgiver» på nav.no. E-posten inneholder også en beskrivelse for hvordan
                kan bruke Altinn til gi andre tilgang til løsningen.
            </p>
        ),
    },
    {
        dato: tilDato(15, 3, 2023),
        tittel: 'Endring i opprettelse av kandidatliste',
        innhold: (
            <p>
                For en ny direktemeldt stilling vil den tilhørende kandidatlista nå opprettes først
                når man trykker på "Publiser"-knappen på stillingen.
            </p>
        ),
    },
    {
        dato: tilDato(16, 1, 2023),
        tittel: 'Sortering på flest kriterier',
        innhold: (
            <>
                <p>
                    I kandidatsøket er det nå mulig å sortere på kandidatene som oppfyller flest av
                    de valgte kriteriene. Dette vil gjøre det enklere å finne passende kandidater,
                    spesielt ved filtrering på flere yrker og kompetanser.
                </p>
                <p>
                    Hvis du ikke velger den nye sorteringen vil søket fungere som før, der
                    kandidatene som er oppdatert sist, havner øverst i listen.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(21, 9, 2022),
        tittel: 'Nytt design på kandidatsøket',
        innhold: 'I sammenheng med en teknisk oppgradering har kandidatsøket fått nytt design.',
    },
    {
        dato: tilDato(27, 6, 2022),
        tittel: 'Endring i statistikkperiode',
        innhold:
            'På forsiden av Rekrutteringsbistand viser vi nå statistikk for hele inneværende måned, i stedet for de siste 30 dagene.',
    },
    {
        dato: tilDato(22, 6, 2022),
        tittel: 'Stillingskategorier i stillingssøket',
        innhold: (
            <p>
                Nå vil du ikke lenger se formidlingsstillinger og jobbmesser/jobbtreff i
                stillingssøket. Hvis du ønsker å vise alle stillingskategorier, har vi laget et nytt
                valg for dette under "Om annonsen" i filteret.
            </p>
        ),
    },
    {
        dato: tilDato(19, 5, 2022),
        tittel: 'Slette CV delt med arbeidsgiver',
        innhold: (
            <p>
                Nå er det mulig å slette en CV som er sendt til arbeidsgivers kandidatliste. Dette
                kan f.eks. være nyttig hvis kandidaten trekker samtykket sitt. Du finner dette
                valget inne på kandidatlisten.
            </p>
        ),
    },
    {
        dato: tilDato(28, 4, 2022),
        tittel: 'Fjernet midlertidig utilgjengelig',
        innhold: (
            <>
                <p>
                    For noen dager siden fjernet vi muligheten til å registrere kandidater som
                    midlertidig utilgjengelig. Dette er en funksjon vi opprettet under
                    koronautbruddet i 2020, for å håndtere karantenesituasjoner.
                </p>
                <p>
                    Vi har ikke lenger noe grunnlag for å tilby denne funksjonaliteten, og har
                    derfor fjernet registrerings- og søkemulighetene.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(10, 3, 2022),
        tittel: 'Rekrutteringsbistand har fått ny URL',
        innhold: (
            <p>
                URL-en er oppdatert i Modia-dekoratøren, men hvis du har lagret Rekrutteringsbistand
                som bokmerke må du huske å oppdatere denne. Den gamle URL-en vil slutte å fungere om
                kort tid.
            </p>
        ),
    },
    {
        dato: tilDato(23, 11, 2021),
        tittel: 'Kontaktinformasjon på stillingsannonse',
        innhold: (
            <p>
                Kontaktinformasjonen er fjernet fra stillingsannonsen som vises for arbeidssøkerne.
                Kandidatene blir informert om at de kan ta kontakt i dialogen i aktivitetsplanen
                hvis de har spørsmål.
            </p>
        ),
    },
    {
        dato: tilDato(19, 10, 2021),
        tittel: 'Rekrutteringsbistand + aktivitetsplanen',
        innhold: (
            <>
                <p>
                    Nå kan du dele stillinger med kandidater i aktivitetsplanen, og få svar. Gå til
                    kandidatlisten, og del stillingen med aktuelle kandidater. Kandidatene vil bli
                    varslet på SMS om et aktivitetskort i aktivitetsplanen.
                </p>
                <p>
                    På aktivitetskortet kan kandidatene svare på om de ønsker at CV-en skal deles
                    med arbeidsgiver. Du vil se svarene i kandidatlisten.{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Del-stillinger-med-kandidater-i-Aktivitetsplanen.aspx"
                    >
                        Les om hvordan du deler en stilling med kandidater
                    </a>
                    .
                </p>
            </>
        ),
    },
    {
        dato: tilDato(22, 9, 2021),
        tittel: 'Kategorier på stilling',
        innhold: (
            <>
                <p>
                    I Rekrutteringsbistand vil du nå måtte velge en kategori for stillingen. I
                    første omgang gjelder dette stilling, arbeidstrening og formidling. Vi jobber
                    med å avklare andre kategorier. Arbeidstrening skal i utgangspunktet ikke
                    registreres, denne kategorien gjelder kun hvis du trenger å finne kandidater til
                    en arbeidstrening.
                </p>
                <p>
                    Dessverre må dere fortsatt registrere alle feltene uavhengig av hvilken kategori
                    dere velger.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(22, 6, 2021),
        tittel: 'Endring i kandidatlister',
        innhold: (
            <>
                <p>
                    Nå er det enklere å se status og få oversikt over hendelser til kandidater på en
                    kandidatliste. Ved å benytte blyantsymbolet kan du enkelt endre status og
                    se/registrere hendelser på kandidater i kandidatlisten.
                </p>
                <p>
                    Endringen er en del av ny løsning for å kunne sende stillinger til aktuelle
                    kandidater via aktivitetsplanen - som kommer etter sommeren.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(22, 4, 2021),
        tittel: 'Innsatsgrupper er koblet på formidlingstall',
        innhold: (
            <>
                <p>
                    Nå kan du hvor mange personer som har fått jobb med bistand fra NAV, og hvilken
                    innsatsgruppe de har. Rapporten heter "RB121 Formidlinger Fått jobben.
                    Personkjennetegn. Tidsserie måned". Du finner den i Datavarehuset.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(15, 4, 2021),
        tittel: 'Unge under 30 år og seniorer 50+',
        innhold: (
            <>
                <p>
                    I kandidatsøket under prioriterte målgrupper kan du nå huke av for unge under 30
                    år eller seniorer 50+. Kombinerer du disse kriteriene med hull i CV-en, kan du
                    for eksempel finne de som er under 30 år og har hull i CV-en.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(6, 4, 2021),
        tittel: 'Finn kandidater med hull i CV-en',
        innhold: (
            <>
                <p>
                    Nå finner du et filter for «prioriterte målgrupper» i kandidatsøket. I første
                    versjon kan du finne kandidater som har hull i CV-en. Dette filteret kan du for
                    eksempel bruke i forbindelse med inkluderingsdugnaden.
                </p>
                <p>
                    Beregning av hull i CV-en gjøres basert på informasjonen kandidaten har
                    registrert i CV-en sin.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(4, 3, 2021),
        tittel: 'Lagre standardsøk i nytt stillingssøk',
        innhold: (
            <>
                <p>
                    Nå kan du lagre et standardsøk i det nye stillingssøket i Rekrutteringsbistand.
                </p>
                <p>Slik fungerer det</p>
                <ul>
                    <li>Legg inn søkeord og filter du ønsker å lagre.</li>
                    <li>Trykk på «Lagre som standardsøk».</li>
                    <li>
                        Nå er søkekriteriene du har valgt lagret som et standardsøk. Det vil si at
                        hver gang du bruker stillingssøket vil det være ferdig filtrert på de
                        kriteriene du lagret.
                    </li>
                    <li>Du kan endre standardsøket når du vil.</li>
                </ul>
            </>
        ),
    },
    {
        dato: tilDato(15, 2, 2021),
        tittel: 'Nytt stillingssøk',
        innhold: (
            <p>
                Vi har laget et nytt søk som gir flere muligheter for treff. Du kan nå søke etter
                ord i selve annonsen, i tillegg til å søke på arbeidsgiver, annonsenummer og tittel
                på stillingen.
            </p>
        ),
    },
    {
        dato: tilDato(15, 1, 2021),
        tittel: 'Sorteringsmuligheter i kandidatlisteoversikten',
        innhold: (
            <>
                <p>Nå kan du sortere i kandidatlisteoversikten.</p>
                <p>Du kan raskt sortere på:</p>
                <ul>
                    <li>Dato for når kandidatliste er opprettet</li>
                    <li>Navn på kandidatliste</li>
                    <li>Antall kandidater på kandidatliste</li>
                    <li>Veileder som har opprettet kandidatlisten</li>
                </ul>
            </>
        ),
    },
    {
        dato: tilDato(9, 11, 2020),
        tittel: 'Nå kan se du hvor mange personer som har fått jobb i Rekrutteringsbistand.',
        innhold: (
            <>
                <p>
                    På forsiden i Rekrutteringsbistand kan du nå se hvor mange personer som har fått
                    jobb og hvor mange som er presentert for en stilling hos arbeidsgiver.
                    Oversikten viser resultater fra det kontoret du er innlogget på, og viser alltid
                    gjeldende status. Det gir en enkel oversikt over kontorets resultater for alle
                    som benytter Rekrutteringsbistand, og kan benyttes som et verktøy for kontoret i
                    markedsarbeidet.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(16, 10, 2020),
        tittel: 'Ny SMS-mal til jobbarrangement',
        innhold: (
            <>
                <p>
                    Skal du sende SMS til en kandidat kan du nå velge en mal for jobbarrangement.
                    Denne malen kan brukes til for eksempel jobbmesser.
                </p>
                <p>
                    Hvis jobbmessen fører til at en eller flere kandidater får jobb, registrer
                    formidlingen på stillingen du allerede har opprettet.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(23, 9, 2020),
        tittel: 'Avslutt en kandidatliste',
        innhold:
            'Er du ferdig med et oppdrag? Nå kan du avslutte kandidatlisten. Gå inn på listen, øverst i høyre hjørnet vil du se status "åpen" eller "avsluttet". Når oppdraget er ferdig, avslutt listen slik at andre kan se at oppdraget er fullført.',
    },
    {
        dato: tilDato(8, 9, 2020),
        tittel: 'Formidling på kandidater som ikke er synlige i Rekrutteringsbistand',
        innhold: (
            <>
                <p>
                    Det er nå mulig å registrere at personer som ikke er synlige i
                    Rekrutteringsbistand er blitt presentert eller har fått jobb. Dette gjør du ved
                    å gå til den aktuelle kandidatlisten. Trykk på «Legg til kandidat» og skriv inn
                    fødselsnummeret til personen. Huk av for presentert og/eller fått jobb og trykk
                    på «Lagre». Formidlingen er nå registrert. Det er ikke mulig å registrere
                    formidling på brukere med kode 6/7.
                </p>
                <p>Funksjonaliteten gjelder kun kandidatlister som er knyttet til en stilling.</p>
            </>
        ),
    },
    {
        dato: tilDato(25, 7, 2020),
        tittel: 'Formidlinger skal nå registreres i Rekrutteringsbistand',
        innhold: (
            <>
                <p>
                    Registrering av formidlinger (presentert for arbeidsgiver og fått jobb), skal nå
                    gjøres i Rekrutteringsbistand, og ikke i Arena.
                </p>
                <p>
                    I feltet «utfall» på en kandidatliste, kan eier av kandidatlisten endre utfall
                    fra «Presentert» til «Fått jobb» når en person er formidlet. Utfallet
                    «Presentert» kommer automatisk når du deler en CV med arbeidsgiver, men du kan
                    også sette utfallet manuelt.
                </p>
                <p>
                    For at utfallet «Fått jobb» kan registreres, er det en forutsetning at NAV har
                    hatt dialog med arbeidsgiver i forkant, og har presentert en eller flere
                    kandidater. NAV må også få bekreftet at det er inngått et lønnet arbeidsforhold
                    mellom kandidat og arbeidsgiver for at en formidling («Fått jobb») kan
                    registreres.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(8, 6, 2020),
        tittel: 'Nå kan du søke etter en kandidat',
        innhold:
            'Øverst i kandidatsøket i fritekstsøket, kan du nå søke på fødselsnummer og få treff på kandidaten du leter etter. Du vil kun få treff på kandidater som er synlige i Rekrutteringsbistand.',
    },
    {
        dato: tilDato(4, 6, 2020),
        tittel: 'Filtrering på alder',
        innhold:
            'I kandidatsøket har du nå mulighet til å filtrere på alder. Du legger selv inn hvilket aldersintervall du vil ha i søket. Det gir en ny mulighet til målrettede søk etter kandidater innenfor prioriterte målgrupper.',
    },
    {
        dato: tilDato(25, 5, 2020),
        tittel: 'Historikk og filtrering på utfall i en kandidatliste',
        innhold: (
            <>
                <p>
                    På CV-visningen har det nå kommet en ny fane som heter historikk. Her kan du se
                    hvilke kandidatlister en kandidat er lagt på, hvilken status kandidaten har og
                    om han eller hun har blitt presentert for arbeidsgiver. Historikken vil hjelper
                    deg til å få god oversikt over den enkelte kandidat.
                </p>
                <p>
                    Du har også fått mulighet til å filtrere en kandidatliste på utfall (ikke
                    presentert og presentert). Dermed kan du filtrere en kandidatliste både på
                    status og på utfall.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(20, 5, 2020),
        tittel: 'Filtrering på status i en kandidatliste',
        innhold: (
            <>
                <p>
                    Nå kan du filtrere på status i en kandidatliste. Det hjelper deg til å ha
                    oversikt over mange kandidater som har status; vurderes, aktuell, ikke aktuell
                    eller ikke interessert.
                </p>
                <p>
                    Øverst i en kandidatliste som er tilknyttet en stilling, får du i tillegg
                    informasjon om hvor mange som har status aktuell og hvor mange som er presentert
                    for arbeidsgiver.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(18, 5, 2020),
        tittel: 'Nå kan du se hvilke kandidater som allerede ligger i kandidatlisten',
        innhold:
            'Om du kommer til kandidatsøket via en kandidatliste eller en stilling, vil du nå se et nytt ikon. Dette ikonet forteller deg at kandidaten allerede ligger i kandidatlisten, og du trenger ikke bruke tid på kandidater du allerede har vurdert som aktuelle.',
    },
    {
        dato: tilDato(11, 5, 2020),
        tittel: 'Nye endringer',
        innhold: (
            <>
                <h3>Tilpassing til små skjermer</h3>
                <p>
                    Rekrutteringsbistand fungerer nå bedre på mindre skjermer. Vi har gjort
                    justeringer på blant annet kandidatlister og registrering av stilling. I tillegg
                    er kontrasten på teksten forbedret.
                </p>
                <h3>Ny knapp - kopier stilingslenke</h3>
                <p>
                    På en stilling kan du kopiere en lenke til stillingsannonsen. «Kopier
                    stillingslenke» har tidligere vært tilgjengelig lenger nede på stillingen, men
                    er nå flyttet og står ved siden av «Rediger stilling» og «Skriv ut».
                </p>
                <h3>«Til toppen» pil er lagt til på kandidatsøk og kandidatlister</h3>
                <p>Dette gjør at du ikke trenger å skrolle like mye.</p>
                <h3>
                    Ny kolonne i kandidatlisten som viser når (hvilken dato) en kandidat ble lagt
                    til listen
                </h3>
                <h3>Link fra CV til kandidatliste</h3>
                <p>
                    Når du har lagt en kandidat i en kandidatliste fra CV-visning, kan du nå gå
                    direkte til kandidatlisten.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(27, 4, 2020),
        tittel: 'Nå kan du registrere kandidater som midlertidig utilgjengelig',
        innhold: (
            <>
                <p>
                    For å få bedre oversikt over hvilke kandidater som er tilgjengelig for jobb, har
                    du mulighet til å registrere kandidater som utilgjengelig for en periode i
                    CV-visningen i Rekrutteringsbistand. Du kan maksimalt sette personer som
                    utilgjengelig i en måned.
                </p>
                <p>
                    Status som midlertidig utilgjengelig skal kun skal settes i dialog med bruker,
                    og kandidaten skal informeres om at hun/han får denne statusen. Statusen vil
                    kunne ses av alle som bruker kandidatsøket og årsak til utilgjengelighet skal
                    ikke oppgis.
                </p>
                <p>
                    Etterhvert vil du også kunne filtrere på kandidater som har status som
                    midlertidig utilgjengelig.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(27, 4, 2020),
        tittel: 'Søk på navn i en kandidatliste',
        innhold:
            'Nå kan du søke på navn i en kandidatliste. Det gjør at du lettere kan finne igjen personer som er lagt på en kandidatliste.',
    },
    {
        dato: tilDato(22, 4, 2020),
        tittel: 'Informasjon om kandidatens veileder',
        innhold:
            'Nå kan du se hvem som er kandidaten sin veileder fra Rekrutteringsbistand. Informasjon om veileder finner du i CV-visningen på kandidaten.',
    },
    {
        dato: tilDato(20, 4, 2020),
        tittel: 'Nå kan du søke etter kandidater som har fersk arbeidserfaring',
        innhold:
            'I kandidatsøket har det kommet et nytt filter. I filteret legger du inn yrket som kandidatene skal ha arbeidserfaringen innen, og velger hvor fersk arbeidserfaringen skal være. Du kan velge om du vil se kandidater som har arbeidserfaring fra siste to år, siste fem år eller selv velge antall år med fersk arbeidserfaring.',
    },
    {
        dato: tilDato(7, 4, 2020),
        tittel: 'Nye filtreringsmuligheter i kandidatsøket',
        innhold: (
            <>
                <p>
                    I kandidatsøket i rekrutteringsbistand er det kommet to nye
                    filtreringsmuligheter.
                </p>
                <h3>Permitterte</h3>
                <p>
                    Det er mulig å søke frem kandidater som er permitterte. Informasjon om
                    permittering hentes fra situasjonen brukerne oppga i registreringen.
                </p>
                <h3>Tilgjengelighet</h3>
                <p>
                    Du kan filtrere på når kandidatene er ledig. Informasjon om tilgjengelighet
                    hentes fra jobbprofilen. Du kan filtrere på om brukerne har registrert om er
                    ledig nå, om tre måneder eller etter nærmere avtale.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(6, 4, 2020),
        tittel: 'Nå kan du slette kandidater fra en kandidatliste',
        innhold:
            'Kandidater som slettes blir arkivert, og du kan enkelt søke frem en oversikt over hvilke kandidater som er slettet. Det er også mulig å angre sletting, og flytte kandidaten tilbake på kandidatlisten.',
    },
    {
        dato: tilDato(3, 4, 2020),
        tittel: 'Rekrutteringsbistand på Yammer',
        innhold:
            'Rekrutteringsbistand har egen gruppe på Yammer. Der kan behov for ny eller endret funksjonalitet i verktøyet meldes inn og bli diskutert. Feil i rekrutteringsbistand skal meldes i porten.',
    },
    {
        dato: tilDato(2, 4, 2020),
        tittel: 'Ny toppmeny i Rekrutteringsbistand',
        innhold:
            'I Rekrutteringsbistand er det nå samme dekoratør som i Modia personoversikt. Det vil si at du får tilgang til menyknappen og kan velge enhet. Det gjør det lettere å gå mellom de ulike systemene.',
    },
    {
        dato: tilDato(31, 3, 2020),
        tittel: 'Nå kan du lettere finne kandidater til viktige bransjer under koronasituasjonen',
        innhold: (
            <>
                <p>
                    Koronasituasjonen kan skape mangel på arbeidskraft til viktige oppgaver i
                    samfunnet.
                </p>
                <p>
                    For å bedre oversikt over hvor mange kandidater som kan, og har lyst til å jobbe
                    innen for eksempel helse og omsorg, er det laget predefinerte søk i
                    Rekrutteringsbistand for noen utvalgte bransjer.
                </p>
            </>
        ),
    },
    {
        dato: tilDato(31, 3, 2020),
        tittel: 'Kopier lenken til en stilling',
        innhold:
            'Nederst på stilling under «Om annonsen» kan du nå kopiere lenken til stillingen. Du kan for eksempel sende den til en aktuell kandidat på e-post eller i dialogen slik at kandidaten kan vurdere om stillingen passer.',
    },
    {
        dato: tilDato(26, 3, 2020),
        tittel: 'Nå kan NAV varsle kandidater om stillinger på SMS',
        innhold: (
            <>
                <p>
                    Det er nå mulig å sende SMS til brukere som er tilknyttet en kandidatliste. Det
                    gjør at NAV enkelt kan varsle kandidater om stillinger hvor det haster å få
                    folk. SMS-varsling kan brukes både til offentlig utlyste stillinger og til
                    stillinger som er meldt direkte til NAV.
                </p>
                <p>
                    I SMS-meldingen vil det være link til den aktuelle stillingen slik at
                    kandidatene raskt kan se på og vurdere stillingen.
                </p>
                <p>
                    Les mer på{' '}
                    <a
                        href="https://navno.sharepoint.com/sites/intranett-prosjekter-og-utvikling/SitePages/SMS-varsling-til-personbrukere-om-stillinger.aspx"
                        rel="noreferrer"
                        target="_blank"
                    >
                        Navet
                    </a>
                </p>
            </>
        ),
    },
    {
        dato: tilDato(28, 2, 2020),
        tittel: 'Enklere å skrive et notat',
        innhold:
            'Nå blir det enklere å skrive et notat om hvorfor brukeren passer til stillingen. Når du legger til en kandidat på en kandidatliste, får du mulighet til å opprette et notat.',
    },
    {
        dato: tilDato(26, 2, 2020),
        tittel: 'Endring av fornavn og etternavn',
        innhold:
            'I kandidatsøket vises nå etternavn før fornavn. På e-poster som automatisk sendes til arbeidsgiver har vi også endret rekkefølge. Nå vil fornavnet ditt vises før etternavnet.',
    },
    {
        dato: tilDato(26, 2, 2020),
        tittel: 'Vi har nå lansert «nytt i Rekrutteringsbistand»',
        innhold:
            'Her vil du få oversikt over nyheter og endringer som gjøres. Du vet at det har kommet en ny sak når ikonet har en blå sirkel.',
    },
];

export default nyhetssaker;
