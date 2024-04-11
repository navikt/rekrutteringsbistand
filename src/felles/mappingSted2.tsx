// Bruk dennne i steden for gammel fil, som skal bort på grunn av uoptimal kompleksitet.
const stedmappingRaw = new Map<string, string[]>([
    // Oslo

    // Kontinentalsokkelen

    // Vestland
    ['Vestland.46', ['Hordaland.12', 'Sogn og Fjordane.14']],
    ['Bergen.4601', ['Bergen.1201']],
    ['Kinn.4602', ['Flora.1401', 'Vågsøy.1439']],
    ['Etne.4611', ['Etne.1211']],
    ['Sveio.4612', ['Sveio.1216']],
    ['Bømlo.4613', ['Bømlo.1219']],
    ['Stord.4614', ['Stord.1221']],
    ['Fitjar.4615', ['Fitjar.1222']],
    ['Tysnes.4616', ['Tysnes.1223']],
    ['Kvinnherad.4617', ['Kvinnherad.1224']],
    ['Ullensvang.4618', ['Jondal.1227', 'Odda.1228', 'Ullensvang.1231']],
    ['Ulvik.4620', ['Ulvik.1233']],
    ['Voss.4621', ['Voss.1235']],
    ['Eidfjord.4619', ['Eidfjord.1232']],
    ['Kvam.4622', ['Kvam.1238']],
    ['Samnanger.4623', ['Samnanger.1242']],
    ['Bjørnafjorden.4624', ['Os.1243', 'Fusa.1241']],
    ['Austevoll.4625', ['Austevoll.1244']],
    ['Øygarden.4626', ['Sund.1245', 'Fjell.1246', 'Øygarden.1259']],
    ['Askøy.4627', ['Askøy.1247']],
    ['Vaksdal.4628', ['Vaksdal.1251']],
    ['Modalen.4629', ['Modalen.1252']],
    ['Osterøy.4630', ['Osterøy.1253']],
    ['Alver.4631', ['Lindås.1263', 'Meland.1256', 'Radøy.1260']],
    ['Austrheim.4632', ['Austrheim.1264']],
    ['Fedje.4633', ['Fedje.1265']],
    ['Masfjorden.4634', ['Masfjorden.1266']],
    ['Gulen.4635', ['Gulen.1411']],
    ['Solund.4636', ['Solund.1412']],
    ['Hyllestad.4637', ['Hyllestad.1413']],
    ['Høyanger.4638', ['Høyanger.1416']],
    ['Vik.4639', ['Vik.1417']],
    ['Sogndal.4640', ['Balestrand.1418', 'Leikanger.1419', 'Sogndal.1420']],
    ['Aurland.4641', ['Aurland.1421']],
    ['Lærdal.4642', ['Lærdal.1422']],
    ['Luster.4644', ['Luster.1426']],
    ['Askvoll.4645', ['Askvoll.1428']],
    ['Fjaler.4646', ['Fjaler.1429']],
    ['Sunnfjord.4647', ['Førde.1432', 'Gaular.1430', 'Jølster.1431', 'Naustdal.1433']],
    ['Bremanger.4648', ['Bremanger.1438']],
    ['Stad.4649', ['Selje.1441', 'Eid.1443']],
    ['Gloppen.4650', ['Gloppen.1445']],
    ['Stryn.4651', ['Stryn.1449']],
    ['Årdal.4643', ['Årdal.1424']],

    // Akershus
    ['Akershus.32', ['Akershus.02', 'Viken.30']],
    ['Bærum.3201', ['Bærum.0219', 'Bærum.3024']],
    ['Lillestrøm.3205', ['Skedsmo.0231', 'Sørum.0226', 'Fet.0227', 'Lillestrøm.3030']],
    ['Asker.3203', ['Asker.0220', 'Asker.3025', 'Røyken.0627', 'Hurum.0628']],
    ['Nordre Follo.3207', ['Ski.0213', 'Oppegård.0217', 'Nordre Follo.3020']],
    ['Ullensaker.3209', ['Ullensaker.0235', 'Ullensaker.3033']],
    ['Nesodden.3212', ['Nesodden.0216', 'Nesodden.3023']],
    ['Frogn.3214', ['Frogn.0215', 'Frogn.3022']],
    ['Vestby.3216', ['Vestby.0211', 'Vestby.3019']],
    ['Ås.3218', ['Ås.0214', 'Ås.3021']],
    ['Enebakk.3220', ['Enebakk.0229', 'Enebakk.3028']],
    ['Lørenskog.3222', ['Lørenskog.0230', 'Lørenskog.3029']],
    ['Rælingen.3224', ['Rælingen.0228', 'Rælingen.3027']],
    ['Nes.3228', ['Nes.0236', 'Nes.3034']],
    ['Gjerdrum.3230', ['Gjerdrum.0234', 'Gjerdrum.3032']],
    ['Nittedal.3232', ['Nittedal.0233', 'Nittedal.3031']],
    ['Aurskog-Høland.3226', ['Aurskog-Høland.0221', 'Aurskog-Høland.3026', 'Rømskog.0121']],
    ['Lunner.3234', ['Lunner.0533', 'Lunner.3054']],
    ['Jevnaker.3236', ['Jevnaker.0532', 'Jevnaker.3053']],
    ['Nannestad.3238', ['Nannestad.0238', 'Nannestad.3036']],
    ['Eidsvoll.3240', ['Eidsvoll.0237', 'Eidsvoll.3035']],
    ['Hurdal.3242', ['Hurdal.0239', 'Hurdal.3037']],

    // Buskerud
    ['Buskerud.33', ['Buskerud.06', 'Viken.30']],
    ['Drammen.3301', ['Drammen.0602', 'Svelvik.0711', 'Nedre Eiker.0625', 'Drammen.3005']],
    ['Kongsberg.3303', ['Kongsberg.0604', 'Kongsberg.3006']],
    ['Ringerike.3305', ['Ringerike.0605', 'Ringerike.3007']],
    ['Hole.3310', ['Hole.0612', 'Hole.3038']],
    ['Lier.3312', ['Lier.0626', 'Lier.3049']],
    ['Øvre Eiker.3314', ['Øvre Eiker.0624', 'Øvre Eiker.3048']],
    ['Modum.3316', ['Modum.0623', 'Modum.3047']],
    ['Krødsherad.3318', ['Krødsherad.0622', 'Krødsherad.3046']],
    ['Flå.3320', ['Flå.0615', 'Flå.3039']],
    ['Nesbyen.3322', ['Nes.0616', 'Nesbyen.3040']],
    ['Gol.3324', ['Gol.0617', 'Gol.3041']],
    ['Hemsedal.3326', ['Hemsedal.0618', 'Hemsedal.3042']],
    ['Ål.3328', ['Ål.0619', 'Ål.3043']],
    ['Hol.3330', ['Hol.0620', 'Hol.3044']],
    ['Sigdal.3332', ['Sigdal.0621', 'Sigdal.3045']],
    ['Flesberg.3334', ['Flesberg.0631', 'Flesberg.3050']],
    ['Rollag.3336', ['Rollag.0632', 'Rollag.3051']],
    ['Nore og Uvdal.3338', ['Nore og Uvdal.0633', 'Nore og Uvdal.3052']],

    // Innlandet
    ['Innlandet.34', ['Hedmark.04', 'Oppland.05']],
    ['Kongsvinger.3401', ['Kongsvinger.0402']],
    ['Hamar.3403', ['Hamar.0403']],
    ['Lillehammer.3405', ['Lillehammer.0501']],
    ['Gjøvik.3407', ['Gjøvik.0502']],
    ['Ringsaker.3411', ['Ringsaker.0412']],
    ['Løten.3412', ['Løten.0415']],
    ['Stange.3413', ['Stange.0417']],
    ['Nord-Odal.3414', ['Nord-Odal.0418']],
    ['Sør-Odal.3415', ['Sør-Odal.0419']],
    ['Eidskog.3416', ['Eidskog.0420']],
    ['Grue.3417', ['Grue.0423']],
    ['Åsnes.3418', ['Åsnes.0425']],
    ['Våler.3419', ['Våler.0426']],
    ['Elverum.3420', ['Elverum.0427']],
    ['Trysil.3421', ['Trysil.0428']],
    ['Åmot.3422', ['Åmot.0429']],
    ['Stor-Elvdal.3423', ['Stor-Elvdal.0430']],
    ['Rendalen.3424', ['Rendalen.0432']],
    ['Engerdal.3425', ['Engerdal.0434']],
    ['Tolga.3426', ['Tolga.0436']],
    ['Tynset.3427', ['Tynset.0437']],
    ['Alvdal.3428', ['Alvdal.0438']],
    ['Folldal.3429', ['Folldal.0439']],
    ['Os.3430', ['Os.0441']],
    ['Dovre.3431', ['Dovre.0511']],
    ['Lesja.3432', ['Lesja.0512']],
    ['Skjåk.3433', ['Skjåk.0513']],
    ['Lom.3434', ['Lom.0514']],
    ['Vågå.3435', ['Vågå.0515']],
    ['Nord-Fron.3436', ['Nord-Fron.0516']],
    ['Sel.3437', ['Sel.0517']],
    ['Sør-Fron.3438', ['Sør-Fron.0519']],
    ['Ringebu.3439', ['Ringebu.0520']],
    ['Øyer.3440', ['Øyer.0521']],
    ['Gausdal.3441', ['Gausdal.0522']],
    ['Østre Toten.3442', ['Østre Toten.0528']],
    ['Vestre Toten.3443', ['Vestre Toten.0529']],
    ['Gran.3446', ['Gran.0534']],
    ['Søndre Land.3447', ['Søndre Land.0536']],
    ['Nordre Land.3448', ['Nordre Land.0538']],
    ['Sør-Aurdal.3449', ['Sør-Aurdal.0540']],
    ['Etnedal.3450', ['Etnedal.0541']],
    ['Nord-Aurdal.3451', ['Nord-Aurdal.0542']],
    ['Vestre Slidre.3452', ['Vestre Slidre.0543']],
    ['Øystre Slidre.3453', ['Øystre Slidre.0544']],
    ['Vang.3454', ['Vang.0545']],

    // Møre og Romsdal
    ['Molde.1506', ['Molde.1502', 'Midsund.1545', 'Nesset.1543']],
    [
        'Ålesund.1508',
        ['Ålesund.1504', 'Haram.1534', 'Sandøy.1546', 'Skodje.1529', 'Ørskog.1523', 'Ålesund.1507'],
    ],
    ['Volda.1577', ['Volda.1519', 'Hornindal.1444']],
    ['Fjord.1578', ['Norddal.1524', 'Stordal.1526']],
    ['Hustadvika.1579', ['Fræna.1548', 'Eide.1551']],
    ['Haram.1580', ['Haram.1534', 'Ålesund.1507']],

    // Telemark
    ['Telemark.40', ['Telemark.08', 'Vestfold og Telemark.38']],
    ['Porsgrunn.4001', ['Porsgrunn.0805', 'Porsgrunn.3806']],
    ['Skien.4003', ['Skien.0806', 'Skien.3807']],
    ['Notodden.4005', ['Notodden.0807', 'Notodden.3808']],
    ['Siljan.4010', ['Siljan.0811', 'Siljan.3812']],
    ['Bamble.4012', ['Bamble.0814', 'Bamble.3813']],
    ['Kragerø.4014', ['Kragerø.0815', 'Kragerø.3814']],
    ['Drangedal.4016', ['Drangedal.0817', 'Drangedal.3815']],
    ['Nome.4018', ['Nome.0819', 'Nome.3816']],
    ['Midt-Telemark.4020', ['Bø (Telemark).0821', 'Sauherad.0822', 'Midt-Telemark.3817']],
    ['Seljord.4022', ['Seljord.0828', 'Seljord.3820']],
    ['Hjartdal.4024', ['Hjartdal.0827', 'Hjartdal.3819']],
    ['Tinn.4026', ['Tinn.0826', 'Tinn.3818']],
    ['Kviteseid.4028', ['Kviteseid.0829', 'Kviteseid.3821']],
    ['Nissedal.4030', ['Nissedal.0830', 'Nissedal.3822']],
    ['Fyresdal.4032', ['Fyresdal.0831', 'Fyresdal.3823']],
    ['Tokke.4034', ['Tokke.0833', 'Tokke.3824']],
    ['Vinje.4036', ['Vinje.0834', 'Vinje.3825']],

    // Rogaland
    ['Stavanger.1103', ['Stavanger.1103', 'Finnøy.1141', 'Rennesøy.1142']],
    ['Sandnes.1108', ['Sandnes.1102', 'Forsand.1129']],

    // Nordland
    ['Narvik.1806', ['Narvik.1805', 'Ballangen.1854', 'Tysfjord.1850']],
    ['Hamarøy.1875', ['Hamarøy.1849', 'Tysfjord.1850']],

    // Trøndelag
    ['Trøndelag.50', ['Sør-Trøndelag.16', 'Nord-Trøndelag.17']],
    ['Trondheim.5001', ['Trondheim.1601', 'Klæbu.1662']],
    ['Steinkjer.5006', ['Steinkjer.1702', 'Verran.1724', 'Steinkjer.5004', 'Verran.5039']],
    [
        'Namsos.5007',
        [
            'Namsos.1703',
            'Namdalseid.1725',
            'Fosnes.1748',
            'Namsos.5005',
            'Namdalseid.5040',
            'Fosnes.5048',
        ],
    ],
    ['Frøya.5014', ['Frøya.1620']],
    ['Osen.5020', ['Osen.1633']],
    ['Oppdal.5021', ['Oppdal.1634']],
    ['Rennebu.5022', ['Rennebu.1635']],
    ['Røros.5025', ['Røros.1640']],
    ['Holtålen.5026', ['Holtålen.1644']],
    ['Midtre Gauldal.5027', ['Midtre Gauldal.1648']],
    ['Melhus.5028', ['Melhus.1653']],
    ['Skaun.5029', ['Skaun.1657']],
    ['Klæbu.5030', ['Klæbu.1662']],
    ['Malvik.5031', ['Malvik.1663']],
    ['Selbu.5032', ['Selbu.1664']],
    ['Tydal.5033', ['Tydal.1665']],
    ['Meråker.5034', ['Meråker.1711']],
    ['Stjørdal.5035', ['Stjørdal.1714']],
    ['Frosta.5036', ['Frosta.1717']],
    ['Levanger.5037', ['Levanger.1719']],
    ['Verdal.5038', ['Verdal.1721']],
    ['Snåase - Snåsa.5041', ['Snåase - Snåsa.1736']],
    ['Lierne.5042', ['Lierne.1738']],
    ['Raarvihke - Røyrvik.5043', ['Raarvihke - Røyrvik.1739']],
    ['Namsskogan.5044', ['Namsskogan.1740']],
    ['Grong.5045', ['Grong.1742']],
    ['Høylandet.5046', ['Høylandet.1743']],
    ['Overhalla.5047', ['Overhalla.1744']],
    ['Flatanger.5049', ['Flatanger.1749']],
    ['Leka.5052', ['Leka.1755']],
    ['Inderøy.5053', ['Inderøy.1756']],
    ['Indre Fosen.5054', ['Rissa.1624', 'Leksvik.1718']],
    ['Heim.5055', ['Hemne.1612', 'Halsa.1571', 'Snillfjord.1613', 'Hemne.5011', 'Snillfjord.5012']],
    ['Hitra.5056', ['Hitra.1617', 'Snillfjord.1613', 'Hitra.5013', 'Snillfjord.5012']],
    ['Ørland.5057', ['Ørland.1621', 'Bjugn.1627', 'Ørland.5015', 'Bjugn.5017']],
    ['Åfjord.5058', ['Åfjord.1630', 'Roan.1632', 'Åfjord.5018', 'Roan.5019']],
    [
        'Orkland.5059',
        [
            'Orkdal.1638',
            'Agdenes.1622',
            'Meldal.1636',
            'Snillfjord.1613',
            'Orkdal.5024',
            'Agdenes.5016',
            'Meldal.5023',
            'Snillfjord.5012',
        ],
    ],
    ['Nærøysund.5060', ['Vikna.1750', 'Nærøy.1751', 'Vikna.5050', 'Nærøy.5051']],
    ['Rindal.5061', ['Rindal.1567', 'Rindal.5061']],

    // Finnmark
    ['Finnmark.56', ['Finnmark.20', 'Troms og Finnmark.54']],
    ['Alta.5601', ['Alta.2012', 'Alta.5403']],
    ['Hammerfest.5603', ['Hammerfest.2004', 'Kvalsund.2017', 'Hammerfest.5406']],
    ['Sør-Varanger.5605', ['Sør-Varanger.2030', 'Sør-Varanger.5444']],
    ['Vadsø.5607', ['Vadsø.2003', 'Vadsø.5405']],
    ['Karasjok.5610', ['Karasjok.2021', 'Karasjok.5437']],
    ['Kautokeino.5612', ['Kautokeino.2011', 'Kautokeino.5430']],
    ['Loppa.5614', ['Loppa.2014', 'Loppa.5432']],
    ['Hasvik.5616', ['Hasvik.2015', 'Hasvik.5433']],
    ['Måsøy.5618', ['Måsøy.2018', 'Måsøy.5434']],
    ['Nordkapp.5620', ['Nordkapp.2019', 'Nordkapp.5435']],
    ['Porsanger.5622', ['Porsanger.2020', 'Porsanger.5436']],
    ['Lebesby.5624', ['Lebesby.2022', 'Lebesby.5438']],
    ['Gamvik.5626', ['Gamvik.2023', 'Gamvik.5439']],
    ['Tana.5628', ['Tana.2025', 'Tana.5441']],
    ['Berlevåg.5630', ['Berlevåg.2024', 'Berlevåg.5440']],
    ['Båtsfjord.5632', ['Båtsfjord.2028', 'Båtsfjord.5443']],
    ['Vardø.5634', ['Vardø.2002', 'Vardø.5404']],
    ['Nesseby.5636', ['Nesseby.2027', 'Nesseby.5442']],

    // Østfold
    ['Østfold.31', ['Østfold.01', 'Viken.30']],
    ['Halden.3101', ['Halden.0101', 'Halden.3001']],
    ['Moss.3103', ['Moss.0104', 'Rygge.0136', 'Moss.3002']],
    ['Sarpsborg.3105', ['Sarpsborg.0105', 'Sarpsborg.3003']],
    ['Fredrikstad.3107', ['Fredrikstad.0106', 'Fredrikstad.3004']],
    ['Hvaler.3110', ['Hvaler.0111', 'Hvaler.3011']],
    ['Råde.3112', ['Råde.0135', 'Råde.3017']],
    ['Våler.3114', ['Våler.0137', 'Våler.3018']],
    ['Skiptvet.3116', ['Skiptvet.0127', 'Skiptvet.3015']],
    [
        'Indre Østfold.3118',
        [
            'Trøgstad.0122',
            'Spydeberg.0123',
            'Askim.0124',
            'Eidsberg.0125',
            'Hobøl.0138',
            'Indre Østfold.3014',
        ],
    ],
    ['Rakkestad.3120', ['Rakkestad.0128', 'Rakkestad.3016']],
    ['Marker.3122', ['Marker.0119', 'Marker.3013']],
    ['Aremark.3124', ['Aremark.0118', 'Aremark.3012']],

    // Agder
    ['Agder.42', ['Aust-Agder.09', 'Vest-Agder.10']],
    ['Risør.4201', ['Risør.0901']],
    ['Grimstad.4202', ['Grimstad.0904']],
    ['Arendal.4203', ['Arendal.0906']],
    ['Kristiansand.4204', ['Kristiansand.1001', 'Songdalen.1017', 'Søgne.1018']],
    ['Lindesnes.4205', ['Mandal.1002', 'Marnardal.1021', 'Lindesnes.1029']],
    ['Farsund.4206', ['Farsund.1003']],
    ['Flekkefjord.4207', ['Flekkefjord.1004']],
    ['Gjerstad.4211', ['Gjerstad.0911']],
    ['Vegårshei.4212', ['Vegårshei.0912']],
    ['Tvedestrand.4213', ['Tvedestrand.0914']],
    ['Froland.4214', ['Froland.0919']],
    ['Lillesand.4215', ['Lillesand.0926']],
    ['Birkenes.4216', ['Birkenes.0928']],
    ['Åmli.4217', ['Åmli.0929']],
    ['Iveland.4218', ['Iveland.0935']],
    ['Evje og Hornnes.4219', ['Evje og Hornnes.0937']],
    ['Bygland.4220', ['Bygland.0938']],
    ['Valle.4221', ['Valle.0940']],
    ['Bykle.4222', ['Bykle.0941']],
    ['Vennesla.4223', ['Vennesla.1014']],
    ['Åseral.4224', ['Åseral.1026']],
    ['Lyngdal.4225', ['Audnedal.1027', 'Lyngdal.1032']],
    ['Hægebostad.4226', ['Hægebostad.1034']],
    ['Kvinesdal.4227', ['Kvinesdal.1037']],
    ['Sirdal.4228', ['Sirdal.1046']],

    // Vestfold
    ['Vestfold.39', ['Vestfold.07', 'Vestfold og Telemark.38']],
    ['Horten.3901', ['Horten.0701', 'Horten.3801']],
    ['Holmestrand.3903', ['Holmestrand.0715', 'Holmestrand.3802', 'Sande (Vestf.).0713']],
    ['Tønsberg.3905', ['Tønsberg.0704', 'Tønsberg.3803', 'Re.0716']],
    ['Sandefjord.3907', ['Sandefjord.0710', 'Sandefjord.3804']],
    ['Larvik.3909', ['Larvik.0712', 'Larvik.3805']],
    ['Færder.3911', ['Færder.0729', 'Færder.3811']],

    // Troms
    ['Troms.55', ['Troms.19', 'Troms og Finnmark.54']],
    ['Tromsø.5501', ['Tromsø.1902', 'Tromsø.5401']],
    ['Harstad.5503', ['Harstad.1903', 'Harstad.5402']],
    ['Kvæfjord.5510', ['Kvæfjord.1911', 'Kvæfjord.5411']],
    ['Tjeldsund.5512', ['Skånland.1913', 'Tjeldsund.1852', 'Tjeldsund.5412']],
    ['Ibestad.5514', ['Ibestad.1917', 'Ibestad.5413']],
    ['Gratangen.5516', ['Gratangen.1919', 'Gratangen.5414']],
    ['Lavangen.5518', ['Lavangen.1920', 'Lavangen.5415']],
    ['Bardu.5520', ['Bardu.1922', 'Bardu.5416']],
    ['Salangen.5522', ['Salangen.1923', 'Salangen.5417']],
    ['Målselv.5524', ['Målselv.1924', 'Målselv.5418']],
    ['Sørreisa.5526', ['Sørreisa.1925', 'Sørreisa.5419']],
    ['Dyrøy.5528', ['Dyrøy.1926', 'Dyrøy.5420']],
    ['Senja.5530', ['Tranøy.1927', 'Torsken.1928', 'Berg.1929', 'Lenvik.1931', 'Senja.5421']],
    ['Balsfjord.5532', ['Balsfjord.1933', 'Balsfjord.5422']],
    ['Karlsøy.5534', ['Karlsøy.1936', 'Karlsøy.5423']],
    ['Lyngen.5536', ['Lyngen.1938', 'Lyngen.5424']],
    ['Storfjord.5538', ['Storfjord.1939', 'Storfjord.5425']],
    ['Kåfjord.5540', ['Kåfjord.1940', 'Kåfjord.5426']],
    ['Skjervøy.5542', ['Skjervøy.1941', 'Skjervøy.5427']],
    ['Nordreisa.5544', ['Nordreisa.1942', 'Nordreisa.5428']],
    ['Kvænangen.5546', ['Kvænangen.5429', 'Kvænangen.1943']],
]);

