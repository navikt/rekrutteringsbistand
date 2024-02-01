import useSWR from 'swr';
import { formaterDatoTilApi } from '../../../forside/statistikk/datoUtils';
import { getAPI } from '../../fetcher';
import { statistikkEndepunkter } from '../statistikk.api';

interface IuseUtfallsstatistikk {
    navKontor: string;
    fraOgMed: Date;
    tilOgMed: Date;
}
export const useUtfallsstatistikk = ({ navKontor, fraOgMed, tilOgMed }: IuseUtfallsstatistikk) =>
    useSWR(
        statistikkEndepunkter.statistikk(
            new URLSearchParams({
                fraOgMed: formaterDatoTilApi(fraOgMed),
                tilOgMed: formaterDatoTilApi(tilOgMed),
                navKontor,
            })
        ),
        getAPI
    );
