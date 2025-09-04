import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validación básica
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Datos de credenciales a codigo
    if (email === 'santiprocastellar7@gmail.com' && password === 'Santy401') {
      const response = NextResponse.json({ 
        message: 'Inicio de sesión exitoso',
        user: { email, name: 'Administrador' }
      });

      // Establecer cookie HTTP-Only 
      response.cookies.set({
        name: 'auth-token',
        value: 'dummy-auth-token',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 semana
      });

      return response;
    }

    return NextResponse.json(
      { message: 'Credenciales inválidas' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json(
      { message: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
