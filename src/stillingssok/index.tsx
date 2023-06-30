import { useParams } from 'react-router-dom';
import Stillingssøk from './Stillingssøk';
import { StandardsøkProvider } from './standardsøk/StandardsøkContext';

if (import.meta.env.VITE_MOCK) {
    await import('./mock-api/mock-api');
}

export const Component = () => {
    const { fnr } = useParams();

    if (fnr) {
        return <Stillingssøk />;
    } else {
        return (
            <StandardsøkProvider>
                <Stillingssøk />
            </StandardsøkProvider>
        );
    }
};
