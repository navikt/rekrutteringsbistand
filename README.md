# rekrutteringsbistand

Et arbeidsmobiliseringsverktøy for veiledere og markedskontakter i NAV.

## Installasjon

```
npm install
```

## Utvikling

Følgende kommando starter appen i et utviklingsmiljø. Alle API-kall er mocket så man ikke trenger å kjøre backends lokalt.

```sh
npm run start
```

### Modia

I utviklingsmiljøet er Modia-dekoratøren erstattet med en placeholder. Slik laster du heller inn den ekte Modia-dekoratøren:

```sh
npm run start:modia
```

### Mock

Noen ganger er det ønskelig å koble appen direkte backend i stedet for å mocke 


Merk at Aiven krever brukernavn og passord for autentisering. Det er opprettet en proxy i `vite.config.ts`, men for at denne skal fungere må du opprette en fil `.env.development.local` på rot og definere følgende miljøvariabler:

```
# Stillingssøk
STILLING_ES_USERNAME=<brukernavn>
STILLING_ES_PASSWORD=<passord>
STILLING_ES_URI=<url>

# Kandidatsøk
KANDIDAT_ES_USERNAME=<brukernavn>
KANDIDAT_ES_PASSWORD=<passord>
KANDIDAT_ES_URI=<url>
```

### Server

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
* IT-avdelingen i [Arbeids- og velferdsdirektoratet](https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/arbeids-og-velferdsdirektoratet-kontorinformasjon)

