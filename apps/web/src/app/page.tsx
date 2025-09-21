import { PageSkeleton } from '@/components/ui/PageSkeleton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StarAgendado - SaaS de Agendamentos',
  description: 'Plataforma completa para gestão de agendamentos e reservas',
}

export default function HomePage() {
  const tasks = [
    {
      id: 'hero-section',
      title: 'Implementar seção hero principal',
      description: 'Banner com call-to-action e apresentação do produto'
    },
    {
      id: 'features-section',
      title: 'Criar seção de funcionalidades',
      description: 'Destacar principais recursos da plataforma'
    },
    {
      id: 'pricing-section',
      title: 'Adicionar seção de preços',
      description: 'Tabela de planos e preços'
    },
    {
      id: 'testimonials',
      title: 'Seção de depoimentos',
      description: 'Feedback de clientes satisfeitos'
    },
    {
      id: 'cta-footer',
      title: 'Call-to-action final',
      description: 'Botão para começar gratuitamente'
    }
  ]

  return (
    <PageSkeleton
      title="StarAgendado"
      description="SaaS de agendamentos em desenvolvimento - Página inicial pública"
      tasks={tasks}
    >
      {/* Conteúdo temporário da landing page */}
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Bem-vindo ao StarAgendado
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Plataforma completa para gestão de agendamentos
        </p>
        
        <div className="flex items-center justify-center gap-x-6">
          <a
            href="/login"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Fazer Login
          </a>
          <a href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
            Dashboard <span aria-hidden="true">→</span>
          </a>
        </div>
        
        <div className="mt-6">
          <a
            href="/store-login/demo"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login por Loja (Demo)
          </a>
        </div>
      </div>
    </PageSkeleton>
  )
}