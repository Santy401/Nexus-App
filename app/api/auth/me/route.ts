import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const authToken = cookieHeader
      .split('; ')
      .find((row: string) => row.startsWith('auth-token='))
      ?.split('=')[1];
    
    if (!authToken) {
      return NextResponse.json(
        { message: 'No autenticado' },
        { status: 401 }
      );
    }

    // En una aplicación real, aquí validarías el token con tu base de datos
    // y devolverías la información del usuario
    return NextResponse.json({
      name: 'Administrador',
      email: 'admin@example.com'
    });

  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    return NextResponse.json(
      { message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
