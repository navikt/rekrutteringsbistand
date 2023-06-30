import { defineConfig, splitVendorChunkPlugin } from 'vite';

import reactPlugin from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import checkerPlugin from 'vite-plugin-checker';

export default defineConfig(() => {
    return {
        build: {
            target: 'es2022',
            manifest: true,
        },
        plugins: [
            reactPlugin(),
            svgrPlugin(),
            splitVendorChunkPlugin(),
            checkerPlugin({
                typescript: true,
                eslint: {
                    lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"',
                },
            }),
        ],
        server: {
            port: 3000,
            proxy: {
                '/kandidatsok-proxy': 'http://localhost:3005/kandidatsok-proxy',
            },
        },
    };
});
