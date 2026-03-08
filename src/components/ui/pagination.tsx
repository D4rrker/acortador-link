import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
}

export function Pagination({
  currentPage,
  totalCount,
  itemsPerPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalCount);

  if (totalCount === 0) return null;

  return (
    <div className="flex w-full items-center justify-between pb-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{start}</span> a{' '}
            <span className="font-medium">{end}</span> de{' '}
            <span className="font-medium">{totalCount}</span> resultados
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              href={`?page=${currentPage - 1}`}
              className={clsx(
                'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                !hasPrev && 'pointer-events-none opacity-50'
              )}
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href={`?page=${currentPage + 1}`}
              className={clsx(
                'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                !hasNext && 'pointer-events-none opacity-50'
              )}
            >
              <span className="sr-only">Siguiente</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
