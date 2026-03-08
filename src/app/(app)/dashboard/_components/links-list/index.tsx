'use client';

import { useState } from 'react';
import { useRealtimeLinks } from '@/src/app/(app)/dashboard/_hooks/useLinks';
import { LinkRow } from '@/src/app/(app)/dashboard/_components/links-list/link-row';
import { Pagination } from '@/src/app/(app)/dashboard/_components/links-list/pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { useUser } from '@/src/context/UserContext';
import type { ILinkData } from '@/src/app/(app)/dashboard/_types/types';

const ITEMS_PER_PAGE = 4;

export default function LinksList({
  links: serverLinks,
}: {
  links: ILinkData[];
}) {
  const { user } = useUser();

  const { plan } = user || {};

  const { links } = useRealtimeLinks(serverLinks, plan);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(links.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentLinks = links.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1));

  if (!links.length) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500 dark:text-gray-300">
        No tienes enlaces creados aún.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between space-y-4">
      <div className="bg-card overflow-hidden rounded-2xl border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-muted-foreground px-6 py-3 font-medium">
                Enlace
              </TableHead>
              <TableHead className="text-muted-foreground hidden px-6 py-3 font-medium md:table-cell">
                Destino
              </TableHead>
              <TableHead className="text-muted-foreground px-6 py-3 text-center font-medium">
                Clics
              </TableHead>
              <TableHead className="text-muted-foreground px-6 py-3 text-right font-medium">
                Creado
              </TableHead>
              <TableHead className="text-muted-foreground px-6 py-3 text-right font-medium"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLinks.map((link) => (
              <LinkRow key={link.id} link={link} />
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalLinks={links.length}
        onNext={goToNext}
        onPrev={goToPrev}
      />
    </div>
  );
}
