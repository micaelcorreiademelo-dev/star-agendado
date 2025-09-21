import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rotas que requerem autenticação
const protectedRoutes = [
  '/dashboard',
  '/store-admin',
  '/settings',
  '/api/protected'
]

// Rotas que são apenas para usuários não autenticados
const authOnlyRoutes = [
  '/login',
  '/store-login'
]

// Rotas públicas que não precisam de verificação
const publicRoutes = [
  '/',
  '/api/health',
  '/api/public'
]

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Verificar sessão atual
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthOnlyRoute = authOnlyRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))

  // Se é uma rota pública, permitir acesso
  if (isPublicRoute) {
    return res
  }

  // Se é uma rota de auth e o usuário já está logado, redirecionar
  if (isAuthOnlyRoute && session) {
    const user = session.user
    const role = user.app_metadata?.role
    const storeClaims = user.user_metadata?.store_claims

    // Redirecionar baseado no role
    if (role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    } else if (role === 'store_admin' && storeClaims?.length > 0) {
      return NextResponse.redirect(new URL(`/store-admin/${storeClaims[0]}`, req.url))
    } else {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Se é uma rota protegida e não há sessão, redirecionar para login
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Verificações específicas para rotas protegidas
  if (isProtectedRoute && session) {
    const user = session.user
    const role = user.app_metadata?.role
    const storeClaims = user.user_metadata?.store_claims || []

    // Verificar acesso ao dashboard (apenas admin ou store_admin)
    if (pathname.startsWith('/dashboard')) {
      if (role !== 'admin' && role !== 'store_admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }

    // Verificar acesso ao store-admin
    if (pathname.startsWith('/store-admin/')) {
      const storeIdMatch = pathname.match(/^\/store-admin\/([^\/]+)/)
      const requestedStoreId = storeIdMatch?.[1]

      if (!requestedStoreId) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }

      // Admin tem acesso a todas as lojas
      if (role === 'admin') {
        return res
      }

      // Store admin só tem acesso às suas lojas
      if (role === 'store_admin') {
        if (!storeClaims.includes(requestedStoreId)) {
          return NextResponse.redirect(new URL('/unauthorized', req.url))
        }
      } else {
        // Outros roles não têm acesso
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }

    // Verificar acesso às configurações (apenas admin)
    if (pathname.startsWith('/settings')) {
      if (role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url))
      }
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}