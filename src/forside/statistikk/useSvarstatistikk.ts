// import { api, videresendTilInnlogging } from 'felles/api';
// import { Nettressurs, Nettstatus } from 'felles/nettressurs';
// import { useEffect, useState } from 'react';
// import { formaterDatoTilApi } from './datoUtils';

// export type Svarstatistikk = {
//     antallSvartJa: number;
//     antallSvartNei: number;
//     antallVenterPåSvar: number;
//     antallUtløpteSvar: number;
// };

// const useSvarstatistikk = (navKontor: string, fraOgMed: Date, tilOgMed: Date) => {
//     const [svarstatistikk, setSvarstatistikk] = useState<Nettressurs<Svarstatistikk>>({
//         kind: Nettstatus.IkkeLastet,
//     });

//     useEffect(() => {
//         const url =
//             `${api.forespørselOmDelingAvCv}/statistikk?` +
//             new URLSearchParams({
//                 fraOgMed: formaterDatoTilApi(fraOgMed),
//                 tilOgMed: formaterDatoTilApi(tilOgMed),
//                 navKontor,
//             });

//         const hentData = async () => {
//             setSvarstatistikk({
//                 kind: Nettstatus.LasterInn,
//             });

//             const respons = await fetch(url, {
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'same-origin',
//             });

//             if (respons.ok) {
//                 setSvarstatistikk({
//                     kind: Nettstatus.Suksess,
//                     data: await respons.json(),
//                 });
//             } else if (respons.status === 401) {
//                 videresendTilInnlogging();

//                 setSvarstatistikk({
//                     kind: Nettstatus.Feil,
//                     error: {
//                         message: 'Er ikke logget inn',
//                     },
//                 });
//             } else {
//                 setSvarstatistikk({
//                     kind: Nettstatus.Feil,
//                     error: { message: 'Kunne ikke laste inn statistikk' },
//                 });
//             }
//         };
//         hentData();
//     }, [navKontor, fraOgMed, tilOgMed]);

//     return svarstatistikk;
// };
