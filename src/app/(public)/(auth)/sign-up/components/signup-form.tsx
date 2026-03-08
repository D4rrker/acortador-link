'use client';

import { useActionState } from 'react';
import { signUp, type AuthState } from '@/src/actions/auth/actions';
import Link from 'next/link';

const initialState: AuthState = {
  message: '',
  errors: {} as Record<string, string[]>,
};

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  return (
    <form action={formAction} className="w-full space-y-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-slate-700">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors outline-none placeholder:text-slate-400 focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
        />
        {state?.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Correo Electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors outline-none placeholder:text-slate-400 focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
        />
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
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
          placeholder="••••••••"
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors outline-none placeholder:text-slate-400 focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
        />
        {state?.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password[0]}</p>
        )}
      </div>

      {state?.message && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        title="Registrarse"
        className="w-full cursor-pointer rounded-md bg-blue-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? 'Creando cuenta...' : 'Registrarse'}
      </button>

      <div className="mt-4 text-center text-sm text-slate-600">
        ¿Ya tienes cuenta?{' '}
        <Link
          href="/login"
          title="Iniciar sesión"
          className="font-medium text-blue-900 transition-colors hover:text-blue-800 hover:underline"
        >
          Inicia sesión
        </Link>
      </div>
    </form>
  );
}
