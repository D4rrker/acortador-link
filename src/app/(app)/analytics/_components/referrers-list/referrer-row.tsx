import { useState } from 'react';
import Image from 'next/image';
import { Globe, LinkIcon } from 'lucide-react';
import {
  getDomain,
  getFaviconUrl,
} from '@/src/app/(app)/analytics/_helper/index';
import { MetricResult } from '@/src/types';
export default function ReferrerRow({ item }: { item: MetricResult }) {
  const [imgError, setImgError] = useState(false);
  const domain = getDomain(item.name);
  const showIcon = domain && !imgError;

  return (
    <div className="group flex items-center justify-between py-1">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="border-border bg-muted/40 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border p-1.5 transition-colors group-hover:border-blue-200 group-hover:bg-blue-50 dark:group-hover:bg-transparent">
          {showIcon ? (
            <Image
              src={getFaviconUrl(domain)}
              alt={item.name}
              width={24}
              height={24}
              className="h-full w-full object-contain opacity-90"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : item.name === 'Directo' ? (
            <LinkIcon size={14} className="text-muted-foreground/60" />
          ) : (
            <Globe size={14} className="text-muted-foreground/60" />
          )}
        </div>

        <span
          className="text-foreground truncate text-sm font-medium"
          title={item.name}
        >
          {item.name}
        </span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-foreground text-sm font-bold tabular-nums">
          {item.value.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
