import { BodyShort } from '@navikt/ds-react';
import classNames from 'classnames';
import FinnKandidaterIkon from 'felles/komponenter/piktogrammer/finn-kandidater.svg';
import FinnStillinger from 'felles/komponenter/piktogrammer/finn-stillinger.svg';
import OpprettNyStillingIkon from 'felles/komponenter/piktogrammer/opprett-ny-stilling.svg';
import SeMineStillingerIkon from 'felles/komponenter/piktogrammer/se-mine-stillinger.svg';
import { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { sendEvent } from '../../felles/amplitude';
import css from './Hurtiglenker.module.css';

const Hurtiglenker: FunctionComponent = () => {
    return (
        <nav className={css.hurtiglenker}>
            <LenkepanelMedIkon
                href="/kandidatsok"
                tittel="Finn kandidater"
                ikon={<FinnKandidaterIkon />}
            />
            <LenkepanelMedIkon
                href="/stillinger/stillingssok?brukStandardsok=true"
                tittel="Finn stillinger"
                ikon={<FinnStillinger />}
            />
            <LenkepanelMedIkon
                href={'/stillinger/stillingssok?portefolje=visMine'}
                tittel="Se mine stillinger"
                ikon={<SeMineStillingerIkon />}
                onClick={() => sendEvent('oversikt', 'vis_mine_stillinger_knapp')}
            />
            <LenkepanelMedIkon
                href="/stillinger/stillingssok?modal=opprettStillingModal"
                tittel="Opprett ny stilling"
                ikon={<OpprettNyStillingIkon />}
            />
        </nav>
    );
};

const LenkepanelMedIkon: FunctionComponent<{
    tittel: string;
    href: string;
    ikon: ReactNode;
    onClick?: () => void;
}> = ({ tittel, href, ikon, onClick }) => (
    <Link to={href} className={classNames('navds-link-panel', css.lenkepanel)} onClick={onClick}>
        <div className={css.lenkeinnhold}>
            {ikon}
            <BodyShort as="span">{tittel}</BodyShort>
        </div>
    </Link>
);

export default Hurtiglenker;
