export type SensitivtOrd = {
    ord: string;
    match: string;
    kategori: 'helseopplysning' | 'ytelse';
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
        match: '\\b(r|R)(u|U)(s|S)',
        kategori: 'helseopplysning',
    },
    {
        ord: 'KVP',
        match: '\\b(k|K)(v|V)(p|P)\\b',
        kategori: 'ytelse',
    },
];
