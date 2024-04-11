import { sendEvent } from 'felles/amplitude';
import { Jobbønske } from 'felles/domene/kandidat/Jobbprofil';
import { useEffect, useState } from 'react';
import {
    KandidatStillingssøkDTO,
    useKandidatStillingssøk,
    GeografiØnske,
} from '../../../api/kandidat-søk-api/kandidatStillingssøk';
import { Status } from '../filter/om-annonsen/Annonsestatus';
import { Publisert } from '../filter/om-annonsen/HvorErAnnonsenPublisert';
import useNavigering from '../useNavigering';
import { QueryParam } from '../utils/urlUtils';
import { getNummerFraSted, stedmappingFraGammeltNummer } from 'felles/mappingSted2';

interface IuseKandidatStillingssøk {
    kandidatnr: string;
}

interface IUseKandidatStillingssøkRetur {
    kandidatStillingssøk: KandidatStillingssøkDTO | null;
    hentetGeografiFraBosted: boolean;
    manglerØnsketYrke: boolean;
    isLoading: boolean;
    error: any;
}

export const useKandidatStillingssøkData = ({
    kandidatnr,
}: IuseKandidatStillingssøk): IUseKandidatStillingssøkRetur => {
    const { searchParams, navigate } = useNavigering();
    const [hentetGeografiFraBosted, setHentetGeografiFraBosted] = useState<boolean>(false);
    const [manglerØnsketYrke, setManglerØnsketYrke] = useState<boolean>(false);

    const swrHook = useKandidatStillingssøk({ kandidatnr });

    const kandidatStillingssøk = swrHook.data;
    useEffect(() => {
        if (kandidatStillingssøk) {
            const { geografiJobbonsker, yrkeJobbonskerObj, kommunenummerstring } =
                kandidatStillingssøk;

            setHentetGeografiFraBosted(geografiJobbonsker.length === 0);

            const geografikoder =
                geografiJobbonsker.length === 0
                    ? [kommunenummerstring]
                    : geografiJobbonsker.map((g: GeografiØnske) =>
                          getNummerFraSted(g.geografiKode)
                      );

            const konverterteGeografikoder = konverterStederTil2024koder(geografikoder);

            const fylker: (string | undefined)[] =
                hentFylkerFraJobbønsker(konverterteGeografikoder);
            const kommuner = hentKommunerFraJobbønsker(konverterteGeografikoder);
            const yrkesønsker = hentYrkerFraJobbønsker(yrkeJobbonskerObj);

            setManglerØnsketYrke(yrkesønsker.length === 0);

            if (searchParams.get(QueryParam.BrukKriterierFraKandidat) === 'true') {
                const søk = new URLSearchParams();

                if (fylker.length > 0) søk.set(QueryParam.Fylker, fylker.join(','));
                if (kommuner.length > 0) søk.set(QueryParam.Kommuner, kommuner.join(','));
                if (yrkesønsker.length > 0) søk.set(QueryParam.Tekst, yrkesønsker.join(','));

                søk.set(QueryParam.Statuser, Status.Publisert);
                søk.set(QueryParam.Publisert, Publisert.Intern);

                sendEvent('stillingssøk', 'kontekst_av_kandidat', {
                    antallFylker: fylker.length,
                    antallKommuner: kommuner.length,
                    antallYrkesønsker: yrkesønsker.length,
                });

                navigate({ search: søk.toString() }, { replace: true });
            }
        }
    }, [kandidatnr, navigate, searchParams, swrHook, kandidatStillingssøk]);

    return { ...swrHook, hentetGeografiFraBosted, manglerØnsketYrke, kandidatStillingssøk };
};

const hentFylkerFraJobbønsker = (geografijobbønskenummer: string[]): string[] => {
    return Array.from(
        new Set(
            geografijobbønskenummer
                .filter((n) => n.length === 2 || n.length === 4)
                .map((n) => (n.length === 4 ? n.substring(0, 2) : n))
        )
    );
};

const hentKommunerFraJobbønsker = (geografijobbønskenummer: string[]): string[] => {
    return geografijobbønskenummer.filter((n) => n.length === 4);
};

const hentYrkerFraJobbønsker = (yrkesønsker: Jobbønske[]): string[] => {
    return [...new Set(yrkesønsker.flatMap((yrkesønske) => yrkesønske.sokeTitler))];
};

const konverterStederTil2024koder = (geografikoder: string[]): string[] => {
    const konverterteKoder = geografikoder.map((kode) => {
        const nyekoder = stedmappingFraGammeltNummer.get(kode)?.nummer || kode;
        return nyekoder.length > 4 ? nyekoder.substring(0, 4) : nyekoder;
    });

    const fylkesKoder = new Set(konverterteKoder.filter((kode) => kode.length === 2));

    return konverterteKoder.filter((kode) => {
        return (
            !Array.from(fylkesKoder).some(
                (fylkesKode) => kode.startsWith(fylkesKode) && kode !== fylkesKode
            ) && kode.length > 0
        );
    });
};
