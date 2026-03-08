'use client';

import Link from 'next/link';
import { Globe, Lock } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import CountryRow from '@/src/app/(app)/analytics/_components/locations-list/country-row';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/src/components/ui/card';
import { COUNTRY_LIMIT_FREE } from '@/src/const';
import type { MetricResult } from '@/src/types/index';

interface LocationsListProps {
  data: MetricResult[];
  isPro?: boolean;
}

export default function LocationsList({
  data,
  isPro = false,
}: LocationsListProps) {
  const showData = isPro ? data : data.slice(0, COUNTRY_LIMIT_FREE);
  const hiddenCount = Math.max(0, data.length - COUNTRY_LIMIT_FREE);

  return (
    <Card className="flex h-full flex-col shadow-sm">
      <CardHeader className="flex shrink-0 flex-col justify-between">
        <CardTitle className="text-card-foreground font-semibold">
          Top Países
        </CardTitle>
        <CardDescription className="text-muted-foreground mt-1 text-xs">
          Muestra las ubicaciones geográficas desde donde se ha accedido a tus
          enlaces.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex h-full flex-col justify-between">
        <div className="custom-scrollbar -mr-2 overflow-y-auto pr-2">
          <div className="space-y-6">
            {showData.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center gap-2 text-center">
                <Globe className="text-muted-foreground/30 h-8 w-8" />
                <p className="text-muted-foreground text-sm">
                  Aún no hay datos de ubicación
                </p>
              </div>
            ) : (
              showData.map((item) => <CountryRow key={item.name} item={item} />)
            )}
          </div>
        </div>

        {!isPro && hiddenCount > 0 && (
          <div className="self-center text-center">
            <p className="text-muted-foreground mb-3 text-xs font-medium">
              +{' '}
              {hiddenCount === 1
                ? `${hiddenCount} país adicional oculto`
                : `${hiddenCount} países adicionales ocultos`}
            </p>
            <Button asChild size="sm" className="gap-2 shadow-lg">
              <Link href="/dashboard/billing">
                <Lock size={14} />
                Ver todos los países
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
