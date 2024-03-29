import { Ingress } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { sendEvent } from 'felles/amplitude';
import Kandidat from 'felles/domene/kandidat/Kandidat';
import { KandidatlisteForKandidat } from 'felles/domene/kandidatliste/Kandidatliste';
import { Sms } from 'felles/domene/sms/Sms';
import { ikkeLastet, lasterInn, Nettressurs, suksess } from 'felles/nettressurs';
import { useHentKandidatHistorikk } from '../../../api/kandidat-api/hentKandidatHistorikk';
import { useLookupCv } from '../../../api/kandidat-søk-api/lookupCv';
import Sidelaster from '../../../felles/komponenter/sidelaster/Sidelaster';
import { fetchSmserForKandidat } from '../../api/api';
import { fetchForespørslerOmDelingAvCvForKandidat } from '../../api/forespørselOmDelingAvCvApi';
import { ForespørselOmDelingAvCv } from '../../kandidatliste/knappe-rad/forespørsel-om-deling-av-cv/Forespørsel';
import { capitalizeFirstLetter } from '../../utils/formateringUtils';
import { KandidatQueryParam } from '../Kandidatside';
import css from './Historikkside.module.css';
import { Historikktabell } from './historikktabell/Historikktabell';

const Historikkside: FunctionComponent = () => {
    const { search } = useLocation();
    const { kandidatnr } = useParams<{ kandidatnr: string }>();

    const { data, isLoading, error } = useHentKandidatHistorikk({ kandidatnr: kandidatnr });

    const queryParams = new URLSearchParams(search);
    const kandidatlisteId = queryParams.get(KandidatQueryParam.KandidatlisteId);

    const { cv } = useLookupCv(kandidatnr);
    const [forespørslerOmDelingAvCv, setForespørslerOmDelingAvCv] = useState<
        Nettressurs<ForespørselOmDelingAvCv[]>
    >(ikkeLastet());
    const [smser, setSmser] = useState<Nettressurs<[Sms]>>(ikkeLastet());

    useEffect(() => {
        const hentForespørslerOmDelingAvCvForKandidat = async (aktørId: string) => {
            const forespørsler = await fetchForespørslerOmDelingAvCvForKandidat(aktørId);
            setForespørslerOmDelingAvCv(suksess(forespørsler));
        };

        const hentSmserForKandidat = async (fnr: string) => {
            const smser = await fetchSmserForKandidat(fnr);
            setSmser(suksess(smser));
        };

        if (cv) {
            setForespørslerOmDelingAvCv(lasterInn());
            hentForespørslerOmDelingAvCvForKandidat(cv.aktorId);
            hentSmserForKandidat(cv.fodselsnummer);
        }
    }, [cv]);

    useEffect(() => {
        if (data) {
            sendEvent('historikk', 'hentet', {
                antallLister: data.length,
            });
        }
    }, [kandidatnr, data]);

    if (isLoading) {
        return <Sidelaster />;
    }

    if (error) {
        return <span> Feil ved lasting av historikk...</span>;
    }

    const kandidatlister = sorterPåDato(data);
    const navn = hentKandidatensNavnFraCvEllerKandidatlister(cv, kandidatlister);

    return (
        <div className={css.historikk}>
            <Ingress className={css.ingress}>
                <b>{navn}</b> er lagt til i <b>{kandidatlister.length}</b> kandidatlister
            </Ingress>
            <Historikktabell
                kandidatlister={kandidatlister}
                aktivKandidatlisteId={kandidatlisteId}
                forespørslerOmDelingAvCvForKandidat={forespørslerOmDelingAvCv}
                smser={smser}
            />
        </div>
    );
};

const formaterNavn = (fornavn: string, etternavn: string) => {
    const formatertFornavn = capitalizeFirstLetter(fornavn);
    const formatertEtternavn = capitalizeFirstLetter(etternavn);

    return `${formatertFornavn} ${formatertEtternavn}`;
};

export const hentKandidatensNavnFraCvEllerKandidatlister = (
    cv: Kandidat,
    kandidatlister: KandidatlisteForKandidat[]
) => {
    if (cv) {
        return formaterNavn(cv.fornavn, cv.etternavn);
    }

    if (kandidatlister.length > 0) {
        const kandidatliste = kandidatlister[0];
        return formaterNavn(kandidatliste.fornavn, kandidatliste.etternavn);
    }

    return null;
};

const sorterPåDato = (kandidatlister: KandidatlisteForKandidat[]) => {
    return kandidatlister.sort(
        (a, b) => new Date(b.lagtTilTidspunkt).getTime() - new Date(a.lagtTilTidspunkt).getTime()
    );
};

export default Historikkside;
