import { PageSkeleton } from '@/components/ui/PageSkeleton'
import { Metadata } from 'next'

interface CustomerBookingPageProps {
  params: {
    storeId: string
  }
}

export async function generateMetadata({ params }: CustomerBookingPageProps): Promise<Metadata> {
  return {
    title: `Agendamento - Loja ${params.storeId}`,
    description: 'Faça seu agendamento de forma rápida e fácil',
  }
}

export default function CustomerBookingPage({ params }: CustomerBookingPageProps) {
  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Agendamento', current: true }
  ]

  const tasks = [
    {
      id: 'store-info',
      title: 'Exibir informações da loja',
      description: 'Nome, endereço, horários de funcionamento'
    },
    {
      id: 'service-selection',
      title: 'Seleção de serviços',
      description: 'Lista de serviços disponíveis com preços'
    },
    {
      id: 'professional-selection',
      title: 'Escolha do profissional',
      description: 'Lista de profissionais disponíveis (opcional)'
    },
    {
      id: 'datetime-picker',
      title: 'Seletor de data e horário',
      description: 'Calendar com horários disponíveis'
    },
    {
      id: 'customer-form',
      title: 'Formulário do cliente',
      description: 'Dados pessoais para o agendamento'
    },
    {
      id: 'booking-confirmation',
      title: 'Confirmação do agendamento',
      description: 'Resumo e confirmação final'
    },
    {
      id: 'payment-integration',
      title: 'Integração de pagamento',
      description: 'Processamento de pagamento (se necessário)'
    }
  ]

  return (
    <PageSkeleton
      title={`Agendamento - Loja ${params.storeId}`}
      description="Página pública para clientes realizarem agendamentos"
      breadcrumbItems={breadcrumbItems}
      tasks={tasks}
    >
      {/* Conteúdo temporário da página de agendamento */}
      <div className="space-y-6">
        {/* Store Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            Informações da Loja
          </h3>
          <p className="text-blue-700">
            <strong>ID da Loja:</strong> {params.storeId}
          </p>
          <p className="text-blue-700 mt-1">
            Esta página permitirá que clientes façam agendamentos diretamente.
          </p>
        </div>

        {/* Booking Steps Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">1. Escolher Serviço</h4>
            <p className="text-sm text-gray-600">
              Seleção do serviço desejado
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">2. Data e Horário</h4>
            <p className="text-sm text-gray-600">
              Escolha da data e horário disponível
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">3. Confirmação</h4>
            <p className="text-sm text-gray-600">
              Dados pessoais e confirmação
            </p>
          </div>
        </div>

        {/* Demo Actions */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-green-900 mb-4">
            Ações de Demonstração
          </h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Simular Agendamento
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Ver Horários Disponíveis
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Listar Serviços
            </button>
          </div>
        </div>
      </div>
    </PageSkeleton>
  )
}