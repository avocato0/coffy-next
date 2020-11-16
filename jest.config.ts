import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	modulePaths: ['<rootDir>/src'],
	setupFiles: ['./tests/setup.ts'],
}

export default config
