'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'

export default function UnauthorizedPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleGoBack = () => {
    if (user) {
      const role = user.app_metadata?.role
      const storeClaims = user.user_metadata?.store_claims

      // Redirecionar baseado no role
      if (role === 'admin') {
        router.push('/dashboard')
      } else if (role === 'store_admin' && storeClaims?.length > 0) {
        router.push(`/store-admin/${storeClaims[0]}`)
      } else {
        router.push('/dashboard')
      }
    } else {
      router.push('/login')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
          </svg>
        </div>
        
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Acesso Negado
        </h2>
        
        <p className="mt-2 text-sm text-gray-600">
          Você não tem permissão para acessar esta página.
        </p>

        {user && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Usuário:</strong> {user.email}
            </p>
            <p className="text-sm text-blue-800">
              <strong>Role:</strong> {user.app_metadata?.role || 'Não definido'}
            </p>
            {user.user_metadata?.store_claims && (
              <p className="text-sm text-blue-800">
                <strong>Lojas:</strong> {user.user_metadata.store_claims.join(', ')}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar à página inicial
          </button>
          
          {user && (
            <button
              onClick={handleSignOut}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Fazer logout
            </button>
          )}
        </div>

        <div className="mt-6">
          <p className="text-xs text-gray-500">
            Se você acredita que deveria ter acesso a esta página, entre em contato com o administrador do sistema.
          </p>
        </div>
      </div>
    </div>
  )
}