import { Buldings2Icon, PersonGroupIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, Loader, Skeleton } from '@navikt/ds-react';
import Grunnbanner from 'felles/komponenter/grunnbanner/Grunnbanner';
import Brødsmulesti from 'felles/komponenter/kandidatbanner/Brødsmulesti';
import FinnKandidaterIkon from 'felles/komponenter/piktogrammer/finn-kandidater.svg';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import useHentStilling, { useHentStillingTittel } from '../../felles/hooks/useStilling';
import { lenkeTilStilling } from '../../felles/lenker';
import useSøkekriterierFraStilling from '../hooks/useSøkekriterierFraStilling';
import css from './Kandidatlistebanner.module.css';
import useNavigeringsstate from '../hooks/useNavigeringsstate';

type Props = {
    stillingId?: string;
};

const Kandidatlistebanner: FunctionComponent<Props> = ({ stillingId }) => {
    const navigeringsstate = useNavigeringsstate();
    const {
        stilling: rekrutteringsbistandstilling,
        isLoading: isStillingLoading,
        isError: isStillingError,
    } = useHentStilling(stillingId);

    const brukKriterierFraStillingen = navigeringsstate.brukKriterierFraStillingen;

    useSøkekriterierFraStilling(rekrutteringsbistandstilling, brukKriterierFraStillingen);

    const stillingsId = rekrutteringsbistandstilling?.stilling.uuid;
    const stillingTittel = useHentStillingTittel(stillingsId);
    const opprettetAvIdent =
        rekrutteringsbistandstilling?.stillingsinfo?.eierNavident ??
        rekrutteringsbistandstilling?.stilling?.administration?.navIdent ??
        '';
    const opprettetAvNavn =
        rekrutteringsbistandstilling?.stillingsinfo?.eierNavn ??
        rekrutteringsbistandstilling?.stilling?.administration?.reportee ??
        '';

    return (
        <Grunnbanner ikon={<FinnKandidaterIkon />}>
            <div className={css.banner}>
                <div className={css.hovedinnhold}>
                    {isStillingLoading ? (
                        <Loader size="medium" />
                    ) : isStillingError ? (
                        <>
                            <Skeleton width={220} />
                            <Heading size="large" level="2">
                                <Skeleton>Placeholder</Skeleton>
                            </Heading>
                            <BodyShort>
                                <Skeleton as="span" width={100} />
                            </BodyShort>
                        </>
                    ) : (
                        <>
                            <Brødsmulesti
                                brødsmulesti={[
                                    {
                                        tekst: stillingTittel ?? '',
                                        href: stillingsId
                                            ? lenkeTilStilling({
                                                  stillingsId: stillingsId,
                                                  redigeringsmodus: false,
                                                  fane: 'kandidater',
                                              })
                                            : '#',
                                    },
                                    {
                                        tekst: 'Finn kandidater',
                                    },
                                ]}
                            />
                            <Heading size="large" level="2">
                                {stillingTittel}
                            </Heading>
                            <BodyShort>
                                <span>
                                    Opprettet av {opprettetAvNavn} ({opprettetAvIdent})
                                </span>
                            </BodyShort>
                        </>
                    )}
                </div>
                <div className={css.lenker}>
                    {isStillingLoading ? (
                        <Loader size="medium" />
                    ) : isStillingError ? (
                        <Skeleton width={100} />
                    ) : (
                        <>
                            {stillingsId && (
                                <Link
                                    className="navds-link"
                                    to={lenkeTilStilling({ stillingsId: stillingsId })}
                                >
                                    <Buldings2Icon aria-hidden />
                                    Se stilling
                                </Link>
                            )}
                            <Link
                                className="navds-link"
                                to={
                                    stillingsId
                                        ? lenkeTilStilling({
                                              stillingsId: stillingsId,
                                              fane: 'kandidater',
                                          })
                                        : '#'
                                }
                            >
                                <PersonGroupIcon aria-hidden />
                                Se kandidatliste
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </Grunnbanner>
    );
};

export default Kandidatlistebanner;
