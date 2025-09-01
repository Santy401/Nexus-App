import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ 
      message: 'Sesión cerrada correctamente',
      redirect: '/auth/login'  
    });
    
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
    return NextResponse.json(
      { 
        message: 'Error al cerrar sesión',
        redirect: '/auth/login'  
      },
      { status: 500 }
    );
  }
}
