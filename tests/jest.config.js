module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverageFrom: [
    '../controllers/**',
    '../repositories/**',
    '../routes/**',
  ],
  errorOnDeprecated: true,
  restoreMocks: true,
  testEnvironment: 'jest-environment-node',
  verbose: true,
}
