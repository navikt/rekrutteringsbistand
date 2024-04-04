export const finnAlleVersjonerAvStedkoder = (sted2024: Set<string>): Set<string> => {
    const resultatArray = Array.from(sted2024).flatMap((s) =>
        stedMapping2024.has(s) ? [s, ...(stedMapping2024.get(s) || [])] : [s]
    );

    return new Set(resultatArray);
};

export const finn2024KodeForGammelKode = (gammelKode: string): string => {
    for (let [nøkkel2024, tidligereKoder] of stedMapping2024.entries()) {
        if (tidligereKoder.includes(gammelKode)) {
            return nøkkel2024;
        }
    }
    return gammelKode;
};

const stedMapping2024 = new Map<string, string[]>([
    // Oslo

    // Kontinentalsokkelen

    // Vestland
    ['Vestland.NO46', ['Hordaland.NO12', 'Sogn og Fjordane.NO14']],
    ['Bergen.NO46.4601', ['Bergen.NO12.1201']],
    ['Kinn.NO46.4602', ['Flora.NO14.1401', 'Vågsøy.NO14.1439']],
    ['Etne.NO46.4611', ['Etne.NO12.1211']],
    ['Sveio.NO46.4612', ['Sveio.NO12.1216']],
    ['Bømlo.NO46.4613', ['Bømlo.NO12.1219']],
    ['Stord.NO46.4614', ['Stord.NO12.1221']],
    ['Fitjar.NO46.4615', ['Fitjar.NO12.1222']],
    ['Tysnes.NO46.4616', ['Tysnes.NO12.1223']],
    ['Kvinnherad.NO46.4617', ['Kvinnherad.NO12.1224']],
    ['Ullensvang.NO46.4618', ['Jondal.NO12.1227', 'Odda.NO12.1228', 'Ullensvang.NO12.1231']],
    ['Ulvik.NO46.4620', ['Ulvik.NO12.1233']],
    ['Voss.NO46.4621', ['Voss.NO12.1235', 'Granvin.NO12.1234']],
    ['Eidfjord.NO46.4619', ['Eidfjord.NO12.1232']],
    ['Kvam.NO46.4622', ['Kvam.NO12.1238']],
    ['Samnanger.NO46.4623', ['Samnanger.NO12.1242']],
    ['Bjørnafjorden.NO46.4624', ['Os.NO12.1243', 'Fusa.NO12.1241']],
    ['Austevoll.NO46.4625', ['Austevoll.NO12.1244']],
    ['Øygarden.NO46.4626', ['Sund.NO12.1245', 'Fjell.NO12.1246', 'Øygarden.NO12.1259']],
    ['Askøy.NO46.4627', ['Askøy.NO12.1247']],
    ['Vaksdal.NO46.4628', ['Vaksdal.NO12.1251']],
    ['Modalen.NO46.4629', ['Modalen.NO12.1252']],
    ['Osterøy.NO46.4630', ['Osterøy.NO12.1253']],
    ['Alver.NO46.4631', ['Lindås.NO12.1263', 'Meland.NO12.1256', 'Radøy.NO12.1260']],
    ['Austrheim.NO46.4632', ['Austrheim.NO12.1264']],
    ['Fedje.NO46.4633', ['Fedje.NO12.1265']],
    ['Masfjorden.NO46.4634', ['Masfjorden.NO12.1266']],
    ['Gulen.NO46.4635', ['Gulen.NO14.1411']],
    ['Solund.NO46.4636', ['Solund.NO14.1412']],
    ['Hyllestad.NO46.4637', ['Hyllestad.NO14.1413']],
    ['Høyanger.NO46.4638', ['Høyanger.NO14.1416']],
    ['Vik.NO46.4639', ['Vik.NO14.1417']],
    ['Sogndal.NO46.4640', ['Balestrand.NO14.1418', 'Leikanger.NO14.1419', 'Sogndal.NO14.1420']],
    ['Aurland.NO46.4641', ['Aurland.NO14.1421']],
    ['Lærdal.NO46.4642', ['Lærdal.NO14.1422']],
    ['Luster.NO46.4644', ['Luster.NO14.1426']],
    ['Askvoll.NO46.4645', ['Askvoll.NO14.1428']],
    ['Fjaler.NO46.4646', ['Fjaler.NO14.1429']],
    [
        'Sunnfjord.NO46.4647',
        ['Førde.NO14.1432', 'Gaular.NO14.1430', 'Jølster.NO14.1431', 'Naustdal.NO14.1433'],
    ],
    ['Bremanger.NO46.4648', ['Bremanger.NO14.1438']],
    ['Stad.NO46.4649', ['Selje.NO14.1441', 'Eid.NO14.1443']],
    ['Gloppen.NO46.4650', ['Gloppen.NO14.1445']],
    ['Stryn.NO46.4651', ['Stryn.NO14.1449']],
    ['Årdal.NO46.4643', ['Årdal.NO14.1424']],

    // Akershus
    ['Akershus.NO32', ['Akershus.NO02', 'Viken.NO30']],
    ['Bærum.NO32.3201', ['Bærum.NO02.0219', 'Bærum.NO30.3024']],
    [
        'Lillestrøm.NO32.3205',
        ['Skedsmo.NO02.0231', 'Sørum.NO02.0226', 'Fet.NO02.0227', 'Lillestrøm.NO30.3030'],
    ],
    [
        'Asker.NO32.3203',
        ['Asker.NO02.0220', 'Asker.NO30.3025', 'Røyken.NO06.0627', 'Hurum.NO06.0628'],
    ],
    ['Nordre Follo.NO32.3207', ['Ski.NO02.0213', 'Oppegård.NO02.0217', 'Nordre Follo.NO30.3020']],
    ['Ullensaker.NO32.3209', ['Ullensaker.NO02.0235', 'Ullensaker.NO30.3033']],
    ['Nesodden.NO32.3212', ['Nesodden.NO02.0216', 'Nesodden.NO30.3023']],
    ['Frogn.NO32.3214', ['Frogn.NO02.0215', 'Frogn.NO30.3022']],
    ['Vestby.NO32.3216', ['Vestby.NO02.0211', 'Vestby.NO30.3019']],
    ['Ås.NO32.3218', ['Ås.NO02.0214', 'Ås.NO30.3021']],
    ['Enebakk.NO32.3220', ['Enebakk.NO02.0229', 'Enebakk.NO30.3028']],
    ['Lørenskog.NO32.3222', ['Lørenskog.NO02.0230', 'Lørenskog.NO30.3029']],
    ['Rælingen.NO32.3224', ['Rælingen.NO02.0228', 'Rælingen.NO30.3027']],
    ['Nes.NO32.3228', ['Nes.NO02.0236', 'Nes.NO30.3034']],
    ['Gjerdrum.NO32.3230', ['Gjerdrum.NO02.0234', 'Gjerdrum.NO30.3032']],
    ['Nittedal.NO32.3232', ['Nittedal.NO02.0233', 'Nittedal.NO30.3031']],
    [
        'Aurskog-Høland.NO32.3226',
        ['Aurskog-Høland.NO02.0221', 'Aurskog-Høland.NO30.3026', 'Rømskog.NO01.0121'],
    ],
    ['Lunner.NO32.3234', ['Lunner.NO05.0533', 'Lunner.NO30.3054']],
    ['Jevnaker.NO32.3236', ['Jevnaker.NO05.0532', 'Jevnaker.NO30.3053']],
    ['Nannestad.NO32.3238', ['Nannestad.NO02.0238', 'Nannestad.NO30.3036']],
    ['Eidsvoll.NO32.3240', ['Eidsvoll.NO02.0237', 'Eidsvoll.NO30.3035']],
    ['Hurdal.NO32.3242', ['Hurdal.NO02.0239', 'Hurdal.NO30.3037']],

    // Buskerud
    ['Buskerud.NO33', ['Buskerud.NO06', 'Viken.NO30']],
    [
        'Drammen.NO33.3301',
        ['Drammen.NO06.0602', 'Svelvik.NO07.0711', 'Nedre Eiker.NO06.0625', 'Drammen.NO30.3005'],
    ],
    ['Kongsberg.NO33.3303', ['Kongsberg.NO06.0604', 'Kongsberg.NO30.3006']],
    ['Ringerike.NO33.3305', ['Ringerike.NO06.0605', 'Ringerike.NO30.3007']],
    ['Hole.NO33.3310', ['Hole.NO06.0612', 'Hole.NO30.3038']],
    ['Lier.NO33.3312', ['Lier.NO06.0626', 'Lier.NO30.3049']],
    ['Øvre Eiker.NO33.3314', ['Øvre Eiker.NO06.0624', 'Øvre Eiker.NO30.3048']],
    ['Modum.NO33.3316', ['Modum.NO06.0623', 'Modum.NO30.3047']],
    ['Krødsherad.NO33.3318', ['Krødsherad.NO06.0622', 'Krødsherad.NO30.3046']],
    ['Flå.NO33.3320', ['Flå.NO06.0615', 'Flå.NO30.3039']],
    ['Nesbyen.NO33.3322', ['Nes.NO06.0616', 'Nesbyen.NO30.3040']],
    ['Gol.NO33.3324', ['Gol.NO06.0617', 'Gol.NO30.3041']],
    ['Hemsedal.NO33.3326', ['Hemsedal.NO06.0618', 'Hemsedal.NO30.3042']],
    ['Ål.NO33.3328', ['Ål.NO06.0619', 'Ål.NO30.3043']],
    ['Hol.NO33.3330', ['Hol.NO06.0620', 'Hol.NO30.3044']],
    ['Sigdal.NO33.3332', ['Sigdal.NO06.0621', 'Sigdal.NO30.3045']],
    ['Flesberg.NO33.3334', ['Flesberg.NO06.0631', 'Flesberg.NO30.3050']],
    ['Rollag.NO33.3336', ['Rollag.NO06.0632', 'Rollag.NO30.3051']],
    ['Nore og Uvdal.NO33.3338', ['Nore og Uvdal.NO06.0633', 'Nore og Uvdal.NO30.3052']],

    // Innlandet
    ['Innlandet.NO34', ['Hedmark.NO04', 'Oppland.NO05']],
    ['Kongsvinger.NO34.3401', ['Kongsvinger.NO04.0402']],
    ['Hamar.NO34.3403', ['Hamar.NO04.0403']],
    ['Lillehammer.NO34.3405', ['Lillehammer.NO05.0501']],
    ['Gjøvik.NO34.3407', ['Gjøvik.NO05.0502']],
    ['Ringsaker.NO34.3411', ['Ringsaker.NO04.0412']],
    ['Løten.NO34.3412', ['Løten.NO04.0415']],
    ['Stange.NO34.3413', ['Stange.NO04.0417']],
    ['Nord-Odal.NO34.3414', ['Nord-Odal.NO04.0418']],
    ['Sør-Odal.NO34.3415', ['Sør-Odal.NO04.0419']],
    ['Eidskog.NO34.3416', ['Eidskog.NO04.0420']],
    ['Grue.NO34.3417', ['Grue.NO04.0423']],
    ['Åsnes.NO34.3418', ['Åsnes.NO04.0425']],
    ['Våler.NO34.3419', ['Våler.NO04.0426']],
    ['Elverum.NO34.3420', ['Elverum.NO04.0427']],
    ['Trysil.NO34.3421', ['Trysil.NO04.0428']],
    ['Åmot.NO34.3422', ['Åmot.NO04.0429']],
    ['Stor-Elvdal.NO34.3423', ['Stor-Elvdal.NO04.0430']],
    ['Rendalen.NO34.3424', ['Rendalen.NO04.0432']],
    ['Engerdal.NO34.3425', ['Engerdal.NO04.0434']],
    ['Tolga.NO34.3426', ['Tolga.NO04.0436']],
    ['Tynset.NO34.3427', ['Tynset.NO04.0437']],
    ['Alvdal.NO34.3428', ['Alvdal.NO04.0438']],
    ['Folldal.NO34.3429', ['Folldal.NO04.0439']],
    ['Os.NO34.3430', ['Os.NO04.0441']],
    ['Dovre.NO34.3431', ['Dovre.NO05.0511']],
    ['Lesja.NO34.3432', ['Lesja.NO05.0512']],
    ['Skjåk.NO34.3433', ['Skjåk.NO05.0513']],
    ['Lom.NO34.3434', ['Lom.NO05.0514']],
    ['Vågå.NO34.3435', ['Vågå.NO05.0515']],
    ['Nord-Fron.NO34.3436', ['Nord-Fron.NO05.0516']],
    ['Sel.NO34.3437', ['Sel.NO05.0517']],
    ['Sør-Fron.NO34.3438', ['Sør-Fron.NO05.0519']],
    ['Ringebu.NO34.3439', ['Ringebu.NO05.0520']],
    ['Øyer.NO34.3440', ['Øyer.NO05.0521']],
    ['Gausdal.NO34.3441', ['Gausdal.NO05.0522']],
    ['Østre Toten.NO34.3442', ['Østre Toten.NO05.0528']],
    ['Vestre Toten.NO34.3443', ['Vestre Toten.NO05.0529']],
    ['Gran.NO34.3446', ['Gran.NO05.0534']],
    ['Søndre Land.NO34.3447', ['Søndre Land.NO05.0536']],
    ['Nordre Land.NO34.3448', ['Nordre Land.NO05.0538']],
    ['Sør-Aurdal.NO34.3449', ['Sør-Aurdal.NO05.0540']],
    ['Etnedal.NO34.3450', ['Etnedal.NO05.0541']],
    ['Nord-Aurdal.NO34.3451', ['Nord-Aurdal.NO05.0542']],
    ['Vestre Slidre.NO34.3452', ['Vestre Slidre.NO05.0543']],
    ['Øystre Slidre.NO34.3453', ['Øystre Slidre.NO05.0544']],
    ['Vang.NO34.3454', ['Vang.NO05.0545']],

    // Møre og Romsdal
    ['Molde.NO15.1506', ['Molde.NO15.1502', 'Midsund.NO15.1545', 'Nesset.NO15.1543']],
    [
        'Ålesund.NO15.1508',
        [
            'Ålesund.NO15.1504',
            'Haram.NO15.1534',
            'Sandøy.NO15.1546',
            'Skodje.NO15.1529',
            'Ørskog.NO15.1523',
            'Ålesund.NO15.1507',
        ],
    ],
    ['Volda.NO15.1577', ['Volda.NO15.1519', 'Hornindal.NO14.1444']],
    ['Fjord.NO15.1578', ['Norddal.NO15.1524', 'Stordal.NO15.1526']],
    ['Hustadvika.NO15.1579', ['Fræna.NO15.1548', 'Eide.NO15.1551']],
    ['Haram.NO15.1580', ['Haram.NO15.1534', 'Ålesund.NO15.1507']],

    // Telemark
    ['Telemark.NO40', ['Telemark.NO08', 'Vestfold og Telemark.NO38']],
    ['Porsgrunn.NO40.4001', ['Porsgrunn.NO08.0805', 'Porsgrunn.NO38.3806']],
    ['Skien.NO40.4003', ['Skien.NO08.0806', 'Skien.NO38.3807']],
    ['Notodden.NO40.4005', ['Notodden.NO08.0807', 'Notodden.NO38.3808']],
    ['Siljan.NO40.4010', ['Siljan.NO08.0811', 'Siljan.NO38.3812']],
    ['Bamble.NO40.4012', ['Bamble.NO08.0814', 'Bamble.NO38.3813']],
    ['Kragerø.NO40.4014', ['Kragerø.NO08.0815', 'Kragerø.NO38.3814']],
    ['Drangedal.NO40.4016', ['Drangedal.NO08.0817', 'Drangedal.NO38.3815']],
    ['Nome.NO40.4018', ['Nome.NO08.0819', 'Nome.NO38.3816']],
    [
        'Midt-Telemark.NO40.4020',
        ['Bø (Telemark).NO08.0821', 'Sauherad.NO08.0822', 'Midt-Telemark.NO38.3817'],
    ],
    ['Seljord.NO40.4022', ['Seljord.NO08.0828', 'Seljord.NO38.3820']],
    ['Hjartdal.NO40.4024', ['Hjartdal.NO08.0827', 'Hjartdal.NO38.3819']],
    ['Tinn.NO40.4026', ['Tinn.NO08.0826', 'Tinn.NO38.3818']],
    ['Kviteseid.NO40.4028', ['Kviteseid.NO08.0829', 'Kviteseid.NO38.3821']],
    ['Nissedal.NO40.4030', ['Nissedal.NO08.0830', 'Nissedal.NO38.3822']],
    ['Fyresdal.NO40.4032', ['Fyresdal.NO08.0831', 'Fyresdal.NO38.3823']],
    ['Tokke.NO40.4034', ['Tokke.NO08.0833', 'Tokke.NO38.3824']],
    ['Vinje.NO40.4036', ['Vinje.NO08.0834', 'Vinje.NO38.3825']],

    // Rogaland
    ['Stavanger.NO11.1103', ['Stavanger.NO11.1103', 'Finnøy.NO11.1141', 'Rennesøy.NO11.1142']],
    ['Sandnes.NO11.1108', ['Sandnes.NO11.1102', 'Forsand.NO11.1129']],

    // Nordland
    ['Narvik.NO18.1806', ['Narvik.NO18.1805', 'Ballangen.NO18.1854', 'Tysfjord.NO18.1850']],
    ['Hamarøy.NO18.1875', ['Hamarøy.NO18.1849', 'Tysfjord.NO18.1850']],

    // Svalbard

    // Trøndelag
    ['Trøndelag.NO50', ['Sør-Trøndelag.NO16', 'Nord-Trøndelag.NO17']],
    ['Trondheim.NO50.5001', ['Trondheim.NO16.1601', 'Klæbu.NO16.1662']],
    [
        'Steinkjer.NO50.5006',
        ['Steinkjer.NO17.1702', 'Verran.NO17.1724', 'Steinkjer.NO50.5004', 'Verran.NO50.5039'],
    ],
    [
        'Namsos.NO50.5007',
        [
            'Namsos.NO17.1703',
            'Namdalseid.NO17.1725',
            'Fosnes.NO17.1748',
            'Namsos.NO50.5005',
            'Namdalseid.NO50.5040',
            'Fosnes.NO50.5048',
        ],
    ],
    ['Frøya.NO50.5014', ['Frøya.NO16.1620']],
    ['Osen.NO50.5020', ['Osen.NO16.1633']],
    ['Oppdal.NO50.5021', ['Oppdal.NO16.1634']],
    ['Rennebu.NO50.5022', ['Rennebu.NO16.1635']],
    ['Røros.NO50.5025', ['Røros.NO16.1640']],
    ['Holtålen.NO50.5026', ['Holtålen.NO16.1644']],
    ['Midtre Gauldal.NO50.5027', ['Midtre Gauldal.NO16.1648']],
    ['Melhus.NO50.5028', ['Melhus.NO16.1653']],
    ['Skaun.NO50.5029', ['Skaun.NO16.1657']],
    ['Klæbu.NO50.5030', ['Klæbu.NO16.1662']],
    ['Malvik.NO50.5031', ['Malvik.NO16.1663']],
    ['Selbu.NO50.5032', ['Selbu.NO16.1664']],
    ['Tydal.NO50.5033', ['Tydal.NO16.1665']],
    ['Meråker.NO50.5034', ['Meråker.NO17.1711']],
    ['Stjørdal.NO50.5035', ['Stjørdal.NO17.1714']],
    ['Frosta.NO50.5036', ['Frosta.NO17.1717']],
    ['Levanger.NO50.5037', ['Levanger.NO17.1719']],
    ['Verdal.NO50.5038', ['Verdal.NO17.1721']],
    ['Snåase - Snåsa.NO50.5041', ['Snåase - Snåsa.NO17.1736']],
    ['Lierne.NO50.5042', ['Lierne.NO17.1738']],
    ['Raarvihke - Røyrvik.NO50.5043', ['Raarvihke - Røyrvik.NO17.1739']],
    ['Namsskogan.NO50.5044', ['Namsskogan.NO17.1740']],
    ['Grong.NO50.5045', ['Grong.NO17.1742']],
    ['Høylandet.NO50.5046', ['Høylandet.NO17.1743']],
    ['Overhalla.NO50.5047', ['Overhalla.NO17.1744']],
    ['Flatanger.NO50.5049', ['Flatanger.NO17.1749']],
    ['Leka.NO50.5052', ['Leka.NO17.1755']],
    ['Inderøy.NO50.5053', ['Inderøy.NO17.1756']],
    ['Indre Fosen.NO50.5054', ['Rissa.NO16.1624', 'Leksvik.NO17.1718']],
    [
        'Heim.NO50.5055',
        [
            'Hemne.NO16.1612',
            'Halsa.NO15.1571',
            'Snillfjord.NO16.1613',
            'Hemne.NO16.5011',
            'Snillfjord.NO50.5012',
        ],
    ],
    [
        'Hitra.NO50.5056',
        ['Hitra.NO16.1617', 'Snillfjord.NO16.1613', 'Hitra.NO50.5013', 'Snillfjord.NO50.5012'],
    ],
    [
        'Ørland.NO50.5057',
        ['Ørland.NO16.1621', 'Bjugn.NO16.1627', 'Ørland.NO50.5015', 'Bjugn.NO50.5017'],
    ],
    [
        'Åfjord.NO50.5058',
        ['Åfjord.NO16.1630', 'Roan.NO16.1632', 'Åfjord.NO16.5018', 'Roan.NO16.5019'],
    ],
    [
        'Orkland.NO50.5059',
        [
            'Orkdal.NO16.1638',
            'Agdenes.NO16.1622',
            'Meldal.NO16.1636',
            'Snillfjord.NO16.1613',
            'Orkdal.NO16.5024',
            'Agdenes.NO16.5016',
            'Meldal.NO16.5023',
            'Snillfjord.NO16.5012',
        ],
    ],
    [
        'Nærøysund.NO50.5060',
        ['Vikna.NO17.1750', 'Nærøy.NO17.1751', 'Vikna.NO50.5050', 'Nærøy.NO50.5051'],
    ],
    ['Rindal.NO50.5061', ['Rindal.NO15.1567', 'Rindal.NO15.5061']],

    // Finnmark
    ['Finnmark.NO56', ['Finnmark.NO20', 'Troms og Finnmark.NO54']],
    ['Alta.NO56.5601', ['Alta.NO20.2012', 'Alta.NO54.5403']],
    [
        'Hammerfest.NO56.5603',
        ['Hammerfest.NO20.2004', 'Kvalsund.NO20.2017', 'Hammerfest.NO54.5406'],
    ],
    ['Sør-Varanger.NO56.5605', ['Sør-Varanger.NO20.2030', 'Sør-Varanger.NO54.5444']],
    ['Vadsø.NO56.5607', ['Vadsø.NO20.2003', 'Vadsø.NO54.5405']],
    ['Karasjok.NO56.5610', ['Karasjok.NO20.2021', 'Karasjok.NO54.5437']],
    ['Kautokeino.NO56.5612', ['Kautokeino.NO20.2011', 'Kautokeino.NO54.5430']],
    ['Loppa.NO56.5614', ['Loppa.NO20.2014', 'Loppa.NO54.5432']],
    ['Hasvik.NO56.5616', ['Hasvik.NO20.2015', 'Hasvik.NO54.5433']],
    ['Måsøy.NO56.5618', ['Måsøy.NO20.2018', 'Måsøy.NO54.5434']],
    ['Nordkapp.NO56.5620', ['Nordkapp.NO20.2019', 'Nordkapp.NO54.5435']],
    ['Porsanger.NO56.5622', ['Porsanger.NO20.2020', 'Porsanger.NO54.5436']],
    ['Lebesby.NO56.5624', ['Lebesby.NO20.2022', 'Lebesby.NO54.5438']],
    ['Gamvik.NO56.5626', ['Gamvik.NO20.2023', 'Gamvik.NO54.5439']],
    ['Tana.NO56.5628', ['Tana.NO20.2025', 'Tana.NO54.5441']],
    ['Berlevåg.NO56.5630', ['Berlevåg.NO20.2024', 'Berlevåg.NO54.5440']],
    ['Båtsfjord.NO56.5632', ['Båtsfjord.NO20.2028', 'Båtsfjord.NO54.5443']],
    ['Vardø.NO56.5634', ['Vardø.NO20.2002', 'Vardø.NO54.5404']],
    ['Nesseby.NO56.5636', ['Nesseby.NO20.2027', 'Nesseby.NO54.5442']],

    // Jan Mayen

    // Østfold
    ['Østfold.NO31', ['Østfold.NO01', 'Viken.NO30']],
    ['Halden.NO31.3101', ['Halden.NO01.0101', 'Halden.NO30.3001']],
    ['Moss.NO31.3103', ['Moss.NO01.0104', 'Rygge.NO01.0136', 'Moss.NO30.3002']],
    ['Sarpsborg.NO31.3105', ['Sarpsborg.NO01.0105', 'Sarpsborg.NO30.3003']],
    ['Fredrikstad.NO31.3107', ['Fredrikstad.NO01.0106', 'Fredrikstad.NO30.3004']],
    ['Hvaler.NO31.3110', ['Hvaler.NO01.0111', 'Hvaler.NO30.3011']],
    ['Råde.NO31.3112', ['Råde.NO01.0135', 'Råde.NO30.3017']],
    ['Våler.NO31.3114', ['Våler.NO01.0137', 'Våler.NO30.3018']],
    ['Skiptvet.NO31.3116', ['Skiptvet.NO01.0127', 'Skiptvet.NO30.3015']],
    [
        'Indre Østfold.NO31.3118',
        [
            'Trøgstad.NO01.0122',
            'Spydeberg.NO01.0123',
            'Askim.NO01.0124',
            'Eidsberg.NO01.0125',
            'Hobøl.NO01.0138',
            'Indre Østfold.NO30.3014',
        ],
    ],
    ['Rakkestad.NO31.3120', ['Rakkestad.NO01.0128', 'Rakkestad.NO30.3016']],
    ['Marker.NO31.3122', ['Marker.NO01.0119', 'Marker.NO30.3013']],
    ['Aremark.NO31.3124', ['Aremark.NO01.0118', 'Aremark.NO30.3012']],

    // Agder
    ['Agder.NO42', ['Aust-Agder.NO09', 'Vest-Agder.NO10']],
    ['Risør.NO42.4201', ['Risør.NO09.0901']],
    ['Grimstad.NO42.4202', ['Grimstad.NO09.0904']],
    ['Arendal.NO42.4203', ['Arendal.NO09.0906']],
    [
        'Kristiansand.NO42.4204',
        ['Kristiansand.NO10.1001', 'Songdalen.NO10.1017', 'Søgne.NO10.1018'],
    ],
    ['Lindesnes.NO42.4205', ['Mandal.NO10.1002', 'Marnardal.NO10.1021', 'Lindesnes.NO10.1029']],
    ['Farsund.NO42.4206', ['Farsund.NO10.1003']],
    ['Flekkefjord.NO42.4207', ['Flekkefjord.NO10.1004']],
    ['Gjerstad.NO42.4211', ['Gjerstad.NO09.0911']],
    ['Vegårshei.NO42.4212', ['Vegårshei.NO09.0912']],
    ['Tvedestrand.NO42.4213', ['Tvedestrand.NO09.0914']],
    ['Froland.NO42.4214', ['Froland.NO09.0919']],
    ['Lillesand.NO42.4215', ['Lillesand.NO09.0926']],
    ['Birkenes.NO42.4216', ['Birkenes.NO09.0928']],
    ['Åmli.NO42.4217', ['Åmli.NO09.0929']],
    ['Iveland.NO42.4218', ['Iveland.NO09.0935']],
    ['Evje og Hornnes.NO42.4219', ['Evje og Hornnes.NO09.0937']],
    ['Bygland.NO42.4220', ['Bygland.NO09.0938']],
    ['Valle.NO42.4221', ['Valle.NO09.0940']],
    ['Bykle.NO42.4222', ['Bykle.NO09.0941']],
    ['Vennesla.NO42.4223', ['Vennesla.NO10.1014']],
    ['Åseral.NO42.4224', ['Åseral.NO10.1026']],
    ['Lyngdal.NO42.4225', ['Audnedal.NO10.1027', 'Lyngdal.NO10.1032']],
    ['Hægebostad.NO42.4226', ['Hægebostad.NO10.1034']],
    ['Kvinesdal.NO42.4227', ['Kvinesdal.NO10.1037']],
    ['Sirdal.NO42.4228', ['Sirdal.NO10.1046']],

    // Vestfold
    ['Vestfold.NO39', ['Vestfold.NO07', 'Vestfold og Telemark.NO38']],
    ['Horten.NO39.3901', ['Horten.NO07.0701', 'Horten.NO38.3801']],
    [
        'Holmestrand.NO39.3903',
        ['Holmestrand.NO07.0715', 'Holmestrand.NO38.3802', 'Sande (Vestf.) NO07.0713'],
    ],
    ['Tønsberg.NO39.3905', ['Tønsberg.NO07.0704', 'Tønsberg.NO38.3803', 'Re NO07.0716']],
    ['Sandefjord.NO39.3907', ['Sandefjord.NO07.0710', 'Sandefjord.NO38.3804']],
    ['Larvik.NO39.3909', ['Larvik.NO07.0712', 'Larvik.NO38.3805']],
    ['Færder.NO39.3911', ['Færder.NO07.0729', 'Færder.NO38.3811']],

    // Troms
    ['Troms.NO55', ['Troms.NO19', 'Troms og Finnmark.NO54']],
    ['Tromsø.NO55.5501', ['Tromsø.NO19.1902', 'Tromsø.NO54.5401']],
    ['Harstad.NO55.5503', ['Harstad.NO19.1903', 'Harstad.NO54.5402']],
    ['Kvæfjord.NO55.5510', ['Kvæfjord.NO19.1911', 'Kvæfjord.NO54.5411']],
    ['Tjeldsund.NO55.5512', ['Skånland.NO19.1913', 'Tjeldsund.NO18.1852', 'Tjeldsund.NO54.5412']],
    ['Ibestad.NO55.5514', ['Ibestad.NO19.1917', 'Ibestad.NO54.5413']],
    ['Gratangen.NO55.5516', ['Gratangen.NO19.1919', 'Gratangen.NO54.5414']],
    ['Lavangen.NO55.5518', ['Lavangen.NO19.1920', 'Lavangen.NO54.5415']],
    ['Bardu.NO55.5520', ['Bardu.NO19.1922', 'Bardu.NO54.5416']],
    ['Salangen.NO55.5522', ['Salangen.NO19.1923', 'Salangen.NO54.5417']],
    ['Målselv.NO55.5524', ['Målselv.NO19.1924', 'Målselv.NO54.5418']],
    ['Sørreisa.NO55.5526', ['Sørreisa.NO19.1925', 'Sørreisa.NO54.5419']],
    ['Dyrøy.NO55.5528', ['Dyrøy.NO19.1926', 'Dyrøy.NO54.5420']],
    [
        'Senja.NO55.5530',
        [
            'Tranøy.NO19.1927',
            'Torsken.NO19.1928',
            'Berg.NO19.1929',
            'Lenvik.NO19.1931',
            'Senja.NO54.5421',
        ],
    ],
    ['Balsfjord.NO55.5532', ['Balsfjord.NO19.1933', 'Balsfjord.NO54.5422']],
    ['Karlsøy.NO55.5534', ['Karlsøy.NO19.1936', 'Karlsøy.NO54.5423']],
    ['Lyngen.NO55.5536', ['Lyngen.NO19.1938', 'Lyngen.NO54.5424']],
    ['Storfjord.NO55.5538', ['Storfjord.NO19.1939', 'Storfjord.NO54.5425']],
    ['Kåfjord.NO55.5540', ['Kåfjord.NO19.1940', 'Kåfjord.NO54.5426']],
    ['Skjervøy.NO55.5542', ['Skjervøy.NO19.1941', 'Skjervøy.NO54.5427']],
    ['Nordreisa.NO55.5544', ['Nordreisa.NO19.1942', 'Nordreisa.NO54.5428']],
    ['Kvænangen.NO55.5546', ['Kvænangen.NO54.5429', 'Kvænangen.NO19.1943']],
]);

const stedMapping2024FinnNåværendeKode = new Map(
    Array.from(stedMapping2024).flatMap(([key, values]): [string, string][] =>
        values.map((value) => [value, key])
    )
);

export const finnNåværendeKode = (sted: string): string => {
    console.log(
        `mapping sted ${sted}`,
        stedMapping2024FinnNåværendeKode,
        'mapped',
        stedMapping2024FinnNåværendeKode.get(sted),
        'retur',
        stedMapping2024FinnNåværendeKode.get(sted) ?? sted
    );
    return stedMapping2024FinnNåværendeKode.get(sted) ?? sted;
};

const stedMapping2024FinnNåværendeNavnUppercase = new Map(
    Array.from(stedMapping2024).flatMap(([key, values]): [string, string][] =>
        values.map((value) => [value.split('.')[0].toUpperCase(), key.split('.')[0].toUpperCase()])
    )
);

export const finnNåværendeNavnUppercase = (sted: string): string => {
    return stedMapping2024FinnNåværendeNavnUppercase.get(sted.toUpperCase()) ?? sted.toUpperCase();
};
