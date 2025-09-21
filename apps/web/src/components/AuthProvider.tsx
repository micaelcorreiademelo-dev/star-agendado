'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

// Tipos para o contexto de autenticação
export interface AuthUser extends User {
  role?: string
  store_id?: string
}

export interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  role: string | null
  storeIdClaims: string | null
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signInWithMagicLink: (email: string, redirectTo?: string) => Promise<{ data: any; error: any }>
  signInWithStore: (email: string, password: string, storeId: string, redirectTo?: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
  refreshSession: () => Promise<void>
}

// Contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

// Função para extrair claims do JWT
const extractClaimsFromUser = (user: User | null): { role: string | null; storeId: string | null } => {
  if (!user) {
    return { role: null, storeId: null }
  }

  // Extrair claims do app_metadata ou user_metadata
  const role = user.app_metadata?.role || user.user_metadata?.role || 'customer'
  const storeId = user.app_metadata?.store_id || user.user_metadata?.store_id || null

  return { role, storeId }
}

// Provider de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Extrair role e store_id dos claims
  const { role, storeId } = extractClaimsFromUser(user)

  useEffect(() => {
    // Obter sessão inicial
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Erro ao obter sessão inicial:', error)
        } else {
          setSession(session)
          if (session?.user) {
            const { role, storeId } = extractClaimsFromUser(session.user)
            setUser({
              ...session.user,
              role: role || undefined,
              store_id: storeId || undefined
            })
          }
        }
      } catch (error) {
        console.error('Erro inesperado ao obter sessão:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        setSession(session)
        
        if (session?.user) {
          const { role, storeId } = extractClaimsFromUser(session.user)
          setUser({
            ...session.user,
            role: role || undefined,
            store_id: storeId || undefined
          })
        } else {
          setUser(null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Função de login com email/password
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      return { data, error: null }
    } catch (error: any) {
      console.error('Erro no login:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Função de login com magic link
  const signInWithMagicLink = async (email: string, redirectTo?: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo || `${window.location.origin}/dashboard`,
        },
      })
      
      if (error) throw error
      
      return { data, error: null }
    } catch (error: any) {
      console.error('Erro no magic link:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Função de login específico para loja
  const signInWithStore = async (email: string, password: string, storeId: string, redirectTo?: string) => {
    try {
      setLoading(true)
      if (password) {
        // Login com senha
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error
        
        // Verificar se o usuário tem acesso à loja
        const hasStoreAccess = data.user?.user_metadata?.store_claims?.includes(storeId) || 
                              data.user?.app_metadata?.role === 'admin'
        
        if (!hasStoreAccess) {
          await supabase.auth.signOut()
          throw new Error('Você não tem acesso a esta loja')
        }
        
        return { data, error: null }
      } else {
        // Magic link
        const { data, error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: redirectTo,
            data: {
              store_id: storeId,
            },
          },
        })
        
        if (error) throw error
        
        return { data, error: null }
      }
    } catch (error: any) {
      console.error('Erro no login da loja:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Função de logout
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      
      if (!error) {
        setUser(null)
        setSession(null)
      }
      
      return { error }
    } catch (error) {
      console.error('Erro no logout:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  // Função para atualizar sessão
  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession()
      
      if (error) {
        console.error('Erro ao atualizar sessão:', error)
      } else {
        setSession(session)
        if (session?.user) {
          const { role, storeId } = extractClaimsFromUser(session.user)
          setUser({
            ...session.user,
            role: role || undefined,
            store_id: storeId || undefined
          })
        }
      }
    } catch (error) {
      console.error('Erro inesperado ao atualizar sessão:', error)
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    role,
    storeIdClaims: storeId,
    signIn,
    signInWithMagicLink,
    signInWithStore,
    signOut,
    refreshSession,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para verificar se o usuário tem uma role específica
export const useRole = (requiredRole: string) => {
  const { role } = useAuth()
  return role === requiredRole
}

// Hook para verificar se o usuário é admin
export const useIsAdmin = () => {
  const { role } = useAuth()
  return role === 'admin'
}

// Hook para verificar se o usuário tem acesso a uma loja específica
export const useStoreAccess = (storeId: string) => {
  const { role, storeIdClaims, user } = useAuth()
  
  // Admin tem acesso a tudo
  if (role === 'admin') return true
  
  // Store admin/staff precisam ter o store_id correto
  if (role === 'store_admin' || role === 'store_staff') {
    return storeIdClaims === storeId
  }
  
  // Para outros casos, verificar se é o proprietário da loja
  // Isso seria verificado no servidor via RLS
  return false
}

export default AuthProvider