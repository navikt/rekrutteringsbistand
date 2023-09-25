import { BodyShort } from '@navikt/ds-react';
import classNames from 'classnames';
import { ReactComponent as FinnKandidaterIkon } from 'felles/komponenter/piktogrammer/finn-kandidater.svg';
import { ReactComponent as FinnStillinger } from 'felles/komponenter/piktogrammer/finn-stillinger.svg';
import { ReactComponent as OpprettNyStillingIkon } from 'felles/komponenter/piktogrammer/opprett-ny-stilling.svg';
import { ReactComponent as SeMineStillingerIkon } from 'felles/komponenter/piktogrammer/se-mine-stillinger.svg';
import { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import useInnloggetBruker from '../../felles/hooks/useBrukerensIdent';
import css from './Hurtiglenker.module.css';

const Hurtiglenker: FunctionComponent = () => {
    const innloggetBruker = useInnloggetBruker();
    console.log('🎺 innloggetBruker', innloggetBruker);
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
                // href={`/stillinger/stillingssok?visMine=${innloggetBruker}`}
                href={'/stillinger/minestillinger'}
                tittel="Se mine stillinger"
                ikon={<SeMineStillingerIkon />}
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
}> = ({ tittel, href, ikon }) => (
    <Link to={href} className={classNames('navds-link-panel', css.lenkepanel)}>
        <div className={css.lenkeinnhold}>
            {ikon}
            <BodyShort as="span">{tittel}</BodyShort>
        </div>
    </Link>
);

export default Hurtiglenker;
