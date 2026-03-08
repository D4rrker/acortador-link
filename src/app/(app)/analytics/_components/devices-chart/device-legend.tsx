import { getDeviceName } from '@/src/app/(app)/analytics/_helper/index';
import { COLORS } from '@/src/app/(app)/analytics/_const/index';
import type { MetricResult } from '@/src/types/index';

export default function DeviceLegend({ data }: { data: MetricResult[] }) {
  return (
    <div className="flex min-w-32.5 flex-col gap-3">
      {data.map((item, index) => (
        <div
          key={item.name}
          className="flex items-center justify-between text-sm"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-full shadow-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span
              className="truncate text-gray-700 dark:text-gray-50"
              title={getDeviceName(item.name)}
            >
              {getDeviceName(item.name)}
            </span>
          </div>
          <span className="ml-2 font-bold text-gray-900 tabular-nums dark:text-gray-100">
            {item.percent}%
          </span>
        </div>
      ))}
    </div>
  );
}
