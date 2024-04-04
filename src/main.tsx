import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppDataProvider } from '@deriv-com/api-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { CFDProvider, UIProvider } from '@/providers';

import { Header } from './components/Header/Header.tsx';
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <AppDataProvider>
                <UIProvider>
                    <CFDProvider>
                        {/* Temporary Header */}
                        <Header />
                        <App />
                    </CFDProvider>
                </UIProvider>
            </AppDataProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);
