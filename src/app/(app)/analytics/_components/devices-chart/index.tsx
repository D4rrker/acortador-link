'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Cell, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/src/components/ui/card';
import { Smartphone } from 'lucide-react';
import CenterLabel from '@/src/app/(app)/analytics/_components/devices-chart/center-label';
import DeviceLegend from '@/src/app/(app)/analytics/_components/devices-chart/device-legend';
import { getDeviceName } from '@/src/app/(app)/analytics/_helper/index';
import { COLORS } from '@/src/app/(app)/analytics/_const/index';
import type { MetricResult } from '@/src/types/index';

export default function DevicesChart({ data }: { data: MetricResult[] }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []); // Temporal. Cambiar más adelante.

  const totalClicks = React.useMemo(
    () => data.reduce((acc, curr) => acc + curr.value, 0),
    [data]
  );

  const hasData = isMounted && data.length > 0 && totalClicks > 0;

  return (
    <Card className="flex h-full flex-col shadow-sm">
      <CardHeader className="shrink-0 items-center pb-2">
        <CardTitle className="self-start text-base font-semibold text-gray-900 dark:text-gray-50">
          Dispositivos
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          Muestra los tipos de dispositivos que utilizan tus visitantes para
          acceder a los enlaces.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 items-center justify-center pb-6">
        {!isMounted ? (
          <div className="flex animate-pulse items-center justify-center">
            <div className="h-40 w-40 rounded-full bg-gray-100" />
          </div>
        ) : !hasData ? (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Smartphone className="h-8 w-8 opacity-20" />
            <span className="text-sm">No hay datos registrados</span>
          </div>
        ) : (
          <div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:justify-around">
            <div className="relative aspect-square h-50 w-50 shrink-0">
              <PieChart width={200} height={200}>
                <Tooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (active && payload?.[0]) {
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-lg border bg-white p-2 text-xs shadow-xl">
                          <span className="font-semibold text-gray-900">
                            {getDeviceName(d.name)}
                          </span>
                          <span className="dark:text-zinc-700">
                            : {d.value} clics
                          </span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={90}
                  strokeWidth={2}
                  stroke="#fff"
                  paddingAngle={2}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  <Label
                    content={({ viewBox }) => (
                      <CenterLabel viewBox={viewBox} total={totalClicks} />
                    )}
                  />
                </Pie>
              </PieChart>
            </div>

            <DeviceLegend data={data} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
