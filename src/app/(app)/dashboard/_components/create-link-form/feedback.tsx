import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import type { LinkState } from '@/src/app/(app)/dashboard/_actions/links';

export function FormStatus({ state }: { state: LinkState }) {
  const isSuccess = state?.message && !state?.errors;
  const isError = state?.message && state?.errors;

  if (isSuccess) {
    return (
      <span className="animate-in fade-in slide-in-from-bottom-2 inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
        <CheckCircle2 size={14} className="text-green-600" />
        {state.message}
      </span>
    );
  }

  if (isError) {
    return (
      <span className="animate-in fade-in slide-in-from-bottom-2 inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
        <AlertCircle size={14} className="shrink-0 text-red-600" />
        {state.message}
      </span>
    );
  }

  return null;
}

export function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="flex cursor-pointer items-center gap-2 rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-gray-900/10 transition-all hover:bg-black hover:shadow-gray-900/20 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Acortando...
        </span>
      ) : (
        'Acortar Enlace'
      )}
      {!isPending && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}
