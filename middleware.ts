import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas públicas que no requieren autenticación
const publicPaths = [
  '/',
  '/ui/pages/auth/login',
  '/ui/pages/auth/register',
  '/infraestructure/api/auth',
  '/api/auth',  // Mantener compatibilidad con rutas antiguas
  '/_next',
  '/favicon.ico',
  '/ui/dashboard'  // Añadir dashboard temporalmente para depuración
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  // Si es una ruta pública, permitir el acceso
  const isPublicPath = publicPaths.some(publicPath =>
    pathname.startsWith(publicPath)
  );

  // Si el usuario está autenticado y está en una ruta de autenticación, redirigir al dashboard
  if (pathname.startsWith('/ui/pages/auth') && token) {
    return NextResponse.redirect(new URL('/ui/dashboard', request.url));
  }

  // Si el usuario está autenticado y está en la raíz, redirigir al dashboard
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/ui/dashboard', request.url));
  }

  // Si no es una ruta pública y no hay token, redirigir al login
  if (!isPublicPath && !token) {
    console.log('Redirigiendo a login desde:', pathname);
    const loginUrl = new URL('/ui/pages/auth/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si el usuario está autenticado, permitir el acceso a la ruta solicitada
  if (token) {
    return NextResponse.next();
  }

  // Redirigir la raíz al dashboard si el usuario está autenticado
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/ui/dashboard', request.url));
  }

  // Redirigir la raíz al login si el usuario no está autenticado
  if ((pathname === '/' || pathname === '') && !token) {
    console.log('Redirigiendo raíz a login');
    return NextResponse.redirect(new URL('/ui/pages/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
