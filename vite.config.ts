import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'deriv-com': ['@deriv-com/api-hooks', '@deriv-com/utils'],
                    react: ['react', 'react-dom'],
                },
            },
        },
    },
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@cfd': path.resolve(__dirname, './src/cfd/'),
        },
    },
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, './dev.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, './cert.pem')),
        },
        port: 8443,
    },
});
