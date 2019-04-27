module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.test.{ts,tsx}",
  ],
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  testMatch: ["**/*.test.{ts,tsx}"],
};