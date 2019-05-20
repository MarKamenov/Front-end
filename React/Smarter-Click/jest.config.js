module.exports = {
	"roots": [
			"<rootDir>/src"
	],
	"transform": {
			"^.+\\.tsx?$": "ts-jest"
	},
	"testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	"moduleFileExtensions": [
			"ts",
			"tsx",
			"js",
			"jsx",
			"json",
			"node"
	],
	"globals": {
    'ts-jest': {
      diagnostics: false
    }
  },

	"testEnvironment": "node",
	"moduleNameMapper": {
		".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
	},
	

	// Setup Enzyme
	"snapshotSerializers": ["enzyme-to-json/serializer"],
	"setupFilesAfterEnv": ["<rootDir>\\setupEnzyme.ts"],
}