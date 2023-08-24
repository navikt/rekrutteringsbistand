import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import { defineConfig } from 'vitest/config';
export default defineConfig({
    plugins: [react(), svgrPlugin()],
    test: {
        globals: true,
        setupFiles: './setupTests.ts',
        environment: 'jsdom',
    },
    resolve: {
        alias: {
            felles: './src/felles',
        },
    },
});
