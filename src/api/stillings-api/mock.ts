import { FylkeDTO } from './hentFylker';
import { KommuneDTO } from './hentKommuner';
import { HentLandlisteDTO } from './hentLand';

export const kommuneMock: KommuneDTO[] = [
    { code: '4216', name: 'BIRKENES', countyCode: '42', capitalizedName: 'Birkenes' },
    { code: '4646', name: 'FJALER', countyCode: '46', capitalizedName: 'Fjaler' },
    { code: '3452', name: 'VESTRE SLIDRE', countyCode: '34', capitalizedName: 'Vestre Slidre' },
    { code: '4213', name: 'TVEDESTRAND', countyCode: '42', capitalizedName: 'Tvedestrand' },
    { code: '4648', name: 'BREMANGER', countyCode: '46', capitalizedName: 'Bremanger' },
    {
        code: '1818',
        name: 'HERØY (NORDLAND)',
        countyCode: '18',
        capitalizedName: 'Herøy (Nordland)',
    },
    { code: '3301', name: 'DRAMMEN', countyCode: '33', capitalizedName: 'Drammen' },
    { code: '4633', name: 'FEDJE', countyCode: '46', capitalizedName: 'Fedje' },
    { code: '5014', name: 'FRØYA', countyCode: '50', capitalizedName: 'Frøya' },
    { code: '3428', name: 'ALVDAL', countyCode: '34', capitalizedName: 'Alvdal' },
    { code: '5518', name: 'LAVANGEN', countyCode: '55', capitalizedName: 'Lavangen' },
    { code: '3110', name: 'HVALER', countyCode: '31', capitalizedName: 'Hvaler' },
    { code: '4223', name: 'VENNESLA', countyCode: '42', capitalizedName: 'Vennesla' },
    { code: '4624', name: 'BJØRNAFJORDEN', countyCode: '46', capitalizedName: 'Bjørnafjorden' },
    { code: '3112', name: 'RÅDE', countyCode: '31', capitalizedName: 'Råde' },
    { code: '5061', name: 'RINDAL', countyCode: '50', capitalizedName: 'Rindal' },
    { code: '3427', name: 'TYNSET', countyCode: '34', capitalizedName: 'Tynset' },
    { code: '3417', name: 'GRUE', countyCode: '34', capitalizedName: 'Grue' },
    { code: '1528', name: 'SYKKYLVEN', countyCode: '15', capitalizedName: 'Sykkylven' },
    { code: '1859', name: 'FLAKSTAD', countyCode: '18', capitalizedName: 'Flakstad' },
    { code: '5047', name: 'OVERHALLA', countyCode: '50', capitalizedName: 'Overhalla' },
    { code: '5028', name: 'MELHUS', countyCode: '50', capitalizedName: 'Melhus' },
    { code: '1840', name: 'SALTDAL', countyCode: '18', capitalizedName: 'Saltdal' },
    { code: '4645', name: 'ASKVOLL', countyCode: '46', capitalizedName: 'Askvoll' },
    { code: '3107', name: 'FREDRIKSTAD', countyCode: '31', capitalizedName: 'Fredrikstad' },
    { code: '3101', name: 'HALDEN', countyCode: '31', capitalizedName: 'Halden' },
    { code: '5607', name: 'VADSØ', countyCode: '56', capitalizedName: 'Vadsø' },
    { code: '1120', name: 'KLEPP', countyCode: '11', capitalizedName: 'Klepp' },
    { code: '4211', name: 'GJERSTAD', countyCode: '42', capitalizedName: 'Gjerstad' },
    { code: '3305', name: 'RINGERIKE', countyCode: '33', capitalizedName: 'Ringerike' },
    { code: '1806', name: 'NARVIK', countyCode: '18', capitalizedName: 'Narvik' },
    { code: '1516', name: 'ULSTEIN', countyCode: '15', capitalizedName: 'Ulstein' },
    { code: '4644', name: 'LUSTER', countyCode: '46', capitalizedName: 'Luster' },
    { code: '3330', name: 'HOL', countyCode: '33', capitalizedName: 'Hol' },
    { code: '1508', name: 'ÅLESUND', countyCode: '15', capitalizedName: 'Ålesund' },
    { code: '3414', name: 'NORD-ODAL', countyCode: '34', capitalizedName: 'Nord-Odal' },
    { code: '4203', name: 'ARENDAL', countyCode: '42', capitalizedName: 'Arendal' },
    { code: '1867', name: 'BØ (NORDLAND)', countyCode: '18', capitalizedName: 'Bø (Nordland)' },
    { code: '1866', name: 'HADSEL', countyCode: '18', capitalizedName: 'Hadsel' },
    { code: '1151', name: 'UTSIRA', countyCode: '11', capitalizedName: 'Utsira' },
    { code: '4628', name: 'VAKSDAL', countyCode: '46', capitalizedName: 'Vaksdal' },
    { code: '1822', name: 'LEIRFJORD', countyCode: '18', capitalizedName: 'Leirfjord' },
    { code: '1812', name: 'SØMNA', countyCode: '18', capitalizedName: 'Sømna' },
    { code: '5546', name: 'KVÆNANGEN', countyCode: '55', capitalizedName: 'Kvænangen' },
    { code: '1848', name: 'STEIGEN', countyCode: '18', capitalizedName: 'Steigen' },
    { code: '3242', name: 'HURDAL', countyCode: '32', capitalizedName: 'Hurdal' },
    { code: '1804', name: 'BODØ', countyCode: '18', capitalizedName: 'Bodø' },
    { code: '3236', name: 'JEVNAKER', countyCode: '32', capitalizedName: 'Jevnaker' },
    { code: '3448', name: 'NORDRE LAND', countyCode: '34', capitalizedName: 'Nordre Land' },
    { code: '3434', name: 'LOM', countyCode: '34', capitalizedName: 'Lom' },
    { code: '4636', name: 'SOLUND', countyCode: '46', capitalizedName: 'Solund' },
    { code: '5516', name: 'GRATANGEN', countyCode: '55', capitalizedName: 'Gratangen' },
    { code: '5634', name: 'VARDØ', countyCode: '56', capitalizedName: 'Vardø' },
    { code: '4627', name: 'ASKØY', countyCode: '46', capitalizedName: 'Askøy' },
    { code: '4620', name: 'ULVIK', countyCode: '46', capitalizedName: 'Ulvik' },
    { code: '4630', name: 'OSTERØY', countyCode: '46', capitalizedName: 'Osterøy' },
    { code: '1835', name: 'TRÆNA', countyCode: '18', capitalizedName: 'Træna' },
    { code: '4020', name: 'MIDT-TELEMARK', countyCode: '40', capitalizedName: 'Midt-Telemark' },
    { code: '1851', name: 'LØDINGEN', countyCode: '18', capitalizedName: 'Lødingen' },
    { code: '1838', name: 'GILDESKÅL', countyCode: '18', capitalizedName: 'Gildeskål' },
    { code: '3209', name: 'ULLENSAKER', countyCode: '32', capitalizedName: 'Ullensaker' },
    { code: '3430', name: 'OS (INNLANDET)', countyCode: '34', capitalizedName: 'Os (Innlandet)' },
    { code: '4615', name: 'FITJAR', countyCode: '46', capitalizedName: 'Fitjar' },
    { code: '5001', name: 'TRONDHEIM', countyCode: '50', capitalizedName: 'Trondheim' },
    { code: '5601', name: 'ALTA', countyCode: '56', capitalizedName: 'Alta' },
    { code: '4227', name: 'KVINESDAL', countyCode: '42', capitalizedName: 'Kvinesdal' },
    { code: '3425', name: 'ENGERDAL', countyCode: '34', capitalizedName: 'Engerdal' },
    { code: '3909', name: 'LARVIK', countyCode: '39', capitalizedName: 'Larvik' },
    { code: '4619', name: 'EIDFJORD', countyCode: '46', capitalizedName: 'Eidfjord' },
    { code: '1563', name: 'SUNNDAL', countyCode: '15', capitalizedName: 'Sunndal' },
    { code: '3433', name: 'SKJÅK', countyCode: '34', capitalizedName: 'Skjåk' },
    { code: '5054', name: 'INDRE FOSEN', countyCode: '50', capitalizedName: 'Indre Fosen' },
    { code: '4651', name: 'STRYN', countyCode: '46', capitalizedName: 'Stryn' },
    { code: '4030', name: 'NISSEDAL', countyCode: '40', capitalizedName: 'Nissedal' },
    { code: '1860', name: 'VESTVÅGØY', countyCode: '18', capitalizedName: 'Vestvågøy' },
    { code: '3318', name: 'KRØDSHERAD', countyCode: '33', capitalizedName: 'Krødsherad' },
    { code: '5603', name: 'HAMMERFEST', countyCode: '56', capitalizedName: 'Hammerfest' },
    { code: '3426', name: 'TOLGA', countyCode: '34', capitalizedName: 'Tolga' },
    { code: '1511', name: 'VANYLVEN', countyCode: '15', capitalizedName: 'Vanylven' },
    { code: '4629', name: 'MODALEN', countyCode: '46', capitalizedName: 'Modalen' },
    { code: '1149', name: 'KARMØY', countyCode: '11', capitalizedName: 'Karmøy' },
    { code: '1112', name: 'LUND', countyCode: '11', capitalizedName: 'Lund' },
    { code: '3911', name: 'FÆRDER', countyCode: '39', capitalizedName: 'Færder' },
    { code: '4631', name: 'ALVER', countyCode: '46', capitalizedName: 'Alver' },
    { code: '4643', name: 'ÅRDAL', countyCode: '46', capitalizedName: 'Årdal' },
    { code: '5031', name: 'MALVIK', countyCode: '50', capitalizedName: 'Malvik' },
    { code: '5057', name: 'ØRLAND', countyCode: '50', capitalizedName: 'Ørland' },
    { code: '3421', name: 'TRYSIL', countyCode: '34', capitalizedName: 'Trysil' },
    { code: '3424', name: 'RENDALEN', countyCode: '34', capitalizedName: 'Rendalen' },
    { code: '5033', name: 'TYDAL', countyCode: '50', capitalizedName: 'Tydal' },
    { code: '4214', name: 'FROLAND', countyCode: '42', capitalizedName: 'Froland' },
    { code: '5036', name: 'FROSTA', countyCode: '50', capitalizedName: 'Frosta' },
    { code: '1146', name: 'TYSVÆR', countyCode: '11', capitalizedName: 'Tysvær' },
    { code: '5042', name: 'LIERNE', countyCode: '50', capitalizedName: 'Lierne' },
    { code: '1816', name: 'VEVELSTAD', countyCode: '18', capitalizedName: 'Vevelstad' },
    { code: '1124', name: 'SOLA', countyCode: '11', capitalizedName: 'Sola' },
    { code: '4201', name: 'RISØR', countyCode: '42', capitalizedName: 'Risør' },
    { code: '1122', name: 'GJESDAL', countyCode: '11', capitalizedName: 'Gjesdal' },
    { code: '1103', name: 'STAVANGER', countyCode: '11', capitalizedName: 'Stavanger' },
    { code: '3203', name: 'ASKER', countyCode: '32', capitalizedName: 'Asker' },
    { code: '1547', name: 'AUKRA', countyCode: '15', capitalizedName: 'Aukra' },
    { code: '4650', name: 'GLOPPEN', countyCode: '46', capitalizedName: 'Gloppen' },
    { code: '3447', name: 'SØNDRE LAND', countyCode: '34', capitalizedName: 'Søndre Land' },
    { code: '5542', name: 'SKJERVØY', countyCode: '55', capitalizedName: 'Skjervøy' },
    { code: '3214', name: 'FROGN', countyCode: '32', capitalizedName: 'Frogn' },
    { code: '1106', name: 'HAUGESUND', countyCode: '11', capitalizedName: 'Haugesund' },
    { code: '4018', name: 'NOME', countyCode: '40', capitalizedName: 'Nome' },
    {
        code: '3419',
        name: 'VÅLER (INNLANDET)',
        countyCode: '34',
        capitalizedName: 'Våler (Innlandet)',
    },
    { code: '1554', name: 'AVERØY', countyCode: '15', capitalizedName: 'Averøy' },
    {
        code: '5612',
        name: 'GUOVDAGEAIDNU KAUTOKEINO',
        countyCode: '56',
        capitalizedName: 'Guovdageaidnu Kautokeino',
    },
    { code: '4218', name: 'IVELAND', countyCode: '42', capitalizedName: 'Iveland' },
    { code: '4224', name: 'ÅSERAL', countyCode: '42', capitalizedName: 'Åseral' },
    { code: '5029', name: 'SKAUN', countyCode: '50', capitalizedName: 'Skaun' },
    { code: '3122', name: 'MARKER', countyCode: '31', capitalizedName: 'Marker' },
    { code: '3407', name: 'GJØVIK', countyCode: '34', capitalizedName: 'Gjøvik' },
    { code: '3124', name: 'AREMARK', countyCode: '31', capitalizedName: 'Aremark' },
    { code: '3411', name: 'RINGSAKER', countyCode: '34', capitalizedName: 'Ringsaker' },
    { code: '1566', name: 'SURNADAL', countyCode: '15', capitalizedName: 'Surnadal' },
    { code: '1579', name: 'HUSTADVIKA', countyCode: '15', capitalizedName: 'Hustadvika' },
    { code: '1837', name: 'MELØY', countyCode: '18', capitalizedName: 'Meløy' },
    { code: '3322', name: 'NESBYEN', countyCode: '33', capitalizedName: 'Nesbyen' },
    { code: '5520', name: 'BARDU', countyCode: '55', capitalizedName: 'Bardu' },
    { code: '1505', name: 'KRISTIANSUND', countyCode: '15', capitalizedName: 'Kristiansund' },
    { code: '5055', name: 'HEIM', countyCode: '50', capitalizedName: 'Heim' },
    { code: '3201', name: 'BÆRUM', countyCode: '32', capitalizedName: 'Bærum' },
    { code: '5022', name: 'RENNEBU', countyCode: '50', capitalizedName: 'Rennebu' },
    { code: '5616', name: 'HASVIK', countyCode: '56', capitalizedName: 'Hasvik' },
    { code: '4639', name: 'VIK', countyCode: '46', capitalizedName: 'Vik' },
    { code: '5618', name: 'MÅSØY', countyCode: '56', capitalizedName: 'Måsøy' },
    { code: '1815', name: 'VEGA', countyCode: '18', capitalizedName: 'Vega' },
    { code: '1114', name: 'BJERKREIM', countyCode: '11', capitalizedName: 'Bjerkreim' },
    { code: '4634', name: 'MASFJORDEN', countyCode: '46', capitalizedName: 'Masfjorden' },
    { code: '3332', name: 'SIGDAL', countyCode: '33', capitalizedName: 'Sigdal' },
    { code: '1826', name: 'HATTFJELLDAL', countyCode: '18', capitalizedName: 'Hattfjelldal' },
    { code: '5624', name: 'LEBESBY', countyCode: '56', capitalizedName: 'Lebesby' },
    { code: '1127', name: 'RANDABERG', countyCode: '11', capitalizedName: 'Randaberg' },
    { code: '3116', name: 'SKIPTVET', countyCode: '31', capitalizedName: 'Skiptvet' },
    { code: '1144', name: 'KVITSØY', countyCode: '11', capitalizedName: 'Kvitsøy' },
    { code: '4617', name: 'KVINNHERAD', countyCode: '46', capitalizedName: 'Kvinnherad' },
    { code: '3232', name: 'NITTEDAL', countyCode: '32', capitalizedName: 'Nittedal' },
    { code: '4032', name: 'FYRESDAL', countyCode: '40', capitalizedName: 'Fyresdal' },
    { code: '5056', name: 'HITRA', countyCode: '50', capitalizedName: 'Hitra' },
    { code: '3216', name: 'VESTBY', countyCode: '32', capitalizedName: 'Vestby' },
    { code: '4602', name: 'KINN', countyCode: '46', capitalizedName: 'Kinn' },
    { code: '5614', name: 'LOPPA', countyCode: '56', capitalizedName: 'Loppa' },
    { code: '3405', name: 'LILLEHAMMER', countyCode: '34', capitalizedName: 'Lillehammer' },
    { code: '3432', name: 'LESJA', countyCode: '34', capitalizedName: 'Lesja' },
    { code: '1820', name: 'ALSTAHAUG', countyCode: '18', capitalizedName: 'Alstahaug' },
    { code: '1836', name: 'RØDØY', countyCode: '18', capitalizedName: 'Rødøy' },
    { code: '3422', name: 'ÅMOT', countyCode: '34', capitalizedName: 'Åmot' },
    { code: '3413', name: 'STANGE', countyCode: '34', capitalizedName: 'Stange' },
    { code: '4647', name: 'SUNNFJORD', countyCode: '46', capitalizedName: 'Sunnfjord' },
    { code: '5514', name: 'IBESTAD', countyCode: '55', capitalizedName: 'Ibestad' },
    { code: '4003', name: 'SKIEN', countyCode: '40', capitalizedName: 'Skien' },
    { code: '5544', name: 'NORDREISA', countyCode: '55', capitalizedName: 'Nordreisa' },
    { code: '3438', name: 'SØR-FRON', countyCode: '34', capitalizedName: 'Sør-Fron' },
    { code: '1875', name: 'HAMARØY', countyCode: '18', capitalizedName: 'Hamarøy' },
    { code: '1811', name: 'BINDAL', countyCode: '18', capitalizedName: 'Bindal' },
    { code: '3441', name: 'GAUSDAL', countyCode: '34', capitalizedName: 'Gausdal' },
    { code: '4638', name: 'HØYANGER', countyCode: '46', capitalizedName: 'Høyanger' },
    { code: '3446', name: 'GRAN', countyCode: '34', capitalizedName: 'Gran' },
    { code: '3418', name: 'ÅSNES', countyCode: '34', capitalizedName: 'Åsnes' },
    {
        code: '5636',
        name: 'UNJARGGA NESSEBY',
        countyCode: '56',
        capitalizedName: 'Unjargga Nesseby',
    },
    { code: '5503', name: 'HARSTAD', countyCode: '55', capitalizedName: 'Harstad' },
    { code: '3401', name: 'KONGSVINGER', countyCode: '34', capitalizedName: 'Kongsvinger' },
    { code: '3328', name: 'ÅL', countyCode: '33', capitalizedName: 'Ål' },
    { code: '3220', name: 'ENEBAKK', countyCode: '32', capitalizedName: 'Enebakk' },
    { code: '3439', name: 'RINGEBU', countyCode: '34', capitalizedName: 'Ringebu' },
    { code: '4014', name: 'KRAGERØ', countyCode: '40', capitalizedName: 'Kragerø' },
    { code: '3310', name: 'HOLE', countyCode: '33', capitalizedName: 'Hole' },
    { code: '3326', name: 'HEMSEDAL', countyCode: '33', capitalizedName: 'Hemsedal' },
    { code: '1841', name: 'FAUSKE', countyCode: '18', capitalizedName: 'Fauske' },
    { code: '4613', name: 'BØMLO', countyCode: '46', capitalizedName: 'Bømlo' },
    { code: '5534', name: 'KARLSØY', countyCode: '55', capitalizedName: 'Karlsøy' },
    { code: '4228', name: 'SIRDAL', countyCode: '42', capitalizedName: 'Sirdal' },
    {
        code: '5610',
        name: 'KARASJOHKA KARASJOK',
        countyCode: '56',
        capitalizedName: 'Karasjohka Karasjok',
    },
    { code: '5044', name: 'NAMSSKOGAN', countyCode: '50', capitalizedName: 'Namsskogan' },
    { code: '1560', name: 'TINGVOLL', countyCode: '15', capitalizedName: 'Tingvoll' },
    { code: '1573', name: 'SMØLA', countyCode: '15', capitalizedName: 'Smøla' },
    { code: '3440', name: 'ØYER', countyCode: '34', capitalizedName: 'Øyer' },
    { code: '1874', name: 'MOSKENES', countyCode: '18', capitalizedName: 'Moskenes' },
    { code: '3423', name: 'STOR-ELVDAL', countyCode: '34', capitalizedName: 'Stor-Elvdal' },
    { code: '5605', name: 'SØR-VARANGER', countyCode: '56', capitalizedName: 'Sør-Varanger' },
    { code: '4220', name: 'BYGLAND', countyCode: '42', capitalizedName: 'Bygland' },
    { code: '1539', name: 'RAUMA', countyCode: '15', capitalizedName: 'Rauma' },
    { code: '3437', name: 'SEL', countyCode: '34', capitalizedName: 'Sel' },
    { code: '4204', name: 'KRISTIANSAND', countyCode: '42', capitalizedName: 'Kristiansand' },
    { code: '1121', name: 'TIME', countyCode: '11', capitalizedName: 'Time' },
    { code: '1834', name: 'LURØY', countyCode: '18', capitalizedName: 'Lurøy' },
    { code: '3442', name: 'ØSTRE TOTEN', countyCode: '34', capitalizedName: 'Østre Toten' },
    { code: '1577', name: 'VOLDA', countyCode: '15', capitalizedName: 'Volda' },
    { code: '5501', name: 'TROMSØ', countyCode: '55', capitalizedName: 'Tromsø' },
    { code: '4637', name: 'HYLLESTAD', countyCode: '46', capitalizedName: 'Hyllestad' },
    { code: '3431', name: 'DOVRE', countyCode: '34', capitalizedName: 'Dovre' },
    { code: '5037', name: 'LEVANGER', countyCode: '50', capitalizedName: 'Levanger' },
    { code: '1833', name: 'RANA', countyCode: '18', capitalizedName: 'Rana' },
    { code: '3218', name: 'ÅS', countyCode: '32', capitalizedName: 'Ås' },
    { code: '1578', name: 'FJORD', countyCode: '15', capitalizedName: 'Fjord' },
    { code: '5532', name: 'BALSFJORD', countyCode: '55', capitalizedName: 'Balsfjord' },
    {
        code: '1515',
        name: 'HERØY (MØRE OG ROMSDAL)',
        countyCode: '15',
        capitalizedName: 'Herøy (Møre og Romsdal)',
    },
    { code: '1857', name: 'VÆRØY', countyCode: '18', capitalizedName: 'Værøy' },
    { code: '4012', name: 'BAMBLE', countyCode: '40', capitalizedName: 'Bamble' },
    {
        code: '5622',
        name: 'PORSANGER PORSÁNGU PORSANKI',
        countyCode: '56',
        capitalizedName: 'Porsanger Porsángu Porsanki',
    },
    { code: '3303', name: 'KONGSBERG', countyCode: '33', capitalizedName: 'Kongsberg' },
    { code: '4635', name: 'GULEN', countyCode: '46', capitalizedName: 'Gulen' },
    { code: '3224', name: 'RÆLINGEN', countyCode: '32', capitalizedName: 'Rælingen' },
    { code: '1531', name: 'SULA', countyCode: '15', capitalizedName: 'Sula' },
    { code: '3324', name: 'GOL', countyCode: '33', capitalizedName: 'Gol' },
    { code: '5522', name: 'SALANGEN', countyCode: '55', capitalizedName: 'Salangen' },
    { code: '5632', name: 'BÅTSFJORD', countyCode: '56', capitalizedName: 'Båtsfjord' },
    { code: '3415', name: 'SØR-ODAL', countyCode: '34', capitalizedName: 'Sør-Odal' },
    { code: '3228', name: 'NES (AKERSHUS)', countyCode: '32', capitalizedName: 'Nes (Akershus)' },
    { code: '4001', name: 'PORSGRUNN', countyCode: '40', capitalizedName: 'Porsgrunn' },
    { code: '4222', name: 'BYKLE', countyCode: '42', capitalizedName: 'Bykle' },
    { code: '1520', name: 'ØRSTA', countyCode: '15', capitalizedName: 'Ørsta' },
    { code: '4206', name: 'FARSUND', countyCode: '42', capitalizedName: 'Farsund' },
    { code: '4212', name: 'VEGÅRSHEI', countyCode: '42', capitalizedName: 'Vegårshei' },
    { code: '5053', name: 'INDERØY', countyCode: '50', capitalizedName: 'Inderøy' },
    { code: '4640', name: 'SOGNDAL', countyCode: '46', capitalizedName: 'Sogndal' },
    { code: '5038', name: 'VERDAL', countyCode: '50', capitalizedName: 'Verdal' },
    { code: '3450', name: 'ETNEDAL', countyCode: '34', capitalizedName: 'Etnedal' },
    { code: '5021', name: 'OPPDAL', countyCode: '50', capitalizedName: 'Oppdal' },
    { code: '1813', name: 'BRØNNØY', countyCode: '18', capitalizedName: 'Brønnøy' },
    { code: '3451', name: 'NORD-AURDAL', countyCode: '34', capitalizedName: 'Nord-Aurdal' },
    { code: '3403', name: 'HAMAR', countyCode: '34', capitalizedName: 'Hamar' },
    { code: '1119', name: 'HÅ', countyCode: '11', capitalizedName: 'Hå' },
    { code: '3312', name: 'LIER', countyCode: '33', capitalizedName: 'Lier' },
    { code: '4649', name: 'STAD', countyCode: '46', capitalizedName: 'Stad' },
    { code: '3222', name: 'LØRENSKOG', countyCode: '32', capitalizedName: 'Lørenskog' },
    { code: '3320', name: 'FLÅ', countyCode: '33', capitalizedName: 'Flå' },
    { code: '1160', name: 'VINDAFJORD', countyCode: '11', capitalizedName: 'Vindafjord' },
    { code: '3412', name: 'LØTEN', countyCode: '34', capitalizedName: 'Løten' },
    { code: '4612', name: 'SVEIO', countyCode: '46', capitalizedName: 'Sveio' },
    { code: '4028', name: 'KVITESEID', countyCode: '40', capitalizedName: 'Kviteseid' },
    { code: '5512', name: 'TJELDSUND', countyCode: '55', capitalizedName: 'Tjeldsund' },
    { code: '2211', name: 'JAN MAYEN', countyCode: '22', capitalizedName: 'Jan Mayen' },
    { code: '1557', name: 'GJEMNES', countyCode: '15', capitalizedName: 'Gjemnes' },
    { code: '4614', name: 'STORD', countyCode: '46', capitalizedName: 'Stord' },
    { code: '1111', name: 'SOKNDAL', countyCode: '11', capitalizedName: 'Sokndal' },
    { code: '3212', name: 'NESODDEN', countyCode: '32', capitalizedName: 'Nesodden' },
    { code: '5046', name: 'HØYLANDET', countyCode: '50', capitalizedName: 'Høylandet' },
    { code: '1134', name: 'SULDAL', countyCode: '11', capitalizedName: 'Suldal' },
    { code: '5538', name: 'STORFJORD', countyCode: '55', capitalizedName: 'Storfjord' },
    { code: '1145', name: 'BOKN', countyCode: '11', capitalizedName: 'Bokn' },
    { code: '3205', name: 'LILLESTRØM', countyCode: '32', capitalizedName: 'Lillestrøm' },
    { code: '1525', name: 'STRANDA', countyCode: '15', capitalizedName: 'Stranda' },
    { code: '4022', name: 'SELJORD', countyCode: '40', capitalizedName: 'Seljord' },
    { code: '3234', name: 'LUNNER', countyCode: '32', capitalizedName: 'Lunner' },
    { code: '1868', name: 'ØKSNES', countyCode: '18', capitalizedName: 'Øksnes' },
    { code: '3449', name: 'SØR-AURDAL', countyCode: '34', capitalizedName: 'Sør-Aurdal' },
    { code: '5530', name: 'SENJA', countyCode: '55', capitalizedName: 'Senja' },
    { code: '1865', name: 'VÅGAN', countyCode: '18', capitalizedName: 'Vågan' },
    {
        code: '5540',
        name: 'GÁIVUOTNA KÅFJORD',
        countyCode: '55',
        capitalizedName: 'Gáivuotna Kåfjord',
    },
    { code: '4621', name: 'VOSS', countyCode: '46', capitalizedName: 'Voss' },
    { code: '5032', name: 'SELBU', countyCode: '50', capitalizedName: 'Selbu' },
    { code: '3338', name: 'NORE OG UVDAL', countyCode: '33', capitalizedName: 'Nore og Uvdal' },
    { code: '1580', name: 'HARAM', countyCode: '15', capitalizedName: 'Haram' },
    { code: '5524', name: 'MÅLSELV', countyCode: '55', capitalizedName: 'Målselv' },
    { code: '1827', name: 'DØNNA', countyCode: '18', capitalizedName: 'Dønna' },
    { code: '5526', name: 'SØRREISA', countyCode: '55', capitalizedName: 'Sørreisa' },
    { code: '3238', name: 'NANNESTAD', countyCode: '32', capitalizedName: 'Nannestad' },
    { code: '4625', name: 'AUSTEVOLL', countyCode: '46', capitalizedName: 'Austevoll' },
    { code: '4016', name: 'DRANGEDAL', countyCode: '40', capitalizedName: 'Drangedal' },
    { code: '1576', name: 'AURE', countyCode: '15', capitalizedName: 'Aure' },
    { code: '5628', name: 'DEATNU TANA', countyCode: '56', capitalizedName: 'Deatnu Tana' },
    { code: '5620', name: 'NORDKAPP', countyCode: '56', capitalizedName: 'Nordkapp' },
    { code: '5045', name: 'GRONG', countyCode: '50', capitalizedName: 'Grong' },
    { code: '5020', name: 'OSEN', countyCode: '50', capitalizedName: 'Osen' },
    { code: '1135', name: 'SAUDA', countyCode: '11', capitalizedName: 'Sauda' },
    { code: '3435', name: 'VÅGÅ', countyCode: '34', capitalizedName: 'Vågå' },
    { code: '5049', name: 'FLATANGER', countyCode: '50', capitalizedName: 'Flatanger' },
    { code: '5025', name: 'RØROS', countyCode: '50', capitalizedName: 'Røros' },
    { code: '1870', name: 'SORTLAND', countyCode: '18', capitalizedName: 'Sortland' },
    { code: '5043', name: 'RØYRVIK', countyCode: '50', capitalizedName: 'Røyrvik' },
    { code: '4205', name: 'LINDESNES', countyCode: '42', capitalizedName: 'Lindesnes' },
    { code: '0301', name: 'OSLO', countyCode: '03', capitalizedName: 'Oslo' },
    { code: '4632', name: 'AUSTRHEIM', countyCode: '46', capitalizedName: 'Austrheim' },
    { code: '4226', name: 'HÆGEBOSTAD', countyCode: '42', capitalizedName: 'Hægebostad' },
    { code: '3103', name: 'MOSS', countyCode: '31', capitalizedName: 'Moss' },
    { code: '4217', name: 'ÅMLI', countyCode: '42', capitalizedName: 'Åmli' },
    { code: '3334', name: 'FLESBERG', countyCode: '33', capitalizedName: 'Flesberg' },
    { code: '4622', name: 'KVAM', countyCode: '46', capitalizedName: 'Kvam' },
    { code: '5007', name: 'NAMSOS', countyCode: '50', capitalizedName: 'Namsos' },
    { code: '3314', name: 'ØVRE EIKER', countyCode: '33', capitalizedName: 'Øvre Eiker' },
    { code: '4221', name: 'VALLE', countyCode: '42', capitalizedName: 'Valle' },
    { code: '3336', name: 'ROLLAG', countyCode: '33', capitalizedName: 'Rollag' },
    { code: '4616', name: 'TYSNES', countyCode: '46', capitalizedName: 'Tysnes' },
    { code: '4611', name: 'ETNE', countyCode: '46', capitalizedName: 'Etne' },
    {
        code: '1514',
        name: 'SANDE (MØRE OG ROMSDAL)',
        countyCode: '15',
        capitalizedName: 'Sande (Møre og Romsdal)',
    },
    { code: '4618', name: 'ULLENSVANG', countyCode: '46', capitalizedName: 'Ullensvang' },
    { code: '1856', name: 'RØST', countyCode: '18', capitalizedName: 'Røst' },
    { code: '5060', name: 'NÆRØYSUND', countyCode: '50', capitalizedName: 'Nærøysund' },
    { code: '1871', name: 'ANDØY', countyCode: '18', capitalizedName: 'Andøy' },
    { code: '3316', name: 'MODUM', countyCode: '33', capitalizedName: 'Modum' },
    { code: '1825', name: 'GRANE', countyCode: '18', capitalizedName: 'Grane' },
    { code: '4642', name: 'LÆRDAL', countyCode: '46', capitalizedName: 'Lærdal' },
    { code: '3454', name: 'VANG', countyCode: '34', capitalizedName: 'Vang' },
    { code: '3226', name: 'AURSKOG-HØLAND', countyCode: '32', capitalizedName: 'Aurskog-Høland' },
    { code: '5035', name: 'STJØRDAL', countyCode: '50', capitalizedName: 'Stjørdal' },
    { code: '4207', name: 'FLEKKEFJORD', countyCode: '42', capitalizedName: 'Flekkefjord' },
    { code: '3240', name: 'EIDSVOLL', countyCode: '32', capitalizedName: 'Eidsvoll' },
    { code: '1133', name: 'HJELMELAND', countyCode: '11', capitalizedName: 'Hjelmeland' },
    { code: '5510', name: 'KVÆFJORD', countyCode: '55', capitalizedName: 'Kvæfjord' },
    { code: '4641', name: 'AURLAND', countyCode: '46', capitalizedName: 'Aurland' },
    { code: '4034', name: 'TOKKE', countyCode: '40', capitalizedName: 'Tokke' },
    { code: '5041', name: 'SNÅSA', countyCode: '50', capitalizedName: 'Snåsa' },
    { code: '3453', name: 'ØYSTRE SLIDRE', countyCode: '34', capitalizedName: 'Øystre Slidre' },
    { code: '4010', name: 'SILJAN', countyCode: '40', capitalizedName: 'Siljan' },
    { code: '3114', name: 'VÅLER (VIKEN)', countyCode: '31', capitalizedName: 'Våler (Viken)' },
    { code: '5027', name: 'MIDTRE GAULDAL', countyCode: '50', capitalizedName: 'Midtre Gauldal' },
    { code: '1535', name: 'VESTNES', countyCode: '15', capitalizedName: 'Vestnes' },
    { code: '1532', name: 'GISKE', countyCode: '15', capitalizedName: 'Giske' },
    { code: '1853', name: 'EVENES', countyCode: '18', capitalizedName: 'Evenes' },
    { code: '5626', name: 'GAMVIK', countyCode: '56', capitalizedName: 'Gamvik' },
    { code: '3907', name: 'SANDEFJORD', countyCode: '39', capitalizedName: 'Sandefjord' },
    { code: '4202', name: 'GRIMSTAD', countyCode: '42', capitalizedName: 'Grimstad' },
    { code: '1845', name: 'SØRFOLD', countyCode: '18', capitalizedName: 'Sørfold' },
    { code: '2100', name: 'SVALBARD', countyCode: '21', capitalizedName: 'Svalbard' },
    { code: '3118', name: 'INDRE ØSTFOLD', countyCode: '31', capitalizedName: 'Indre Østfold' },
    { code: '5630', name: 'BERLEVÅG', countyCode: '56', capitalizedName: 'Berlevåg' },
    { code: '5034', name: 'MERÅKER', countyCode: '50', capitalizedName: 'Meråker' },
    { code: '4225', name: 'LYNGDAL', countyCode: '42', capitalizedName: 'Lyngdal' },
    { code: '3207', name: 'NORDRE FOLLO', countyCode: '32', capitalizedName: 'Nordre Follo' },
    { code: '4626', name: 'ØYGARDEN', countyCode: '46', capitalizedName: 'Øygarden' },
    { code: '4623', name: 'SAMNANGER', countyCode: '46', capitalizedName: 'Samnanger' },
    { code: '5528', name: 'DYRØY', countyCode: '55', capitalizedName: 'Dyrøy' },
    { code: '4219', name: 'EVJE OG HORNNES', countyCode: '42', capitalizedName: 'Evje og Hornnes' },
    { code: '1108', name: 'SANDNES', countyCode: '11', capitalizedName: 'Sandnes' },
    { code: '3420', name: 'ELVERUM', countyCode: '34', capitalizedName: 'Elverum' },
    { code: '5006', name: 'STEINKJER', countyCode: '50', capitalizedName: 'Steinkjer' },
    { code: '1130', name: 'STRAND', countyCode: '11', capitalizedName: 'Strand' },
    { code: '1828', name: 'NESNA', countyCode: '18', capitalizedName: 'Nesna' },
    { code: '1517', name: 'HAREID', countyCode: '15', capitalizedName: 'Hareid' },
    { code: '1101', name: 'EIGERSUND', countyCode: '11', capitalizedName: 'Eigersund' },
    { code: '3903', name: 'HOLMESTRAND', countyCode: '39', capitalizedName: 'Holmestrand' },
    { code: '1832', name: 'HEMNES', countyCode: '18', capitalizedName: 'Hemnes' },
    { code: '3416', name: 'EIDSKOG', countyCode: '34', capitalizedName: 'Eidskog' },
    { code: '3120', name: 'RAKKESTAD', countyCode: '31', capitalizedName: 'Rakkestad' },
    { code: '1824', name: 'VEFSN', countyCode: '18', capitalizedName: 'Vefsn' },
    { code: '3429', name: 'FOLLDAL', countyCode: '34', capitalizedName: 'Folldal' },
    { code: '3436', name: 'NORD-FRON', countyCode: '34', capitalizedName: 'Nord-Fron' },
    { code: '4036', name: 'VINJE', countyCode: '40', capitalizedName: 'Vinje' },
    { code: '5059', name: 'ORKLAND', countyCode: '50', capitalizedName: 'Orkland' },
    { code: '3901', name: 'HORTEN', countyCode: '39', capitalizedName: 'Horten' },
    { code: '4026', name: 'TINN', countyCode: '40', capitalizedName: 'Tinn' },
    { code: '5026', name: 'HOLTÅLEN', countyCode: '50', capitalizedName: 'Holtålen' },
    { code: '3443', name: 'VESTRE TOTEN', countyCode: '34', capitalizedName: 'Vestre Toten' },
    { code: '4005', name: 'NOTODDEN', countyCode: '40', capitalizedName: 'Notodden' },
    { code: '3905', name: 'TØNSBERG', countyCode: '39', capitalizedName: 'Tønsberg' },
    { code: '1506', name: 'MOLDE', countyCode: '15', capitalizedName: 'Molde' },
    { code: '1839', name: 'BEIARN', countyCode: '18', capitalizedName: 'Beiarn' },
    { code: '3105', name: 'SARPSBORG', countyCode: '31', capitalizedName: 'Sarpsborg' },
    { code: '5058', name: 'ÅFJORD', countyCode: '50', capitalizedName: 'Åfjord' },
    { code: '5536', name: 'LYNGEN', countyCode: '55', capitalizedName: 'Lyngen' },
    { code: '3230', name: 'GJERDRUM', countyCode: '32', capitalizedName: 'Gjerdrum' },
    { code: '4601', name: 'BERGEN', countyCode: '46', capitalizedName: 'Bergen' },
    { code: '4024', name: 'HJARTDAL', countyCode: '40', capitalizedName: 'Hjartdal' },
    { code: '4215', name: 'LILLESAND', countyCode: '42', capitalizedName: 'Lillesand' },
    { code: '5052', name: 'LEKA', countyCode: '50', capitalizedName: 'Leka' },
];

