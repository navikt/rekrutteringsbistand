export type SensitivtOrd = {
    ord: string;
    match: string;
    kategori: 'helseopplysning' | 'ytelse' | 'sensitiv informasjon';
};

export const hentSensitiveOrd = (tekst: string) =>
    sensitiveOrd.filter((sensitivtOrd) => new RegExp(sensitivtOrd.match).test(tekst));

const sensitiveOrd: SensitivtOrd[] = [
    {
        ord: 'syke',
        match: '\\b(s|S)(y|Y)(k|K)(e|E)',
        kategori: 'helseopplysning',
    },
    {
        ord: 'helse',
        match: '\\b(h|H)(e|E)(l|L)(s|S)(e|E)',
        kategori: 'helseopplysning',
    },
    {
        ord: 'rus',
        match: '\\b(r|R)(u|U)(s|S)\\b',
        kategori: 'helseopplysning',
    },

    {
        ord: 'soning',
        match: 'soning',
        kategori: 'sensitiv informasjon',
    },
    {
        ord: 'fengsel',
        match: 'fengsel',
        kategori: 'sensitiv informasjon',
    },
    {
        ord: 'gravid',
        match: '\\bgravid\\b',
        kategori: 'sensitiv informasjon',
    },

    {
        ord: 'KVP',
        match: '\\b(k|K)(v|V)(p|P)\\b',
        kategori: 'ytelse',
    },
    {
        ord: 'IPS',
        match: '\\b(i|I)(p|P)(s|S)\\b',
        kategori: 'ytelse',
    },
    {
        ord: 'AAP',
        match: '\\b(a|A)(a|A)(p|P)\\b',
        kategori: 'ytelse',
    },
    {
        ord: 'arbeidsavklaringspenger',
        match: '\\barbeidsavklaringspenger\\b',
        kategori: 'ytelse',
    },
];