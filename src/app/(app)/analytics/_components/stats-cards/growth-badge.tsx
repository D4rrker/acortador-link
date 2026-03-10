import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

export default function GrowthBadge({ growth }: { growth: number }) {
  const isPositive = growth > 0;
  const isNeutral = growth === 0;

  const colorClass = isNeutral
    ? 'bg-gray-100 text-gray-600'
    : isPositive
      ? 'bg-green-50 text-green-600'
      : 'bg-red-50 text-red-600';

  const Icon = isNeutral ? Minus : isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colorClass}`}
      >
        <Icon size={12} />
        <span>{Math.abs(growth)}%</span>
      </span>
      <span className="text-xs text-gray-400">vs mes pasado</span>
    </div>
  );
}
