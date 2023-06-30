import { Heading, Panel } from '@navikt/ds-react';
import { Kontaktinfo } from '../../../domene/Stilling';
import css from '../Forhåndsvisning.module.css';

type Props = {
    contactList?: Kontaktinfo[];
};

const Kontaktperson = ({ contactList }: Props) => {
    if (contactList && contactList.length > 0) {
        const { name, title, phone, email } = contactList[0];

        return (
            <Panel className={css.infoboks}>
                <Heading spacing level="3" size="small">
                    Kontaktperson for stillingen
                </Heading>
                <dl className={css.definisjonsliste}>
                    {name && (
                        <>
                            <dt key="dt">Kontaktperson:</dt>
                            <dd key="dd">{name}</dd>
                        </>
                    )}
                    {title && (
                        <>
                            <dt key="dt">Stillingstittel:</dt>
                            <dd key="dd">{title}</dd>
                        </>
                    )}
                    {phone && (
                        <>
                            <dt key="dt">Telefon:</dt>
                            <dd key="dd">{phone}</dd>
                        </>
                    )}
                    {email && (
                        <>
                            <dt key="dt">Epost:</dt>
                            <dd key="dd">{email}</dd>
                        </>
                    )}
                </dl>
            </Panel>
        );
    }

    return null;
};

export default Kontaktperson;
