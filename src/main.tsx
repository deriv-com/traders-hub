import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppDataProvider } from '@deriv-com/api-hooks';

import App from './App.tsx';
import { UIProvider } from './providers';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppDataProvider>
            <UIProvider>
                <App />
            </UIProvider>
        </AppDataProvider>
    </React.StrictMode>
);
