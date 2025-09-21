'use client'

import React from 'react'
import { useAuth } from '@/components/AuthProvider'
import { PageSkeleton } from '@/components/ui/PageSkeleton'

export default function DashboardPage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const role = user.app_metadata?.role
  const storeClaims = user.user_metadata?.store_claims || []

  const breadcrumbItems = [
    { label: 'Dashboard', current: true }
  ]

  const tasks = [
    {
      id: 'overview-cards',
      title: 'Cards de visão geral',
      description: 'Métricas principais: agendamentos, receita, clientes'
    },
    {
      id: 'recent-bookings',
      title: 'Agendamentos recentes',
      description: 'Lista dos últimos agendamentos realizados'
    },
    {
      id: 'revenue-chart',
      title: 'Gráfico de receita',
      description: 'Visualização da receita ao longo do tempo'
    },
    {
      id: 'quick-actions',
      title: 'Ações rápidas',
      description: 'Botões para ações comuns: novo agendamento, etc.'
    },
    {
      id: 'notifications',
      title: 'Central de notificações',
      description: 'Alertas e lembretes importantes'
    }
  ]

  return (
    <PageSkeleton
      title="Dashboard"
      description="Visão geral do seu negócio"
      breadcrumbItems={breadcrumbItems}
      tasks={tasks}
    >
      {/* Header com informações do usuário */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Bem-vindo, {user.email}
              </h3>
              <p className="text-sm text-gray-600">
                Role: {role} | Lojas: {storeClaims.length}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Bem-vindo ao Dashboard!
          </h2>
          
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Informações do Usuário
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1 text-sm text-gray-900">{role || 'Não definido'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">ID do Usuário</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">{user.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Lojas Associadas</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {storeClaims.length > 0 ? storeClaims.join(', ') : 'Nenhuma'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Metadata adicional */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-md font-medium text-gray-900 mb-3">
              Metadata Completa
            </h4>
            <div className="text-left">
              <pre className="text-xs text-gray-600 bg-white p-4 rounded border overflow-auto">
                {JSON.stringify({
                  app_metadata: user.app_metadata,
                  user_metadata: user.user_metadata,
                  created_at: user.created_at,
                  last_sign_in_at: user.last_sign_in_at
                }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </PageSkeleton>
  )
}