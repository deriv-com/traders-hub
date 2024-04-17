import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppDataProvider } from '@deriv-com/api-hooks';
import { initializeI18n, TranslationProvider } from '@deriv-com/translations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { CFDProvider, RealAccountCreationProvider, UIProvider } from '@/providers';

import { Header } from './components/Header/Header.tsx';
import App from './App.tsx';

import './index.css';

const queryClient = new QueryClient();

const i18nInstance = initializeI18n({ cdnUrl: 'https://cdn.example.com' });

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppDataProvider>
                <UIProvider>
                    <CFDProvider>
                        <RealAccountCreationProvider>
                            {/* Temporary Header */}
                            <Header />
                            <TranslationProvider i18nInstance={i18nInstance} defaultLang='EN'>
                                <App />
                            </TranslationProvider>
                            <App />
                        </RealAccountCreationProvider>
                    </CFDProvider>
                </UIProvider>
            </AppDataProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);
