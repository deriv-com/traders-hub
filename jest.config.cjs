module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^.+\\.svg\\?react$': '<rootDir>/__mocks__/svgReactTransformer.cjs',
        '^@/(.*)$': '<rootDir>/src/$1',
        '@deriv-com/ui': '<rootDir>/node_modules/@deriv-com/ui',
        '^@cfd/components(.*)$': '<rootDir>/src/cfd/components/$1',
        '^@cfd/constants$': '<rootDir>/src/cfd/constants',
        '^@cfd/flows(.*)$': '<rootDir>/src/cfd/flows/$1',
        '^@cfd/screens(.*)$': '<rootDir>/src/cfd/screens/$1',
        '^@cfd/modals(.*)$': '<rootDir>/src/cfd/modals/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
