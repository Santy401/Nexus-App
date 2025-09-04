"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FeedNavbar } from '@/app/ui/components/FeedNavbar';
import { FeedRight } from '@/app/ui/components/FeedRight';
import { FeedHome } from '@/app/ui/components/FeedHome';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{name?: string, email?: string} | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/infraestructure/api/auth/me', {
      credentials: 'include'
    });
        if (!response.ok) {
          throw new Error('No autenticado');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4">

        {/* Columna de la izquierda */}
      <div className="text-center"><FeedNavbar /></div>

        {/* Columna central */}
      <div className="text-center"><FeedHome /></div>

        {/* Columna de la derecha */}
      <div className="text-center"><FeedRight /></div>

      {/* <form action="/api/auth/logout" method="POST" className="mt-6">
            <button 
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Cerrar Sesión
            </button>
          </form> */}
    </div>
  );
}
