/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
			babelConfig: {
				presets: [
					'babel-preset-solid',
					'@babel/preset-env'
				],
			},
		},
	},
	moduleNameMapper: {
		'@haven/web-components-solid': 'src/packages/@haven/web-components-solid/index.ts',
		'solid-js/web': '<rootDir>/node_modules/solid-js/web/dist/web.cjs',
		'solid-js': '<rootDir>/node_modules/solid-js/dist/solid.cjs'
	},
}
