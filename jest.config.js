module.exports = {
  projects: [
    {
      roots: [
        '<rootDir>/dist/test/perf',
        '<rootDir>/dist/test/server',
        '<rootDir>/dist/test/src',
      ],
      testEnvironment: 'node',
    },
    {
      roots: [
        '<rootDir>/dist/test/client',
      ],
      testEnvironment: 'jsdom',
    },
  ],
};
