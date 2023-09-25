import { Loader } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

const DelayedSpinner = () => {
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    useEffect(() => {
        const spinnerTimeout = setTimeout(() => {
            setShowSpinner(true);
        });

        return () => {
            clearTimeout(spinnerTimeout);
        };
    });

    if (!showSpinner) {
        return null;
    }

    return <Loader variant="interaction" size="2xlarge" />;
};

export default DelayedSpinner;