export const fylkeMock: FylkeDTO[] = [
    { code: '03', name: 'OSLO', capitalizedName: 'Oslo' },
    { code: '23', name: 'KONTINENTALSOKKELEN', capitalizedName: 'Kontinentalsokkelen' },
    { code: '46', name: 'VESTLAND', capitalizedName: 'Vestland' },
    { code: '32', name: 'AKERSHUS', capitalizedName: 'Akershus' },
    { code: '33', name: 'BUSKERUD', capitalizedName: 'Buskerud' },
    { code: '34', name: 'INNLANDET', capitalizedName: 'Innlandet' },
    { code: '15', name: 'MØRE OG ROMSDAL', capitalizedName: 'Møre og Romsdal' },
    { code: '40', name: 'TELEMARK', capitalizedName: 'Telemark' },
    { code: '11', name: 'ROGALAND', capitalizedName: 'Rogaland' },
    { code: '18', name: 'NORDLAND', capitalizedName: 'Nordland' },
    { code: '21', name: 'SVALBARD', capitalizedName: 'Svalbard' },
    { code: '50', name: 'TRØNDELAG', capitalizedName: 'Trøndelag' },
    { code: '56', name: 'FINNMARK', capitalizedName: 'Finnmark' },
    { code: '22', name: 'JAN MAYEN', capitalizedName: 'Jan Mayen' },
    { code: '31', name: 'ØSTFOLD', capitalizedName: 'Østfold' },
    { code: '42', name: 'AGDER', capitalizedName: 'Agder' },
    { code: '39', name: 'VESTFOLD', capitalizedName: 'Vestfold' },
    { code: '55', name: 'TROMS', capitalizedName: 'Troms' },
];

