'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, ChevronsUpDown, Search, BarChart3 } from 'lucide-react';
import { clsx } from 'clsx';
import type { TUserPlans } from '@/src/app/(app)/dashboard/_types/types';
import { toast } from 'sonner';

type SimpleLink = {
  id: string;
  short_code: string;
  original_url: string;
};

interface AnalyticsFilter {
  links: SimpleLink[];
  plan: TUserPlans;
}

export function AnalyticsFilter({ links, plan }: AnalyticsFilter) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCode = searchParams.get('code');
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const isPro = plan === 'pro';

  // Más adelante habrá que hacerlo (server-side), pero por ahora lo hacemos (client-side) para no complicar el código
  const filteredLinks =
    query === ''
      ? links
      : links.filter(
          (link) =>
            link.short_code.toLowerCase().includes(query.toLowerCase()) ||
            link.original_url.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (code: string | null) => {
    setIsOpen(false);
    setQuery('');
    if (!isPro && code) {
      toast.info('Actualiza al plan PRO para usar esta función.', {
        position: 'top-center',
      });
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (code) {
      params.set('code', code);
    } else {
      params.delete('code');
    }

    router.push(`/analytics?${params.toString()}`);
  };

  const selectedLink = links.find((l) => l.short_code === activeCode);

  return (
    <div className="relative w-full md:w-72">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm transition-all hover:border-blue-300 hover:ring-2 hover:ring-blue-100 focus:outline-none"
      >
        <div className="flex items-center gap-2 truncate">
          <div
            className={clsx(
              'flex h-6 w-6 items-center justify-center rounded-md',
              activeCode
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-500'
            )}
          >
            <BarChart3 size={14} />
          </div>
          <span className="truncate font-medium text-gray-700">
            {selectedLink
              ? `/${selectedLink.short_code}`
              : 'Vista General (Todos)'}
          </span>
        </div>
        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="animate-in fade-in zoom-in-95 absolute top-full right-0 z-20 mt-2 max-h-80 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl ring-1 ring-black/5 duration-100 md:w-80">
            <div className="border-b border-gray-100 bg-gray-50/50 p-2">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar enlace..."
                  className="w-full rounded-lg border border-gray-200 bg-white py-2 pr-3 pl-9 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto p-1">
              <button
                onClick={() => handleSelect(null)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-500">
                  <BarChart3 size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    Vista General
                  </span>
                  <span className="text-xs text-gray-500">
                    Todos los enlaces
                  </span>
                </div>
                {!activeCode && (
                  <Check className="ml-auto h-4 w-4 text-blue-600" />
                )}
              </button>

              <div className="my-1 border-t border-gray-100" />

              {filteredLinks.length === 0 ? (
                <p className="py-4 text-center text-xs text-gray-500">
                  No se encontraron enlaces
                </p>
              ) : (
                filteredLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleSelect(link.short_code)}
                    className={clsx(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                      activeCode === link.short_code
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <div className="flex-1 truncate">
                      <div className="truncate font-medium">
                        /{link.short_code}
                      </div>
                      <div className="truncate text-xs text-gray-400 opacity-80">
                        {link.original_url}
                      </div>
                    </div>
                    {activeCode === link.short_code && (
                      <Check className="h-4 w-4 shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
