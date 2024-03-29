import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppDataProvider } from '@deriv-com/api-hooks';

import { CFDProvider, UIProvider } from '@/providers';

import { Header } from './components/Header/Header.tsx';
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppDataProvider>
            <UIProvider>
                <CFDProvider>
                    {/* Temporary Header */}
                    <Header />
                    <App />
                </CFDProvider>
            </UIProvider>
        </AppDataProvider>
    </React.StrictMode>
);
