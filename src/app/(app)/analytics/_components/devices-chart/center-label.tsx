import { ViewBox } from 'recharts/types/util/types';

export default function CenterLabel({
  viewBox,
  total,
}: {
  viewBox?: ViewBox;
  total: number;
}) {
  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
    return (
      <text
        x={viewBox.cx}
        y={viewBox.cy}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x={viewBox.cx}
          y={viewBox.cy}
          className="fill-gray-900 text-2xl font-bold dark:fill-gray-50"
        >
          {total.toLocaleString()}
        </tspan>
        <tspan
          x={viewBox.cx}
          y={(viewBox.cy || 0) + 20}
          className="fill-gray-500 text-xs font-medium dark:fill-gray-300"
        >
          Clics
        </tspan>
      </text>
    );
  }
  return null;
}
