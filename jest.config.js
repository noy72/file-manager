/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const common = {
    preset: "ts-jest/presets/js-with-ts-esm",
    globals: {
        "ts-jest": {
            useESM: true,
            tsconfig: "tsconfig.json",
        },
    },
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
};

module.exports = {
    projects: [
        {
            displayName: "node",
            testEnvironment: "node",
            testMatch: ["<rootDir>/tests/main/**/*.test.ts"],
            ...common,
        },
        {
            displayName: "jsdom",
            testEnvironment: "jsdom",
            testMatch: ["<rootDir>/tests/renderer/**/*.test.tsx"],
            ...common,
        },
    ],
};
