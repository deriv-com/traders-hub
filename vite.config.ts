import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, './dev.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, './cert.pem')),
        },
        port: 8443,
    },
});
