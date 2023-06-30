import { ReactNode } from 'react';
import { Accordion, BodyShort, BodyLong } from '@navikt/ds-react';
import classNames from 'classnames';
import css from './Seksjon.module.css';

type Props = {
    tittel: string;
    påkrevd?: boolean;
    spacing?: boolean;
    beskrivelse?: string;
    children: ReactNode;
};

const Seksjon = ({ tittel, påkrevd, spacing, beskrivelse, children }: Props) => (
    <Accordion.Item defaultOpen>
        <Accordion.Header>
            {tittel}
            {påkrevd && <BodyShort as="span"> (må fylles ut)</BodyShort>}
            {beskrivelse && <BodyLong size="small">{beskrivelse}</BodyLong>}
        </Accordion.Header>
        <Accordion.Content
            className={classNames({
                [css.spacing]: spacing,
            })}
        >
            {children}
        </Accordion.Content>
    </Accordion.Item>
);

export default Seksjon;
