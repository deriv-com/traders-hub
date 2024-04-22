import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppDataProvider } from '@deriv-com/api-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { CFDProvider, RealAccountCreationProvider, UIProvider } from '@/providers';

import { Header } from './components/Header/Header.tsx';
import App from './App.tsx';

import './index.css';

const queryClient = new QueryClient();

const RootComponent = () => {
    const isSignup = window.location.pathname === '/signup';
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <AppDataProvider>
                    <UIProvider>
                        <CFDProvider>
                            <RealAccountCreationProvider>
                                {/* Temporary Header */}
                                {!isSignup && <Header />}
                                <App />
                            </RealAccountCreationProvider>
                        </CFDProvider>
                    </UIProvider>
                </AppDataProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<RootComponent />);
