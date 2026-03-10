'use client';

import { useActionState, useEffect, useState } from 'react';
import {
  deleteUserAccount,
  type TypeDeleteUserAccount,
} from '@/src/app/(app)/settings/_actions/index';
import { toast } from 'sonner';

const initialState: TypeDeleteUserAccount = { message: null, success: false };

export default function DeleteAccountForm() {
  const [check, setCheck] = useState<boolean>(false);
  const [state, formAction, isPending] = useActionState(
    deleteUserAccount,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="space-y-4 p-6">
        <p className="text-sm text-gray-700">
          Una vez que elimines tu cuenta, se borrarán todos tus enlaces y datos
          de forma permanente. <br />
          Esta acción no se puede deshacer.
        </p>

        <div className="flex items-center space-x-3 pt-2">
          <input
            type="checkbox"
            id="confirmDelete"
            name="confirmDelete"
            onChange={(e) => setCheck(e.target.checked)}
            required
            className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
          />
          <label
            htmlFor="confirmDelete"
            className="text-sm font-medium text-gray-700"
          >
            Confirmo que quiero eliminar mi cuenta y todos mis datos
            definitivamente.
          </label>
        </div>

        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
      </div>

      <div className="flex items-center justify-end rounded-b-xl border-t px-6 py-4">
        <button
          type="submit"
          disabled={!check || isPending}
          className={`cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors ${!check ? 'disabled:cursor-not-allowed disabled:opacity-50' : 'hover:bg-red-700'} `}
        >
          {isPending ? 'Procesando...' : 'Eliminar Cuenta'}
        </button>
      </div>
    </form>
  );
}
