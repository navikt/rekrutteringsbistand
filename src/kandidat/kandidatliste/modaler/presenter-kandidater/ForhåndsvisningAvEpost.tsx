import Kandidatliste from 'felles/domene/kandidatliste/Kandidatliste';
import css from './ForhåndsvisningAvEpost.module.css';

type Props = {
    kandidatliste: Kandidatliste;
    melding: string;
};

const ForhåndsvisningAvEpost = ({ kandidatliste, melding }: Props) => {
    return (
        <iframe
            title="forhåndsvisning"
            sandbox=""
            className={css.iframe}
            srcDoc={opprettHtmlTemplate(
                kandidatliste.tittel,
                melding,
                kandidatliste.opprettetAv.navn
            )}
        />
    );
};

/*
 * Kopiert fra toi-arbeidsgiver-notifikasjon i repoet toi-rapids-and-rivers.
 */
const opprettHtmlTemplate = (tittel: string, melding: string, avsender: string) => `
    <html>
        <head>
            <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/>
            <title>${tittel}</title>
        </head>
        <body style='font-family: sans-serif; padding:40px 20px; color: #262626'>
            <div>
                <h1 style='font-size: 1.75rem; font-weight:bold;'>Hei.</h1>
                <h2 style='font-weight: 500; font-size: 1rem;'>Vi har funnet nye kandidater for deg til stillingen: <b>${tittel}</b>.</h2>
                <pre style='font-family: unset;'>${melding}</pre>
            </div>


            <div style='padding-block-start:32px;'>
                <h3 style='font-size: 1rem; line-height: 1rem; font-weight:bold;'>Se kandidatene dine</h3>
                <div style='font-size: 1rem; padding: 12px 16px; border-radius: 12px; background-color:#F7F7F7;'>
                    <p>
                    <ol style='margin-block: 0px; padding-inline-start: 24px;'>
                        <li style='margin-block-end: 0.5rem;'>Åpne <a href='#' style='text-decoration:none; color:#000; cursor: default; font-weight: bold;'>https://arbeidsgiver.nav.no/min-side-arbeidsgiver</a></li>
                        <li style='margin-block-end: 0.5rem;'><b>Logg inn</b></li>
                        <li>Finn <b>varslene dine</b> oppe til høyre på siden, og trykk deg inn på meldingen, eller finn lenken i kortet med teksten <b>Kandidater til mine stillinger</b> lenger ned på siden.</li>
                    </ol>
                    </p>
                </div>
            </div>

            <p style='padding-block:40px 32px'>Vennlig hilsen ${avsender}</p>

            <div style='border:1px solid rgba(0, 0, 0, 0.1)'></div>

            <h2 style='font-size: 1rem; line-height: 1rem; font-weight:bold; margin-block: 56px 20px; color:rgba(0,0,0,0.56);'>Mangler du tilgang til Min Side for Arbeidsgiver hos NAV?</h2>

            <div style='font-size: 1rem; padding:24px 24px; border-radius: 12px; background-color:#F7F7F7;'>
                <p style='padding-block: 0px; margin-block-end: 0.5rem; margin-block-start: 0px'>Tilgangen til NAVs rekrutteringstjenester styrer arbeidsgivere selv i <b>Altinn</b>.</p>
                <p style='margin-block-end: 0.5rem;'>For å få tilgang må du kontakte den som styrer tilgangene til virksomheten din. Det kan være noen i HR, en leder, mellomleder, eller noen på eiersiden i virksomheten.</p>
                <p style='margin-block-end: 0.5rem;'>Vi har lagd en oppskrift du kan dele med vedkommende for å gjøre det enklere for dem å gi deg tilgang.</p>

                <h3 style='font-size: 1rem;line-height: 1rem; font-weight:500; margin-block: 40px 32px'>Kopier den gjerne og send den til vedkommende:</h3>
                <div style='font-size: 1rem; padding:24px 24px; border-radius: 12px; border: 3px dashed rgba(0, 0, 0, 0.1); background-color:#fff;'>
                    <p style='padding-block: 0px; margin-block-end: 0.5rem; margin-block-start: 0px'>Du får denne meldingen fordi avsender ønsker å få tilgang til CV-er fra NAV på vegne av virksomheten din. </p>
                    <b>Gi tilganger til CV-er fra NAV:</b>
                    <ol>
                        <li>Logg inn i Altinn</li>
                        <li>Velg virksomheten din under 'Alle dine aktører'</li>
                        <li>Trykk på knappen 'Profil' øverst i menyen</li>
                        <li>Trykk på 'Andre med rettigheter til virksomheten'</li>
                        <li>Velg 'Legge til ny person eller virksomhet'</li>
                        <li>Legg inn personnummeret og etternavnet til personen som skal ha tilgang</li>
                        <li>Velg 'Gi tilgang til enkelttjenester'</li>
                        <li>Skriv 'Rekruttering', så vil alternativet komme opp som et valg. Velg 'Rekruttering'.</li>
                        <li>Bekreft</li>
                    </ol>
                    <p>
                        Denne enkeltrettigheten gir kun tilgang til å bruke NAV sine rekrutteringstjenester: publisere stillingsannonser og holde videomøter for stillinger på Arbeidsplassen, og motta CV-er fra NAV på <a href='#' style='text-decoration:none; color:#000; cursor: default; font-weight: bold;'>https://arbeidsgiver.nav.no/min-side-arbeidsgiver</a>.
                    </p>
                    <b>Ga ikke Altinn deg muligheten til å gi tilgang?</b>
                    <p>Du kan gi tilgang hvis du har en av disse rollene:</p>
                    <ul>
                        <li>Du er registrert i Enhetsregisteret som daglig leder, styrets leder, bestyrende reder eller innehaver.</li>
                        <li>Du er registert  som hovedadministrator i Altinn.</li>
                        <li>Du er 'Tilgangsstyrer' i Altinn og har én, eller flere av rollene: 'Rekruttering', 'Lønn og personalmedarbeider', eller 'Utfyller/innsender'.</li>
                    </ul>
                </div>
            </div>
        </body>
    </html>
`;

export default ForhåndsvisningAvEpost;
