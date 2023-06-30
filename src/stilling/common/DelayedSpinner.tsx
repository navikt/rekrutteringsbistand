import { useEffect, useState } from 'react';
import { Loader } from '@navikt/ds-react';

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

    return <Loader size="xlarge" />;
};

export default DelayedSpinner;
