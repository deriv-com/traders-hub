module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.svg$': '<rootDir>/__mocks__/svgReactTransformer.cjs',
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^@/assets/(.*)\\.svg\\?react$': '<rootDir>/__mocks__/svgReactTransformer.cjs',
        '^@/assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
        '@deriv-com/ui': '<rootDir>/__mocks__/fileMock.js',
        '^@cfd/components(.*)$': '<rootDir>/src/cfd/components/$1',
        '^@cfd/constants$': '<rootDir>/src/cfd/constants',
        '^@cfd/flows(.*)$': '<rootDir>/src/cfd/flows/$1',
        '^@cfd/screens(.*)$': '<rootDir>/src/cfd/screens/$1',
        '^@cfd/modals(.*)$': '<rootDir>/src/cfd/modals/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
};
