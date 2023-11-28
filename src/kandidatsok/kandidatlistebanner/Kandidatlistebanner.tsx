import { Buldings2Icon, PersonGroupIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, Skeleton } from '@navikt/ds-react';
import Grunnbanner from 'felles/komponenter/grunnbanner/Grunnbanner';
import Brødsmulesti from 'felles/komponenter/kandidatbanner/Brødsmulesti';
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

    const stillingsId =
        kandidatliste.kind === Nettstatus.Suksess ? kandidatliste.data.stillingId : null;

    return (
        <Grunnbanner ikon={<FinnKandidaterIkon />}>
            <div className={css.banner}>
                <div className={css.hovedinnhold}>
                    {kandidatliste.kind === Nettstatus.Suksess ? (
                        <Brødsmulesti
                            brødsmulesti={[
                                {
                                    tekst: kandidatliste.data.tittel,
                                    href: lenkeTilKandidatliste(kandidatliste.data.kandidatlisteId),
                                },
                                {
                                    tekst: 'Finn kandidater',
                                },
                            ]}
                        />
                    ) : (
                        <Skeleton width={220} />
                    )}
                    <Heading size="large" level="2">
                        {kandidatliste.kind === Nettstatus.Suksess ? (
                            kandidatliste.data.tittel
                        ) : (
                            <Skeleton>Placeholder</Skeleton>
                        )}
                    </Heading>
                    <BodyShort>
                        {kandidatliste.kind === Nettstatus.Suksess ? (
                            <span>
                                Opprettet av {kandidatliste.data.opprettetAv.navn} (
                                {kandidatliste.data.opprettetAv.ident})
                            </span>
                        ) : (
                            <Skeleton width={100} />
                        )}
                    </BodyShort>
                </div>
                <div className={css.lenker}>
                    {kandidatliste.kind === Nettstatus.Suksess ? (
                        <>
                            {stillingsId && (
                                <Link className="navds-link" to={lenkeTilStilling(stillingsId)}>
                                    <Buldings2Icon aria-hidden />
                                    Se stilling
                                </Link>
                            )}
                            <Link
                                className="navds-link"
                                to={
                                    stillingsId
                                        ? lenkeTilStilling(stillingsId, 'kandidater')
                                        : lenkeTilKandidatliste(kandidatliste.data.kandidatlisteId)
                                }
                            >
                                <PersonGroupIcon aria-hidden />
                                Se kandidatliste
                            </Link>
                        </>
                    ) : (
                        <Skeleton width={100} />
                    )}
                </div>
            </div>
        </Grunnbanner>
    );
};

export default Kandidatlistebanner;
