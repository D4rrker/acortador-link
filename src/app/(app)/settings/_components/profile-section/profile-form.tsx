'use client';

import { useActionState, useState, useEffect } from 'react';
import {
  updateUserProfile,
  type TypeUpdateUserProfile,
} from '@/src/app/(app)/settings/_actions/index';
import { TIMEZONES_LIST } from '@/src/app/(app)/settings/_lib/timezones';
import { toast } from 'sonner';

interface ProfileFormProps {
  initialName: string;
  initialEmail: string;
  initialTimezone: string;
}

const initialState: TypeUpdateUserProfile = {
  message: null,
  errors: {},
  success: false,
};

export default function ProfileForm({
  initialName,
  initialEmail,
  initialTimezone,
}: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateUserProfile,
    initialState
  );

  const [name, setName] = useState(initialName);
  const [timezone, setTimezone] = useState(initialTimezone);

  const safeTimezonesList = TIMEZONES_LIST.includes(initialTimezone)
    ? TIMEZONES_LIST
    : [...TIMEZONES_LIST, initialTimezone].sort();

  const hasChanges = name !== initialName || timezone !== initialTimezone;

  useEffect(() => {
    if (state.success && state.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} key={`${initialName}-${initialTimezone}`}>
      <div className="space-y-5 p-6">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Correo (Solo lectura)
          </label>
          <input
            id="email"
            type="email"
            defaultValue={initialEmail}
            disabled
            className="block w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="timezone" className="text-sm font-medium">
            Zona Horaria
          </label>
          <select
            id="timezone"
            name="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            {safeTimezonesList.map((tz) => (
              <option key={tz} value={tz}>
                {tz.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end rounded-b-xl border-t border-gray-200 bg-gray-50 px-6 py-4">
        <button
          type="submit"
          disabled={!hasChanges || isPending}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </form>
  );
}
