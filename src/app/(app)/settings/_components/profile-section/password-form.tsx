'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import {
  updateUserPassword,
  type TypeUpdateUserPassword,
} from '@/src/app/(app)/settings/_actions/';
import { toast } from 'sonner';

const initialState: TypeUpdateUserPassword = { message: '', success: false };

export default function PasswordForm() {
  const [passwState, setPasswState] = useState({
    password: '',
    confirmPassword: '',
    isReady: false,
  });

  const [state, formAction, isPending] = useActionState(
    updateUserPassword,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state?.success === false && state?.message) {
      toast.error(state.message);
    }
  }, [state]);

  const isReady =
    passwState.password.trim() !== '' &&
    passwState.password.length >= 6 &&
    passwState.password === passwState.confirmPassword;

  return (
    <form action={formAction}>
      <div className="space-y-5 p-6">
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Nueva Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) =>
              setPasswState((prev) => ({ ...prev, password: e.target.value }))
            }
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={(e) =>
              setPasswState((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            required
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm transition-colors outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {state?.errors?.confirmPassword && (
            <p className="text-sm text-red-500">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end rounded-b-xl border-t border-gray-200 bg-gray-50 px-6 py-4">
        <button
          type="submit"
          disabled={!isReady || isPending}
          className={`cursor-pointer rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors ${isReady ? 'hover:bg-zinc-800' : 'disabled:cursor-not-allowed disabled:opacity-50'}`}
        >
          {isPending ? 'Actualizando...' : 'Actualizar Contraseña'}
        </button>
      </div>
    </form>
  );
}
