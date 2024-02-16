import { Alert } from '@navikt/ds-react';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Alert variant="error" style={{ margin: '1rem' }}>
                    Noe gikk galt! Prøv igjen om noen minutter. <br />
                    Hvis feilen fortsetter, rapporter inn saken som en fagsystem feil.
                </Alert>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
