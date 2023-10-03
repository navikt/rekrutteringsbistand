import { Buldings2Icon, PersonGroupIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import Grunnbanner from 'felles/komponenter/grunnbanner/Grunnbanner';
import { ReactComponent as FinnKandidaterIkon } from 'felles/komponenter/piktogrammer/finn-kandidater.svg';
import { Nettstatus } from 'felles/nettressurs';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import useSøkekriterierFraStilling from '../hooks/useSøkekriterierFraStilling';
import { lenkeTilKandidatliste, lenkeTilStilling } from '../utils';
import css from './Kandidatlistebanner.module.css';

type Props = {
    kontekst: KontekstAvKandidatlisteEllerStilling;
};

const Kandidatlistebanner: FunctionComponent<Props> = ({ kontekst }) => {
    const { kandidatliste, stilling, brukKriterierFraStillingen } = kontekst;

    useSøkekriterierFraStilling(stilling, brukKriterierFraStillingen);

    if (kandidatliste.kind !== Nettstatus.Suksess) {
        return null;
    }

    const { tittel, opprettetAv, kandidatlisteId } = kandidatliste.data;

    return (
        <Grunnbanner ikon={<FinnKandidaterIkon />}>
            <div className={css.banner}>
                <div className={css.hovedinnhold}>
                    <BodyShort>Finn kandidater til kandidatliste:</BodyShort>
                    <Heading size="large" level="2">
                        {tittel}
                    </Heading>
                    <BodyShort>
                        Opprettet av {opprettetAv.navn} ({opprettetAv.ident})
                    </BodyShort>
                </div>
                <div className={css.lenker}>
                    {kandidatliste.data.stillingId && (
                        <Link
                            className="navds-link"
                            to={lenkeTilStilling(kandidatliste.data.stillingId)}
                        >
                            <Buldings2Icon aria-hidden />
                            Se stilling
                        </Link>
                    )}
                    <Link className="navds-link" to={lenkeTilKandidatliste(kandidatlisteId)}>
                        <PersonGroupIcon aria-hidden />
                        Se kandidatliste
                    </Link>
                </div>
            </div>
        </Grunnbanner>
    );
};

export default Kandidatlistebanner;
