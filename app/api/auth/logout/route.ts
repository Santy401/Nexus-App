import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Sesión cerrada correctamente' });
    
    // Eliminar la cookie de autenticación
    response.cookies.set({
      name: 'auth-token',
      value: '',
      expires: new Date(0), // Fecha en el pasado para eliminar la cookie
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return NextResponse.json(
      { message: 'Error al cerrar sesión' },
      { status: 500 }
    );
  }
}
