import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalLinks: number;
  onNext: () => void;
  onPrev: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalLinks,
  onNext,
  onPrev,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between pb-6">
      <p className="text-sm text-gray-500">
        Página <span className="font-medium">{currentPage}</span> de{' '}
        <span className="font-medium">{totalPages}</span>
        {' - '} Enlaces creados:{' '}
        <span className="font-medium">{totalLinks} </span>
      </p>

      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft size={14} /> Anterior
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Siguiente <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
