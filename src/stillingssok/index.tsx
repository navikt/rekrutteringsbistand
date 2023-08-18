import { useParams } from 'react-router-dom';
import Stillingssøk from './Stillingssøk';
import { StandardsøkProvider } from './standardsøk/StandardsøkContext';

export const Component = () => {
    const { kandidat } = useParams();

    if (kandidat) {
        return <Stillingssøk />;
    } else {
        return (
            <StandardsøkProvider>
                <Stillingssøk />
            </StandardsøkProvider>
        );
    }
};
