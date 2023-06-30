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
            chunkSizeWarningLimit: 3000,
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
                '/kandidatsok-proxy': {
                    changeOrigin: true,
                    target: `${env.KANDIDAT_ES_URI}/veilederkandidat_current/_search`,
                    rewrite: (path) => path.replace('/kandidatsok-proxy', ''),
                    auth: `${env.KANDIDAT_ES_USERNAME}:${env.KANDIDAT_ES_PASSWORD}`,
                },
                '/stillingssok-proxy': {
                    changeOrigin: true,
                    target: `${env.STILLING_ES_URI}`,
                    rewrite: (path) => path.replace('/stillingssok-proxy', ''),
                    auth: `${env.STILLING_ES_USERNAME}:${env.STILLING_ES_PASSWORD}`,
                },
            },
        },
    };
});
