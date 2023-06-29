import { FunctionComponent } from 'react';
import { Heading } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import liste from './ikoner/liste.svg';
import blyant from './ikoner/blyant.svg';
import kvinne from './ikoner/kvinne.svg';
import checkliste from './ikoner/checkliste.svg';
import css from './Hurtiglenker.module.css';

const Hurtiglenker: FunctionComponent = () => {
    return (
        <nav className={css.hurtiglenker}>
            <LenkepanelMedIkon
                href="/stillinger/minestillinger"
                tittel="Mine stillinger"
                ikonSrc={liste}
            />
            <LenkepanelMedIkon
                href="/stillinger/minestillinger?visOpprettStillingModal"
                tittel="Opprett ny stilling"
                ikonSrc={blyant}
            />
            <LenkepanelMedIkon href="/kandidatsok" tittel="Finn kandidater" ikonSrc={kvinne} />
            <LenkepanelMedIkon
                href="/kandidater/lister"
                tittel="Se kandidatlister"
                ikonSrc={checkliste}
            />
        </nav>
    );
};

const LenkepanelMedIkon: FunctionComponent<{
    tittel: string;
    href: string;
    ikonSrc: string;
}> = ({ tittel, href, ikonSrc }) => (
    <Link
        to={href}
        className={`navds-panel navds-link-panel navds-panel--border ${css.lenkepanel}`}
    >
        <div className={css.lenkeinnhold}>
            <div className={css.lenkeikon}>
                <img src={ikonSrc} alt="" />
            </div>
            <Heading level="2" size="medium">
                {tittel}
            </Heading>
        </div>
    </Link>
);

export default Hurtiglenker;
