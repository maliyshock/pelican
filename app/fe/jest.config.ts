const config = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
