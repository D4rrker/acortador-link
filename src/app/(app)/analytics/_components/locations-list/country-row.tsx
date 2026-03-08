import { Globe } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { getCountryDisplayName } from '@/src/app/(app)/analytics/_helper/index';
import { COUNTRY_MAPPING } from '@/src/app/(app)/analytics/_const/index';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/src/components/ui/tooltip';
import type { MetricResult } from '@/src/types';

export default function CountryRow({ item }: { item: MetricResult }) {
  const [imgError, setImgError] = useState(false);

  const originalName = item.name;
  const isUnknown = ['XX', 'Desconocido', 'Unknown'].includes(originalName);

  const flagCode = (
    COUNTRY_MAPPING[originalName] || originalName
  ).toLowerCase();

  const displayName = isUnknown
    ? 'Desconocido'
    : getCountryDisplayName(flagCode, originalName);

  const showFlag = !isUnknown && !imgError && flagCode.length === 2;

  return (
    <div className="group w-full">
      <div className="mb-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 overflow-hidden">
          {showFlag ? (
            <Image
              src={`https://flagcdn.com/${flagCode}.svg`}
              alt={flagCode}
              title={displayName}
              width={20}
              height={16}
              className="h-4 w-5 shrink-0 rounded-[2px] object-cover shadow-sm"
              onError={() => setImgError(true)}
            />
          ) : (
            <Globe className="text-muted-foreground/50 h-4 w-4 shrink-0" />
          )}

          <span
            className="text-foreground truncate font-medium"
            title={displayName}
          >
            {displayName}
          </span>
        </div>

        <div className="flex items-center gap-3 tabular-nums">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-foreground font-semibold">
                {item.value.toLocaleString()}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total de clics en este país</p>
            </TooltipContent>
          </Tooltip>

          <span className="text-muted-foreground w-8 text-right text-xs">
            {item.percent}%
          </span>
        </div>
      </div>

      <div className="bg-secondary/50 h-2 w-full overflow-hidden rounded-full">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out group-hover:bg-blue-700"
          style={{ width: `${item.percent}%` }}
        />
      </div>
    </div>
  );
}
