import Image from 'next/image';
import { HelpCircle } from 'lucide-react';
import { getFlagUrl, isUnknownCountry } from '../../_utils/geo-helpers';
import type { CountryData } from '@/src/hooks/useRealtimeGeo';

interface CountryRowProps {
  item: CountryData;
  totalCount: number;
}

export function CountryRow({ item, totalCount }: CountryRowProps) {
  const percentage = Math.round((item.count / totalCount) * 100) || 0;
  const isUnknown = isUnknownCountry(item.country_code);

  return (
    <div className="group">
      <div className="mb-2 flex items-end justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-8 shrink-0 items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-100">
            {isUnknown ? (
              <HelpCircle size={14} className="text-gray-400" />
            ) : (
              <Image
                width={32}
                height={32}
                src={getFlagUrl(item.country_code)}
                alt={`Bandera de ${item.country_name}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )}
          </div>

          <span className="max-w-30 truncate text-sm font-medium text-gray-700">
            {item.country_name}
          </span>
        </div>

        <span className="animate-in zoom-in text-sm font-bold text-gray-900 duration-300">
          {item.count}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out group-hover:bg-blue-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
