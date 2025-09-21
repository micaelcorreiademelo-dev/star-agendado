/**
 * Cliente Supabase para uso no browser
 * 
 * Este cliente é seguro para uso no frontend, utilizando apenas a anon key.
 * Nunca exponha a service_role key no código do cliente.
 */

import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Validação das variáveis de ambiente obrigatórias
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL não está definida. ' +
    'Verifique seu arquivo .env.local'
  )
}

if (!supabaseAnonKey) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida. ' +
    'Verifique seu arquivo .env.local'
  )
}

// Verificar se estamos usando valores de placeholder
const isPlaceholder = supabaseUrl.includes('placeholder.supabase.co')

if (isPlaceholder) {
  console.warn(
    '⚠️  Usando configuração de placeholder do Supabase. ' +
    'Para funcionalidade completa, configure um projeto real em .env.local'
  )
}

/**
 * Cliente Supabase configurado com tipos TypeScript
 * 
 * Características:
 * - Usa anon key (seguro para browser)
 * - Tipos TypeScript automáticos
 * - Configurações de timeout e retry
 * - Suporte a RLS (Row Level Security)
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configurações de autenticação
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    // Configurações de rede
    headers: {
      'X-Client-Info': 'star-agendado-web',
    },
  },
  db: {
    // Configurações do banco
    schema: 'public',
  },
  realtime: {
    // Configurações de tempo real
    params: {
      eventsPerSecond: 10,
    },
  },
})

/**
 * Função utilitária para verificar se o cliente está conectado
 */
export const isSupabaseConnected = async (): Promise<boolean> => {
  // Se estamos usando placeholder, retornar false sem tentar conectar
  if (isPlaceholder) {
    return false
  }
  
  try {
    const { data, error } = await supabase
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
 * Função utilitária para obter informações da sessão atual
 */
export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Erro ao obter sessão:', error.message)
      return null
    }
    
    return session
  } catch (error) {
    console.error('Erro inesperado ao obter sessão:', error)
    return null
  }
}

/**
 * Função utilitária para obter o usuário atual
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Erro ao obter usuário:', error.message)
      return null
    }
    
    return user
  } catch (error) {
    console.error('Erro inesperado ao obter usuário:', error)
    return null
  }
}

/**
 * Tipos auxiliares para uso em componentes
 */
export type SupabaseClient = typeof supabase
export type SupabaseSession = Awaited<ReturnType<typeof getCurrentSession>>
export type SupabaseUser = Awaited<ReturnType<typeof getCurrentUser>>

// Export default para compatibilidade
export default supabase