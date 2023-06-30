import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import checkerPlugin from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        build: {
            target: 'es2022',
            sourcemap: true,
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

            // Splitt node_modules til en egen chunk.
            // Dette fikser noen sirkulære avhengigheter i @ds/react.
            splitVendorChunkPlugin(),
        ],
        server: {
            port: 3000,
            proxy: {
                '/kandidatsok-proxy': 'http://localhost:3005/kandidatsok-proxy',
                '/stillingssok-proxy': {
                    changeOrigin: true,
                    target: `${env.OPEN_SEARCH_URI}`,
                    rewrite: (path) => path.replace('/stillingssok-proxy', ''),
                    auth: `${env.OPEN_SEARCH_USERNAME}:${env.OPEN_SEARCH_PASSWORD}`,
                },
            },
        },
    };
});
