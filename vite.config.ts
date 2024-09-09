import reactPlugin from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, ProxyOptions, splitVendorChunkPlugin } from 'vite';
import checkerPlugin from 'vite-plugin-checker';
import svgrPlugin from 'vite-plugin-svgr';

// const proxyToDev: ProxyOptions = {
//     changeOrigin: true,
//     target: 'https://rekrutteringsbistand.intern.dev.nav.no/',
//     cookieDomainRewrite: {
//         'localhost:3000': 'rekrutteringsbistand.intern.dev.nav.no/',
//     },
//     secure: false,
// };

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
            svgrPlugin({
                include: ['**/*.svg'],
                exclude: '',
            }),
            checkerPlugin({
                typescript: true,
                eslint: {
                    lintCommand: 'eslint "./{src,mock}/**/*.{ts,tsx,js,jsx}"',
                },
            }),

            // Splitt node_modules til en egen chunk.
            // Dette fikser noen sirkulære avhengigheter i @ds/react.
            splitVendorChunkPlugin(),
        ],
        server: {
            port: 3000,
            proxy: {
                '/stillingssok-proxy': {
                    changeOrigin: true,
                    target: `${env.STILLING_ES_URI}`,
                    rewrite: (path) => path.replace('/stillingssok-proxy', ''),
                    auth: `${env.STILLING_ES_USERNAME}:${env.STILLING_ES_PASSWORD}`,
                },
                // '/meg': proxyToDev,
                // '/arbeidsgiver-notifikasjon-api': proxyToDev,
                // '/modiacontextholder': proxyToDev,
                // '/statistikk-api': proxyToDev,
                // '/stillingssok-proxy': proxyToDev,
                // '/stilling-api': proxyToDev,
                // '/kandidat-api': proxyToDev,
                // '/kandidatsok-api': proxyToDev,
                // '/kandidatvarsel-api': proxyToDev,
                // '/foresporsel-om-deling-av-cv-api': proxyToDev,
                // '/synlighet-api': proxyToDev,
                // '/presenterte-kandidater-api': proxyToDev,
                // '/kandidatsok-proxy': proxyToDev,
            },
        },
        resolve: {
            alias: {
                felles: path.resolve(__dirname, './src/felles'),
            },
        },
    };
});
