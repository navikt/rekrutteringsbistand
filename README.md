# Rekrutteringsbistand #Frontend

Et arbeidsmobiliseringsverktøy for veiledere og markedskontakter i Nav.

## Installasjon

```

npm install

```

## Utvikling

Følgende kommando starter appen i et utviklingsmiljø. Alle API-kall er mocket med msw.js.

```sh

npm run start

```

### For typing:

json til type: https://quicktype.io/

Type til zod: https://transform.tools/typescript-to-zod

### Mock

Noen ganger er det ønskelig å koble appen direkte backend i stedet for å mocke

Merk at Aiven krever brukernavn og passord for autentisering. Det er opprettet en proxy i `vite.config.ts`, men for at denne skal fungere må du være koblet til nais og opprette en fil `.env.development.local` på rot og definere følgende miljøvariabler:

```

# Stillingssøk

STILLING_ES_USERNAME=<brukernavn>

STILLING_ES_PASSWORD=<passord>

STILLING_ES_URI=<url>

```

```

# Kandidatsøk

KANDIDAT_ES_USERNAME=<brukernavn>
KANDIDAT_ES_PASSWORD=<passord>
KANDIDAT_ES_URI=<url>

```

## Manuell Testing 

### Playwright 
install: npx playwright install (dermed npm i)
Kjør tester: npx playwright test 

Kodegenerator: npx playwright codegen localhost:3000



### Test brukere:

| Rolle | Email |
| ---- | ---- |
| Modia-Generell | F_Z993163.E_Z993163@----- |
| Jobbrettet | F_Z993098.E_Z993098@----- |
| Arbeidsgiverrettet | F_Z993141.E_Z993141@----- |
| Utvikler | F_Z994886.E_Z994886@----- |

# Rekrutteringsbistand #Frackend

Følgende kommando starter serveren for lokal utvikling:

```sh

cd server && npm run start

```

For at serveren skal kjøre må du definere noen miljøvariabler. Dette kan gjøres ved å lage en fil i `server/.env.local`. Se [dotenv](https://github.com/motdotla/dotenv) for dokumentasjon.


```sh

# Fortell server at du kjører lokalt.

LOKALT=true


# Legg til andre miljøvariabler

EKSEMPEL_API_URL=http://eksempel.nav.no

```

  
# Henvendelser

## For Nav-ansatte

* Dette Git-repositoriet eies av [Team Toi i Produktområde arbeidsgiver](https://teamkatalog.nav.no/team/76f378c5-eb35-42db-9f4d-0e8197be0131).

* Slack: [#arbeidsgiver-toi-dev](https://nav-it.slack.com/archives/C02HTU8DBSR)

## For folk utenfor Nav

* IT-avdelingen i [Arbeids- og velferdsdirektoratet](https://www.nav.no/no/nav+og+samfunn/Kontakt+nav/Relatert+informasjon/arbeids-og-velferdsdirektoratet-kontorinformasjon)