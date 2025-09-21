import { PageSkeleton } from '@/components/ui/PageSkeleton'

export default function AffiliatesPage() {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Afiliados', current: true }
  ]

  const tasks = [
    {
      id: 'affiliate-dashboard',
      title: 'Dashboard de afiliados',
      description: 'Métricas gerais do programa de afiliados'
    },
    {
      id: 'affiliate-list',
      title: 'Lista de afiliados',
      description: 'Gerenciar afiliados ativos, pendentes e inativos'
    },
    {
      id: 'commission-structure',
      title: 'Estrutura de comissões',
      description: 'Configurar percentuais e regras de comissão'
    },
    {
      id: 'payment-management',
      title: 'Gestão de pagamentos',
      description: 'Processar pagamentos e histórico de comissões'
    },
    {
      id: 'affiliate-materials',
      title: 'Materiais de marketing',
      description: 'Links, banners e recursos para afiliados'
    },
    {
      id: 'performance-tracking',
      title: 'Tracking de performance',
      description: 'Relatórios de conversão e analytics'
    }
  ]

  return (
    <PageSkeleton
      title="Programa de Afiliados"
      description="Gerencie parceiros e acompanhe performance do programa"
      breadcrumbItems={breadcrumbItems}
      tasks={tasks}
    >
      {/* Program Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-3-3h-1m-1-3.5a2.5 2.5 0 11-5 0m5 0a2.5 2.5 0 11-5 0m5 0v3.5M6 20h5v-2a3 3 0 00-3-3H7m-1-3.5a2.5 2.5 0 11-5 0m5 0a2.5 2.5 0 11-5 0m5 0v3.5" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-blue-600">127</div>
              <div className="text-sm text-blue-700">Afiliados Ativos</div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-green-600">R$ 18.5k</div>
              <div className="text-sm text-green-700">Comissões Este Mês</div>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-purple-600">3.2%</div>
              <div className="text-sm text-purple-700">Taxa de Conversão</div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-orange-600">R$ 2.1k</div>
              <div className="text-sm text-orange-700">Ticket Médio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Affiliates */}
      <div className="bg-white border border-gray-200 rounded-lg mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Top Afiliados</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: 'João Silva', sales: 47, commission: 'R$ 3.2k', conversion: '4.2%' },
              { name: 'Maria Santos', sales: 38, commission: 'R$ 2.8k', conversion: '3.8%' },
              { name: 'Pedro Costa', sales: 31, commission: 'R$ 2.1k', conversion: '3.1%' },
              { name: 'Ana Oliveira', sales: 28, commission: 'R$ 1.9k', conversion: '2.9%' },
              { name: 'Carlos Lima', sales: 24, commission: 'R$ 1.6k', conversion: '2.4%' }
            ].map((affiliate, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {affiliate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{affiliate.name}</div>
                    <div className="text-sm text-gray-500">{affiliate.sales} vendas</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{affiliate.commission}</div>
                    <div className="text-sm text-gray-500">Comissão</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{affiliate.conversion}</div>
                    <div className="text-sm text-gray-500">Conversão</div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="bg-white border border-gray-200 rounded-lg mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Estrutura de Comissões</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">15%</div>
              <div className="text-sm text-blue-700 mb-2">Plano Básico</div>
              <div className="text-xs text-gray-600">R$ 29,90/mês</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">20%</div>
              <div className="text-sm text-green-700 mb-2">Plano Profissional</div>
              <div className="text-xs text-gray-600">R$ 99,90/mês</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">25%</div>
              <div className="text-sm text-purple-700 mb-2">Plano Enterprise</div>
              <div className="text-xs text-gray-600">R$ 299,90/mês</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Atividade Recente</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'Nova venda', affiliate: 'João Silva', amount: 'R$ 99,90', time: '2 min atrás' },
              { action: 'Pagamento processado', affiliate: 'Maria Santos', amount: 'R$ 2.8k', time: '1 hora atrás' },
              { action: 'Novo afiliado', affiliate: 'Pedro Costa', amount: '-', time: '3 horas atrás' },
              { action: 'Nova venda', affiliate: 'Ana Oliveira', amount: 'R$ 29,90', time: '5 horas atrás' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-500">{activity.affiliate}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{activity.amount}</div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSkeleton>
  )
}