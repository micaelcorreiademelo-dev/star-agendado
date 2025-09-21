# Star Agendado - Monorepo

Um monorepo moderno para o sistema Star Agendado, construído com Next.js, TypeScript e pnpm workspaces.

## 🚀 Estrutura do Projeto

```
├── apps/
│   └── web/                 # Aplicação Next.js principal
├── packages/
│   ├── ai/                  # Pacote de funcionalidades de IA
│   ├── lib/                 # Biblioteca compartilhada
│   └── ui/                  # Componentes de UI compartilhados
├── .github/
│   └── workflows/           # Pipelines de CI/CD
└── ...
```

## 🛠️ Tecnologias

- **Framework**: Next.js 14
- **Linguagem**: TypeScript
- **Gerenciador de Pacotes**: pnpm
- **Estilização**: Tailwind CSS
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **CI/CD**: GitHub Actions

## 📋 Pré-requisitos

- Node.js 18+
- pnpm 8+

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd "Projeto Trae"
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Execute o ambiente de desenvolvimento

```bash
pnpm dev
```

Isso iniciará:
- **Web App**: http://localhost:3000

### 4. Build para produção

```bash
pnpm build
```

## 📁 Workspaces

### apps/web
Aplicação Next.js principal com:
- Páginas de agendamento
- Dashboard administrativo
- Autenticação
- Integração com Supabase

### packages/ui
Componentes de UI reutilizáveis:
- Botões
- Formulários
- Modais
- Layouts

### packages/lib
Utilitários e funções compartilhadas:
- Validações
- Helpers de data
- Constantes

### packages/ai
Funcionalidades de IA:
- Processamento de linguagem natural
- Análise de sentimentos
- Recomendações

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Executar testes com coverage
pnpm test:coverage
```

## 🔧 Linting e Formatação

```bash
# Verificar linting
pnpm lint

# Corrigir problemas de linting
pnpm lint:fix

# Verificar formatação
pnpm format:check

# Formatar código
pnpm format
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Docker

```bash
# Build da imagem
docker build -t star-agendado .

# Executar container
docker run -p 3000:3000 star-agendado
```

## 🔐 Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
cp .env.example .env.local
```

Variáveis necessárias:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Convenções

### Commits
Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` tarefas de manutenção

### Branches
- `main`: branch principal
- `develop`: branch de desenvolvimento
- `feature/*`: novas funcionalidades
- `fix/*`: correções
- `hotfix/*`: correções urgentes

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Para suporte, entre em contato através do email: suporte@staragendado.com

---

⭐ **Star Agendado** - Transformando a gestão de agendamentos