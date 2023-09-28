import { BodyShort, Detail, Heading, Tag } from '@navikt/ds-react';
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
    erUtløpt?: boolean;
    score?: number;
    erIkkePublisert?: boolean;
    erUtkast?: boolean;
    erStoppet?: boolean;
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
    erUtløpt,
    score,
    erIkkePublisert,
    erUtkast,
    erStoppet,
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
                        {erUtløpt && (
                            <Tag size="small" variant="warning" className={css.utløptTag}>
                                Utløpt
                            </Tag>
                        )}

                        {erIkkePublisert && (
                            <Tag size="small" variant="warning" className={css.utløptTag}>
                                Ikke publisert
                            </Tag>
                        )}

                        {erUtkast && (
                            <Tag size="small" variant="info" className={css.utløptTag}>
                                Utkast
                            </Tag>
                        )}

                        {erStoppet && (
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
                <div>
                    <Heading size="small">{lenkeTilStilling}</Heading>
                    {arbeidsgiversNavn && <BodyShort>{arbeidsgiversNavn}</BodyShort>}
                </div>
                {import.meta.env.DEV && score !== null && (
                    <div>
                        <code className={css.score} title="Score">
                            {score.toFixed(2)}
                        </code>
                    </div>
                )}
            </div>
        </RekBisKort>
    );
};

export default RekBisKortStilling;
