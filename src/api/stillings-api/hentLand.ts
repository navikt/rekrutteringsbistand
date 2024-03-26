/**
 * Endepunkt /hentFylker
 */
import { HttpResponse, http } from 'msw';
import useSWRImmutable from 'swr';
import { z } from 'zod';
import { getAPI } from '../fetcher';

export const hentLandlisteEndepunkt =
    '/stilling-api/rekrutteringsbistand/api/v1/geography/countries';

export const landSchema = z.object({
    code: z.string(),
    name: z.string(),
    capitalizedName: z.string(),
});

const hentLandlisteSchema = z.array(landSchema);

export type HentLandlisteDTO = z.infer<typeof hentLandlisteSchema>;
export type LandDTO = z.infer<typeof landSchema>;

export interface HentFylkerProps {}

export const useHentLandliste = () => {
    const swrData = useSWRImmutable(hentLandlisteEndepunkt, getAPI);

    if (swrData.data) {
        return {
            ...swrData,
            data: hentLandlisteSchema.parse(swrData.data),
        };
    }
    return swrData;
};

const landMock: HentLandlisteDTO = [
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

export const hentLandlisteMockMsw = http.get(hentLandlisteEndepunkt, (_) =>
    HttpResponse.json(landMock)
);
