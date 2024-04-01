import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
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
