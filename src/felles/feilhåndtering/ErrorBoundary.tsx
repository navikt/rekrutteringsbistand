import { Alert, Button } from '@navikt/ds-react';
import { Component, ErrorInfo, ReactNode } from 'react';
import { ZodError } from 'zod';
interface Props {
    children?: ReactNode;
}

interface Feilmelding {
    name: string;
    message: string;
    stack: string;
}

interface State {
    showError: boolean;
    hasError: boolean;
    error: Feilmelding | ZodError | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        showError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        if (error instanceof ZodError) {
            return { hasError: true, error, showError: false };
        } else if (error instanceof Error) {
            return {
                showError: false,
                hasError: true,
                error: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack ?? '',
                },
            };
        }
        return { hasError: true, error: null, showError: false };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Feilmelding:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ width: '100%' }}>
                    <Alert variant="error" style={{ margin: '1rem' }}>
                        <div>
                            <p>Noe gikk galt! Prøv igjen om noen minutter.</p>
                            <p>
                                Hvis feilen fortsetter, rapporter inn saken som en fagsystem feil.
                            </p>
                            {this.state.error && (
                                <Button
                                    variant="tertiary"
                                    size="small"
                                    onClick={() =>
                                        this.setState({
                                            ...this.state,
                                            showError: !this.state.showError,
                                        })
                                    }
                                >
                                    {this.state.showError ? 'Skjul' : 'Vis'} teknisk feilmelding
                                </Button>
                            )}
                            {this.state.showError && (
                                <div>
                                    <strong>
                                        <p>{this.state.error?.name}</p>
                                    </strong>
                                    <p>{this.state.error?.message}</p>
                                    <p>{this.state.error?.stack}</p>
                                </div>
                            )}
                        </div>
                    </Alert>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
