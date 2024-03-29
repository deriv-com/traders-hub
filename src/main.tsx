import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppDataProvider } from '@deriv-com/api-hooks';

import { CFDProvider, UIProvider } from '@/providers';

import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppDataProvider>
            <UIProvider>
                <CFDProvider>
                    <App />
                </CFDProvider>
            </UIProvider>
        </AppDataProvider>
    </React.StrictMode>
);