export type Sted = {
    navn: string;
    nummer: string;
};

// Hjelpefunksjoner for geografistrenger

function lagStedFraStingIMap(input: string): Sted {
    const parts = input.split('.');
    return { navn: parts[0], nummer: parts[1] };
}

export function getNummerFraSted(sted: string): string {
    const parts = sted.split('.');
    const lastPart = parts[parts.length - 1];
    const match = lastPart.match(/\d+$/);
    return match ? match[0] : lastPart;
}

export function lagKandidatsøkstreng(sted: Sted): string {
    return sted.nummer.length === 2
        ? `${sted.navn}.NO${sted.nummer}`
        : `${sted.navn}.NO${sted.nummer.substring(0, 2)}.${sted.nummer}`;
}

// Mappinger som har Sted som key og values

const stedmappingNyTilGammel: Map<Sted, Sted[]> = new Map(
    Array.from(stedmappingRaw.entries()).map(([key, values]) => {
        const stedKey: Sted = lagStedFraStingIMap(key);
        const stedValues: Sted[] = values.map(lagStedFraStingIMap);
        return [stedKey, stedValues];
    })
);

const stedmappingGammelTilNy: Map<Sted, Sted> = new Map(
    Array.from(stedmappingNyTilGammel).flatMap(([key, values]): [Sted, Sted][] =>
        values.map((value) => [value, key])
    )
);

// Mappingfiler med enkel key, som slipper å evalueres på nytt for hvert kall

export const stedmappingFraNyttNavn: Map<string, Sted[]> = new Map(
    Array.from(stedmappingNyTilGammel.entries()).map(([key, values]) => {
        return [key.navn, values];
    })
);

export const stedmappingFraNyttNummer: Map<string, Sted[]> = new Map(
    Array.from(stedmappingNyTilGammel.entries()).map(([key, values]) => {
        return [key.nummer, values];
    })
);

export const stedmappingFraGammeltNavn: Map<string, Sted> = new Map(
    Array.from(stedmappingGammelTilNy.entries()).map(([key, value]) => {
        return [key.navn, value];
    })
);

export const stedmappingFraGammeltNummer: Map<string, Sted> = new Map(
    Array.from(stedmappingGammelTilNy.entries()).map(([key, value]) => {
        return [key.nummer, value];
    })
);
