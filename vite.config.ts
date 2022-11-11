import { UserConfig, defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
// @ts-ignore
import { peerDependencies, dependencies } from './package.json'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ['src/'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src', 'index.ts'),
      name: 'my-lib',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`, // Change this to your library name
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)],
    },
    target: 'esnext',
    sourcemap: true,
  },
})) as UserConfig
