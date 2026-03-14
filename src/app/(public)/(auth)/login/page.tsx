import { LoginForm } from '@/src/app/(public)/(auth)/login/components/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Accede a tu cuenta de LinkPro para gestionar tus enlaces.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Bienvenido de nuevo
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
