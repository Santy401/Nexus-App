import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const response = NextResponse.redirect(new URL('/ui/pages/auth/login', request.url));
    
    // Eliminar la cookie de autenticación
    response.cookies.set({
      name: 'auth-token',
      value: '',
      expires: new Date(0), 
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return NextResponse.redirect(new URL('/ui/pages/auth/login', request.url));
  }
}
