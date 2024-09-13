import moment from 'moment';
import { Hit } from './domene/elastic/ElasticSearch';
import { EsRekrutteringsbistandstilling } from './domene/stilling/EsStilling';

const antallMåneder = 6;
export const filtrerOrdFraStilling = (hits: Hit<EsRekrutteringsbistandstilling>[] | undefined) => {
    let antallFiltrertBort = 0;
    const filtrertListe = hits?.filter((stilling) => {
        // overstyr filter for annonse nr:
        if (
            stilling._source?.stilling?.annonsenr &&
            ['2411402', '2490709', '2590256'].includes(stilling._source?.stilling?.annonsenr)
        ) {
            return stilling;
        }

        // 6 mnd fra publishByAdmin
        if (!stilling._source?.stilling?.publishedByAdmin) {
            return stilling;
        }

        const stillingsDatoForFilter = moment(stilling._source?.stilling?.publishedByAdmin);
        const seksMndSiden = moment().subtract(antallMåneder, 'months');

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
    'ROS',
    'ROP',
];

export const caseInsensetiveOrd = [
    'IPS',
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
