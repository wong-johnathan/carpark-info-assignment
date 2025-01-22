module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/_test/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/_test/setup.ts'],
};
