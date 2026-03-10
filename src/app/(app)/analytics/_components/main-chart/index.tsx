'use client';

import { useState, useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Lock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/src/components/ui/chart';
import { RANGES } from '@/src/app/(app)/analytics/_const/index';
import { processChartData } from '@/src/app/(app)/analytics/_utils/chart-helpers';
import type { TimeRange } from '@/src/app/(app)/analytics/_const';
import type { ClickEvent } from '@/src/types';

const chartConfig = {
  clicks: {
    label: 'Clicks',
    color: 'var(--color-clicks-chart)',
  },
} satisfies ChartConfig;

interface MainChartProps {
  events: ClickEvent[];
  isPro: boolean;
}

export default function MainChart({ events, isPro }: MainChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');

  const chartData = useMemo(
    () => processChartData(events, timeRange, isPro),
    [events, timeRange, isPro]
  );

  return (
    <Card>
      <CardHeader className="flex shrink-0 justify-between">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle className="text-card-foreground font-semibold">
            Tendencia de Tráfico
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs">
            Mostrando resultados para el periodo seleccionado
          </CardDescription>
        </div>

        <div className="bg-muted/20 flex items-center gap-1 border-t px-4 sm:border-t-0 sm:border-l">
          {RANGES.map((range) => {
            const isLocked = !isPro && range.isPro;

            const ButtonElement = (
              <button
                disabled={isLocked}
                onClick={() => !isLocked && setTimeRange(range.value)}
                className={`relative flex items-center gap-1 rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  timeRange === range.value
                    ? 'bg-white text-gray-900 shadow-sm'
                    : isLocked
                      ? 'cursor-not-allowed text-gray-500 opacity-50'
                      : 'cursor-pointer text-gray-500 hover:text-gray-900'
                }`}
              >
                {range.label}
                {isLocked && <Lock size={10} className="text-gray-400" />}
              </button>
            );

            return <div key={range.value}>{ButtonElement}</div>;
          })}
        </div>
      </CardHeader>

      <CardContent className="-ml-8">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full p-4"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-clicks)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-clicks)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={5}
              allowDecimals={false}
              tickFormatter={(val) =>
                val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => value}
                />
              }
            />

            <Area
              dataKey="clicks"
              type="monotone"
              fill="url(#fillClicks)"
              fillOpacity={0.4}
              stroke="var(--color-clicks)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
