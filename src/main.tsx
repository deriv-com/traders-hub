import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppDataProvider } from '@deriv-com/api-hooks';

import { CFDProvider, RealAccountCreationProvider, UIProvider } from '@/providers';

import { Header } from './components/Header/Header.tsx';
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
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
    </React.StrictMode>
);
