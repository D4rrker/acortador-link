import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Revisa tu correo | TuSaaS',
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function VerifyEmailPage({ searchParams }: Props) {
  const params = await searchParams;
  const email = params.email as string | undefined;

  if (!email) {
    redirect('/register');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-xl border border-gray-100 bg-white p-8 text-center shadow-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <span className="text-2xl text-blue-600">✉️</span>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Revisa tu bandeja de entrada
        </h1>

        <p className="mb-6 text-gray-600">
          Te hemos enviado un enlace mágico para confirmar tu cuenta. Haz clic
          en él para activar tu acceso al panel.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            ¿No lo encuentras? Revisa tu carpeta de spam o correo no deseado.
          </p>

          <Link
            href="/login"
            className="inline-block text-sm font-medium text-black underline hover:text-gray-700"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
