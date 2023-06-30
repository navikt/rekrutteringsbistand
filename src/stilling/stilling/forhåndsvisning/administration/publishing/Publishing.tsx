import { useSelector } from 'react-redux';
import { BodyShort, Heading } from '@navikt/ds-react';
import { formatISOString } from '../../../../utils/datoUtils';

const Publishing = () => {
    const published = useSelector((state: any) => state.adData?.published);
    const expires = useSelector((state: any) => state.adData?.expires);

    return (
        <div>
            {(published || expires) && (
                <Heading level="3" size="small" spacing>
                    Publisering
                </Heading>
            )}
            {published && <BodyShort>Publiseringsdato: {formatISOString(published)}</BodyShort>}
            {expires && <BodyShort>Siste visningsdato: {formatISOString(expires)}</BodyShort>}
        </div>
    );
};

export default Publishing;
