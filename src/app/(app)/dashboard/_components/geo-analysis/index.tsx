'use client';

import { ExternalLink, Globe } from 'lucide-react';
import Link from 'next/link';
import {
  useRealtimeGeo,
  type CountryData,
} from '@/src/app/(app)/dashboard/_hooks/useRealtimeGeo';
import { CountryRow } from '@/src/app/(app)//dashboard/_components/geo-analysis/country-row';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { useUser } from '@/src/context/UserContext';

interface Props {
  initialData: CountryData[];
}

export default function GeoAnalysisView({ initialData }: Props) {
  const { user } = useUser();

  const { plan } = user || {};

  const { data } = useRealtimeGeo(initialData, plan);

  const totalCount = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-900">
            Top países con más clics
          </CardTitle>
          <Globe size={16} className="text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="space-y-6">
            {data.length > 0 ? (
              data.map((item) => (
                <CountryRow
                  key={item.country_code}
                  item={item}
                  totalCount={totalCount}
                />
              ))
            ) : (
              <p className="text-muted-foreground text-center text-sm">
                No hay datos para mostrar aún.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-gray-100 pt-4">
          <Link
            href="/analytics"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            Ver reporte completo
            <ExternalLink size={10} />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