export const landMock: HentLandlisteDTO = [
    { name: 'AFGHANISTAN', code: 'AF', capitalizedName: 'Afghanistan' },
    { name: 'ALBANIA', code: 'AL', capitalizedName: 'Albania' },
    { name: 'ALGERIE', code: 'DZ', capitalizedName: 'Algerie' },
    { name: 'AMERIKANSK SAMOA', code: 'AS', capitalizedName: 'Amerikansk Samoa' },
    { name: 'ANDORRA', code: 'AD', capitalizedName: 'Andorra' },
    { name: 'ANGOLA', code: 'AO', capitalizedName: 'Angola' },
    { name: 'ANGUILLA', code: 'AI', capitalizedName: 'Anguilla' },
    { name: 'ANTARKTIKA', code: 'AQ', capitalizedName: 'Antarktika' },
    { name: 'ANTIGUA OG BARBUDA', code: 'AG', capitalizedName: 'Antigua og Barbuda' },
    { name: 'ARGENTINA', code: 'AR', capitalizedName: 'Argentina' },
    { name: 'ARMENIA', code: 'AM', capitalizedName: 'Armenia' },
    { name: 'ARUBA', code: 'AW', capitalizedName: 'Aruba' },
    { name: 'ASERBAJDSJAN', code: 'AZ', capitalizedName: 'Aserbajdsjan' },
    { name: 'AUSTRALIA', code: 'AU', capitalizedName: 'Australia' },
    { name: 'BAHAMAS', code: 'BS', capitalizedName: 'Bahamas' },
    { name: 'BAHRAIN', code: 'BH', capitalizedName: 'Bahrain' },
    { name: 'BANGLADESH', code: 'BD', capitalizedName: 'Bangladesh' },
    { name: 'BARBADOS', code: 'BB', capitalizedName: 'Barbados' },
    { name: 'BELGIA', code: 'BE', capitalizedName: 'Belgia' },
    { name: 'BELIZE', code: 'BZ', capitalizedName: 'Belize' },
    { name: 'BENIN', code: 'BJ', capitalizedName: 'Benin' },
    { name: 'BERMUDA', code: 'BM', capitalizedName: 'Bermuda' },
    { name: 'BHUTAN', code: 'BT', capitalizedName: 'Bhutan' },
    { name: 'BOLIVIA', code: 'BO', capitalizedName: 'Bolivia' },
    { name: 'BOSNIA-HERCEGOVINA', code: 'BA', capitalizedName: 'Bosnia-Hercegovina' },
    { name: 'BOTSWANA', code: 'BW', capitalizedName: 'Botswana' },
    { name: 'BOUVETØYA', code: 'BV', capitalizedName: 'Bouvetøya' },
    { name: 'BRASIL', code: 'BR', capitalizedName: 'Brasil' },
    { name: 'BRUNEI', code: 'BN', capitalizedName: 'Brunei' },
    { name: 'BULGARIA', code: 'BG', capitalizedName: 'Bulgaria' },
    { name: 'BURKINA FASO', code: 'BF', capitalizedName: 'Burkina Faso' },
    { name: 'BURUNDI', code: 'BI', capitalizedName: 'Burundi' },
    { name: 'CANADA', code: 'CA', capitalizedName: 'Canada' },
    { name: 'CAYMANØYENE', code: 'KY', capitalizedName: 'Caymanøyene' },
    { name: 'CHILE', code: 'CL', capitalizedName: 'Chile' },
    { name: 'CHRISTMASØYA', code: 'CX', capitalizedName: 'Christmasøya' },
    { name: 'COLOMBIA', code: 'CO', capitalizedName: 'Colombia' },
    { name: 'COOKØYENE', code: 'CK', capitalizedName: 'Cookøyene' },
    { name: 'COSTA RICA', code: 'CR', capitalizedName: 'Costa Rica' },
];
