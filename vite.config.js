import { defineConfig } from 'vite';
import reactSvgPlugin from '@vitejs/plugin-react-svg';

export default defineConfig({
  plugins: [reactSvgPlugin()],
});