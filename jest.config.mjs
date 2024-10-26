export default {
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  roots: ['<rootDir>/tests'],
  testMatch: ['<rootDir>/tests/**/*.test.mjs'],
  testTimeout: 30000,
};
