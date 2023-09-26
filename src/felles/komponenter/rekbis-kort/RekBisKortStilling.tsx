import { Detail, Heading, Tag } from '@navikt/ds-react';
import * as React from 'react';
import RekBisKort from './RekBisKort';
import css from './RekBisKortStilling.module.css';

export interface IRekBisKortStilling {
    publisertDato?: string;
    etiketter?: React.ReactNode;
    arbeidsgiversNavn?: string;
    lenkeTilStilling?: React.ReactNode;
    stillingsinfo?: React.ReactNode;
    knapper?: React.ReactNode;
    status?: string;
    erEier?: boolean;
}

const RekBisKortStilling: React.FC<IRekBisKortStilling> = ({
    publisertDato,
    etiketter,
    arbeidsgiversNavn,
    lenkeTilStilling,
    stillingsinfo,
    knapper,
    status,
    erEier,
}) => {
    return (
        <RekBisKort
            header={
                <div className={css.header}>
                    <div className={css.header}>
                        {erEier && (
                            <Tag size="small" variant="neutral" className={css.utløptTag}>
                                Min stilling
                            </Tag>
                        )}
                        {status === 'INACTIVE' && (
                            <Tag size="small" variant="warning" className={css.utløptTag}>
                                Utløpt
                            </Tag>
                        )}

                        {(status === 'STOPPED' || status === 'REJECTED') && (
                            <Tag size="small" variant="error" className={css.utløptTag}>
                                Stoppet
                            </Tag>
                        )}
                        <Detail> {publisertDato}</Detail>
                    </div>
                    {etiketter}
                </div>
            }
            footer={
                <div className={css.footer}>
                    <div>{stillingsinfo}</div>
                    <div>{knapper}</div>
                </div>
            }
        >
            <div className={css.innhold}>
                {arbeidsgiversNavn && <Heading size="xsmall">{arbeidsgiversNavn}</Heading>}
                <Heading size="small">{lenkeTilStilling}</Heading>
            </div>
        </RekBisKort>
    );
};

export default RekBisKortStilling;
