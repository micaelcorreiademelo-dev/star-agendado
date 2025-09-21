/**
 * Configuração global para testes Jest
 * 
 * Este arquivo é executado antes de cada teste e configura
 * o ambiente de teste, mocks globais e utilitários.
 */

// Configurar variáveis de ambiente para testes
process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'

// Mock global para console.error em testes
const originalError = console.error
beforeEach(() => {
  console.error = jest.fn()
})

afterEach(() => {
  console.error = originalError
})

// Configurar timeout global para testes assíncronos
jest.setTimeout(10000)

// Mock para fetch global (caso necessário)
global.fetch = jest.fn()

// Utilitários de teste globais
global.testUtils = {
  // Função para criar dados de teste
  createMockAppointment: (overrides = {}) => ({
    id: 'test-appointment-id',
    store_id: 'test-store-id',
    service_id: 'test-service-id',
    professional_id: 'test-professional-id',
    customer_name: 'Test Customer',
    customer_phone: '11999999999',
    starts_at: '2024-12-25T10:00:00Z',
    ends_at: '2024-12-25T11:00:00Z',
    status: 'scheduled',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    ...overrides
  }),

  // Função para criar dados de loja de teste
  createMockStore: (overrides = {}) => ({
    id: 'test-store-id',
    name: 'Test Store',
    email: 'test@store.com',
    phone: '11999999999',
    address: 'Test Address, 123',
    owner_user_id: 'test-user-id',
    default_plan_id: 'test-plan-id',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    ...overrides
  }),

  // Função para criar configurações de teste
  createMockSettings: (overrides = {}) => ({
    id: '00000000-0000-0000-0000-000000000001',
    support_email: 'support@test.com',
    terms_url: 'https://test.com/terms',
    privacy_url: 'https://test.com/privacy',
    default_plan_id: 'test-plan-id',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    ...overrides
  })
}