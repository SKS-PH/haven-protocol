import { defineConfig } from 'vite'

import solidPlugin from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'

import polyfillNode from 'rollup-plugin-polyfill-node'

export default defineConfig({
	define: {
		'process.env': {},
		'global': {},
	},
	plugins: [
		polyfillNode(),
		tsconfigPaths(),
		solidPlugin()
	],
	optimizeDeps: {
		exclude: ['web3'] // <= The libraries that need shimming should be excluded from dependency optimization.
	},
	build: {
		target: 'esnext',
		polyfillDynamicImport: false,
	},
})
