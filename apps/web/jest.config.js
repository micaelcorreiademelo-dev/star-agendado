/** @type {import('jest').Config} */
const config = {
  // Ambiente de teste
  testEnvironment: 'node',

  // Extensões de arquivo para testes
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],

  // Transformações para TypeScript
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        module: 'esnext',
        target: 'es2020'
      }
    }]
  },

  // Extensões de módulo
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Mapeamento de módulos para resolver imports com @
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Configuração de cobertura
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/node_modules/**'
  ],

  // Diretório de cobertura
  coverageDirectory: 'coverage',

  // Relatórios de cobertura
  coverageReporters: ['text', 'lcov', 'html'],

  // Limites de cobertura
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },

  // Setup de testes
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Limpar mocks automaticamente
  clearMocks: true,

  // Restaurar mocks automaticamente
  restoreMocks: true,

  // Verbose para output detalhado
  verbose: true,

  // Timeout para testes
  testTimeout: 10000
}

module.exports = config