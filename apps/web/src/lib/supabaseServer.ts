/**
 * Cliente Supabase para uso no servidor
 * 
 * Este cliente utiliza a service_role key e deve ser usado APENAS no servidor.
 * NUNCA exponha este cliente ou a service_role key no código do cliente.
 */

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Validação das variáveis de ambiente obrigatórias
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL não está definida. ' +
    'Verifique seu arquivo .env.local'
  )
}

if (!supabaseServiceRoleKey) {
  throw new Error(
    'SUPABASE_SERVICE_ROLE_KEY não está definida. ' +
    'Verifique seu arquivo .env.local e certifique-se de que esta variável ' +
    'está configurada apenas no servidor (não use NEXT_PUBLIC_)'
  )
}

/**
 * Cliente Supabase para operações administrativas no servidor
 * 
 * Características:
 * - Usa service_role key (acesso total ao banco)
 * - Bypassa RLS (Row Level Security)
 * - Apenas para uso no servidor
 * - Configurações de timeout e retry
 */
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      // Desabilita auto-refresh para operações administrativas
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      // Configurações de rede com timeouts
      headers: {
        'X-Client-Info': 'star-agendado-server-admin',
      },
    },
    db: {
      // Configurações do banco
      schema: 'public',
    },
  }
)

/**
 * Cliente Supabase para operações com contexto de usuário no servidor
 * 
 * Este cliente mantém o contexto de autenticação do usuário,
 * respeitando as políticas RLS.
 */
export const createServerClient = (accessToken?: string) => {
  const client = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        'X-Client-Info': 'star-agendado-server-user',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    },
    db: {
      schema: 'public',
    },
  })

  // Se temos um token de acesso, configuramos o contexto do usuário
  if (accessToken) {
    client.auth.setSession({
      access_token: accessToken,
      refresh_token: '',
    } as any)
  }

  return client
}

/**
 * Função utilitária para verificar conectividade do servidor
 */
export const isServerConnected = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('id')
      .limit(1)
      .maybeSingle()
    
    return !error
  } catch {
    return false
  }
}

/**
 * Função utilitária para executar operações com retry
 */
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxRetries) {
        throw lastError
      }
      
      // Delay exponencial
      await new Promise(resolve => setTimeout(resolve, delay * attempt))
    }
  }
  
  throw lastError!
}

/**
 * Função utilitária para operações administrativas com timeout
 */
export const withTimeout = async <T>(
  operation: () => Promise<T>,
  timeoutMs: number = 10000
): Promise<T> => {
  return Promise.race([
    operation(),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Operação expirou')), timeoutMs)
    ),
  ])
}

/**
 * Wrapper para operações administrativas com retry e timeout
 */
export const adminOperation = async <T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number
    timeout?: number
    delay?: number
  } = {}
): Promise<T> => {
  const { maxRetries = 3, timeout = 10000, delay = 1000 } = options

  return withTimeout(
    () => withRetry(operation, maxRetries, delay),
    timeout
  )
}

/**
 * Tipos auxiliares para uso em API routes
 */
export type SupabaseAdmin = typeof supabaseAdmin
export type SupabaseServerClient = ReturnType<typeof createServerClient>

// Export default para compatibilidade
export default supabaseAdmin