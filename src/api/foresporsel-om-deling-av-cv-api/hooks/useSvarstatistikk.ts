import useSWR from 'swr';
import { formaterDatoTilApi } from '../../../forside/statistikk/datoUtils';
import { getAPI } from '../../fetcher';
import { forespørselEndepunkter } from '../forespørsel.api';

interface IuseSvarstatistikk {
    navKontor: string;
    fraOgMed: Date;
    tilOgMed: Date;
}
export const useSvarstatistikk = ({ navKontor, fraOgMed, tilOgMed }: IuseSvarstatistikk) =>
    useSWR(
        forespørselEndepunkter.statistikk(
            new URLSearchParams({
                fraOgMed: formaterDatoTilApi(fraOgMed),
                tilOgMed: formaterDatoTilApi(tilOgMed),
                navKontor,
            })
        ),
        getAPI
    );
