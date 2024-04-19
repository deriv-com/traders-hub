import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppDataProvider } from '@deriv-com/api-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { CFDProvider, RealAccountCreationProvider, UIProvider } from '@/providers';
import { startInitPerformanceTimers } from '@/utils';

import { Header } from './components/Header/Header.tsx';
import App from './App.tsx';

import './index.css';

const queryClient = new QueryClient();

// function to start the timer for login/signup/redirect
startInitPerformanceTimers();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppDataProvider>
                <UIProvider>
                    <CFDProvider>
                        <RealAccountCreationProvider>
                            {/* Temporary Header */}
                            <Header />
                            <App />
                        </RealAccountCreationProvider>
                    </CFDProvider>
                </UIProvider>
            </AppDataProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);
