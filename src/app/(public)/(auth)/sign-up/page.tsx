import { SignupForm } from '@/src/app/(public)/(auth)/sign-up/components/signup-form';
import { Metadata } from 'next';
import CsCard from '@/src/components/custom/Card';

export const metadata: Metadata = {
  title: 'Crear Cuenta | LinkPro',
  description: 'Únete a la plataforma líder de acortamiento de enlaces.',
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6">
      <CsCard className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Crear una cuenta
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Empieza a optimizar tus enlaces hoy mismo.
          </p>
        </div>

        <SignupForm />
      </CsCard>
    </div>
  );
}
