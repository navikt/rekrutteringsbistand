import { defineConfig } from 'vite';

import reactPlugin from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig(() => {
    return {
        plugins: [reactPlugin(), svgrPlugin(), eslintPlugin()],
        server: {
            port: 3000,
            proxy: {
                '/kandidatsok-proxy': 'http://localhost:3005/kandidatsok-proxy',
            },
        },
    };
});
