'use client';

import { useActionState } from 'react';
import { login, type AuthState } from '@/src/actions/auth/actions';
import Link from 'next/link';

const initialState: AuthState = {
  message: null,
  errors: {},
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="w-full max-w-md space-y-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm transition-colors outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
        />
      </div>

      <div className="relative flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-700"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm transition-colors outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
        />
        {state?.errors?.password && (
          <p className="absolute -bottom-6 text-sm text-red-500">
            {state.errors.password[0]}
          </p>
        )}

        {state?.message && (
          <div className="absolute -bottom-6 rounded-md text-sm text-red-600">
            {state.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-4 w-full rounded-md bg-blue-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-900 disabled:opacity-50"
      >
        {isPending ? 'Iniciando sesión...' : 'Entrar'}
      </button>

      <div className="mt-4 text-center text-sm text-slate-600">
        ¿No tienes cuenta?{' '}
        <Link
          href="/sign-up"
          className="font-medium text-blue-900 transition-colors hover:text-blue-800 hover:underline"
        >
          Regístrate
        </Link>
      </div>
    </form>
  );
}
