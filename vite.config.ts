import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig(() => {
    return {
        plugins: [react(), svgrPlugin()],
        server: {
            port: 3000,
            proxy: {
                '/kandidatsok-proxy': 'http://localhost:3005/kandidatsok-proxy',
            },
        },
    };
});
