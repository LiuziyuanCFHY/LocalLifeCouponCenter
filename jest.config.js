module.exports = {
    preset: 'react-native',
    setupFiles: ['./jest/jestSetup.js'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
    testPathIgnorePatterns: ['node_modules'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/jest/assetsTransformer.js',
        '\\.(css|less)$': '<rootDir>/jest/assetsTransformer.js',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native-community|@kid-ui|@ks)',
    ],
};
