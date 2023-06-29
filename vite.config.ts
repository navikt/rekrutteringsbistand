import { defineConfig } from 'vite';

import reactPlugin from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import checkerPlugin from 'vite-plugin-checker';

export default defineConfig(() => {
    return {
        build: {
            target: 'es2022',
        },
        plugins: [
            reactPlugin(),
            svgrPlugin(),
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
