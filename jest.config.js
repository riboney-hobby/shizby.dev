module.exports = {
    testEnvironment: 'node',
    globalSetup: './tests/testConfig/globalSetup.js',
    globalTeardown: './tests/testConfig/globalTeardown.js',
    // Setting timeout to ensure async operations are finished
    // src: https://stackoverflow.com/questions/58042401/configure-jest-timeout-once-for-all-tests
    testTimeout: 30000, 
}