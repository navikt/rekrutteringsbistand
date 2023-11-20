import moment from 'moment';
import { Hit } from './domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from './domene/stilling/EsStilling';
import { KandidatlisteSammendrag } from 'felles/domene/kandidatliste/Kandidatliste';

export const filtrerOrdFraStilling = (hits: Hit<EsRekrutteringsbistandstilling>[]) => {
    let antallFiltrertBort = 0;
    const filtrertListe = hits?.filter((stilling) => {
        // 6 mnd fra publishByAdmin
        if (!stilling._source?.stilling?.publishedByAdmin) {
            return stilling;
        }

        const stillingsDatoForFilter = moment(stilling._source?.stilling?.publishedByAdmin);
        const seksMndSiden = moment().subtract(6, 'months');
        if (!stillingsDatoForFilter.isBefore(seksMndSiden)) {
            return stilling;
        }

        const harCaseSensetiveOrd = caseSensetiveOrd.some((ord) =>
            stilling._source.stilling.title.includes(ord)
        );
        const harCaseInsensetiveOrd = caseInsensetiveOrd.some((ord) =>
            stilling._source.stilling.title.toLowerCase().includes(ord.toLowerCase())
        );

        if (harCaseSensetiveOrd || harCaseInsensetiveOrd) {
            antallFiltrertBort++;
            return null;
        }
        return stilling;
    });
    return { hits: filtrertListe ?? [], antallFiltrertBort };
};

export const filtrerOrdFraKandidatliste = (kandidatlister: KandidatlisteSammendrag[]) => {
    let antallFiltrertBort = 0;
    const filtrertListe = kandidatlister?.filter((kandidatliste) => {
        // 6 mnd fra publishByAdmin
        if (!kandidatliste.opprettetTidspunkt) {
            return kandidatliste;
        }

        const stillingsDatoForFilter = moment(kandidatliste.opprettetTidspunkt);
        const seksMndSiden = moment().subtract(6, 'months');
        if (!stillingsDatoForFilter.isBefore(seksMndSiden)) {
            return kandidatliste;
        }

        const harCaseSensetiveOrd = caseSensetiveOrd.some((ord) =>
            kandidatliste.tittel.includes(ord)
        );
        const harCaseInsensetiveOrd = caseInsensetiveOrd.some((ord) =>
            kandidatliste.tittel.toLowerCase().includes(ord.toLowerCase())
        );

        if (harCaseSensetiveOrd || harCaseInsensetiveOrd) {
            antallFiltrertBort++;
            return null;
        }
        return kandidatliste;
    });
    return { filtrertListe, antallFiltrertBort };
};

export const caseSensetiveOrd = [
    'AFT',
    'AMO',
    'AMS',
    'ARR',
    'DPS',
    'DPS',
    'FACT',
    'IPS',
    'SE',
    'UO',
    'UOO',
    'UTVO',
    'VTA',
    'sad',
];

export const caseInsensetiveOrd = [
    'KVP',
    'Kvalifiseringsprogram',
    'kvalifiseringsprogram',
    'kvalifiseringsprogrammet',
    'Aktivitetsplikt',
    'Angst',
    'Arbeid med støtte',
    'Arbeids- og utdanningsreiser',
    'Arbeidsevne',
    'Arbeidsforberedende trening',
    'Arbeidsmarkedskurs',
    'Arbeidspraksis',
    'Arbeidsrettet rehabilitering',
    'Arbeidstrening',
    'AU-reiser',
    'Avklaring',
    'Avklaring',
    'Avklaringstiltak',
    'Barn',
    'Behandling',
    'Behov',
    'Behovsliste',
    'Booppfølging',
    'Deltaker',
    'Deltaker',
    'Depresjon',
    'Diagnoser',
    'Fastlege',
    'Flyktning',
    'Fravær',
    'Gjeld',
    'Helseavklaring',
    'Husleie',
    'Individuell jobbstøtte',
    'Introduksjonsprogram',
    'Introduksjonsstønad',
    'Jobbklar',
    'Jobbspesialist',
    'Jobbspesialist',
    'Kognitive utfordringer',
    'Kognitive problemer',
    'Kognitivt',
    'Kommunale lavterskeltilbud',
    'Kommunale tiltak',
    'Kommunale tjenester',
    'Kommunale tjenester',
    'Koordinert bistand',
    'Kvalifiseringsstønad',
    'Kvalifiseringslønn',
    'kvalifiseringsprogram',
    'Lån',
    'Langvarig',
    'Livsopphold',
    'Lønnstilskudd',
    'Mentor',
    'Mentortilskudd',
    'Midlertidig bolig',
    'Midlertidig botilbud',
    'Nedsatt arbeidsevne',
    'Nedsatt funksjon',
    'Norskferdigheter',
    'Økonomi',
    'Økonomisk kartlegging',
    'Økonomisk rådgivning',
    'Økonomisk sosialhjelp',
    'Økonomisk stønad',
    'Oppfølging',
    'Oppfølging',
    'Oppfølgingstiltak',
    'Oppfølgning i bolig',
    'Opplæring',
    'Opplæringstiltak',
    'Pengestøtte',
    'Problemer',
    'Psykiatri',
    'Psykolog',
    'Rehabilitering',
    'Restanse',
    'Rus',
    'Sommerjobb',
    'Sommerjobbtiltak',
    'Sosial oppfølging',
    'Sosiale problemer',
    'Sosiale utfordringer',
    'Sosialfaglig oppfølging',
    'Sosialhjelp',
    'Sosialhjelpsmottaker',
    'Sosialstønad',
    'Supplerende stønad ev supplering',
    'Supported Employment',
    'Syk',
    'Sykdom',
    'Sykemeldt',
    'Sykt barn',
    'Tilskudd',
    'Tiltak',
    'Tiltaksdeltaker',
    'Ukrain',
    'Ukraina',
    'Ungdom',
    'Utdanning',
    'Utdanningstiltak',
    'Utfordringer',
    'Utvidet oppfølging',
    'Varig tilrettelagt arbeid',
    'Venteliste',
];
