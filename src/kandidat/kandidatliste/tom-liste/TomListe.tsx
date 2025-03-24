import { FunctionComponent, ReactNode } from 'react';
import { Heading } from '@navikt/ds-react';
import classnames from 'classnames';
import css from './TomListe.module.css';
import OrganisasjonsnummerAlert from '../OrganisasjonsnummerAlert';

type Props = {
    children?: ReactNode;
    kandidatlistenErLukket: boolean;
    orgnummerDivergererMellomStillingOgKandidat: boolean;
};

const TomListe: FunctionComponent<Props> = ({
    kandidatlistenErLukket,
    orgnummerDivergererMellomStillingOgKandidat,
    children,
}) => (
    <div className={css.tomListe}>
        <div>
            {orgnummerDivergererMellomStillingOgKandidat && (
                <div className={css.alertWrapper}>
                    <OrganisasjonsnummerAlert />
                </div>
            )}
            <div
                className={classnames(css.content, {
                    [css.contentLukketListe]: kandidatlistenErLukket,
                })}
            >
                <Heading
                    level="2"
                    size="medium"
                    className={classnames(css.tekst, {
                        [css.tekstMedChildren]: children,
                    })}
                >
                    <span>Du har ingen kandidater i kandidatlisten.</span>
                    {kandidatlistenErLukket && <span> Listen er avsluttet.</span>}
                </Heading>
                {children && <div className={css.knapper}>{children}</div>}
            </div>
        </div>
    </div>
);

export default TomListe;
