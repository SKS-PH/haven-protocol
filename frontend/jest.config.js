/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
			'babelConfig': {
				'presets': [
					'babel-preset-solid',
					'@babel/preset-env'
				]
			},
		},
	},
	moduleNameMapper: {
		'@haven/web-components-solid': 'src/packages/@haven/web-components-solid/index.ts',
	},
}
