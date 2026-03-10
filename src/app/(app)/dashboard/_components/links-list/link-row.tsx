import Image from 'next/image';
import { ExternalLink, BarChart2, Calendar } from 'lucide-react';
import { CopyButton } from '@/src/components/ui/copy-button';
import {
  getFaviconUrl,
  getShortUrl,
} from '@/src/app/(app)/dashboard/_utils/url-helpers';
import { TableRow, TableCell } from '@/src/components/ui/table';
import type { ILinkData } from '@/src/app/(app)/dashboard/_types/types';

export function LinkRow({ link }: { link: ILinkData }) {
  const shortUrl = getShortUrl(link.short_code);
  const favicon = getFaviconUrl(link.original_url);

  return (
    <TableRow className="group transition-colors">
      <TableCell className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full border border-gray-100 bg-white p-1.5 shadow-sm">
            <Image
              width={48}
              height={48}
              src={favicon}
              alt="icon"
              className="h-full w-full rounded-full object-contain opacity-90"
            />
          </div>
          <div className="flex flex-col">
            <a
              href={shortUrl}
              target="_blank"
              className="flex items-center gap-1 text-sm font-semibold text-gray-900 transition-colors hover:text-blue-600"
            >
              /{link.short_code}
              <ExternalLink
                size={10}
                className="opacity-0 group-hover:opacity-100"
              />
            </a>
            <span className="text-xs text-gray-400">linkpro.com</span>
          </div>
        </div>
      </TableCell>

      <TableCell className="hidden px-6 py-4 md:table-cell">
        <div className="max-w-xs truncate text-sm text-gray-500">
          {link.original_url}
        </div>
      </TableCell>

      <TableCell className="px-6 py-4 text-center text-sm font-medium">
        <div className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
          <BarChart2 size={12} /> {link.clicks}
        </div>
      </TableCell>

      <TableCell className="px-6 py-4 text-right text-xs text-gray-400">
        <div className="flex items-center justify-end gap-x-1">
          <Calendar size={12} />
          {new Date(link.created_at).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
          })}
        </div>
      </TableCell>

      <TableCell className="px-6 py-4 text-right">
        <CopyButton text={shortUrl} />
      </TableCell>
    </TableRow>
  );
}
