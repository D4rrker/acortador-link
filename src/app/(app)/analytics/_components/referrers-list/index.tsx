'use client';

import Link from 'next/link';
import { Link as LinkIcon, Lock } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import ReferrerRow from '@/src/app/(app)/analytics/_components/referrers-list/referrer-row';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/src/components/ui/card';
import type { MetricResult } from '@/src/types';

interface ReferrersListProps {
  data: MetricResult[];
  isPro?: boolean;
}

export default function ReferrersList({
  data,
  isPro = false,
}: ReferrersListProps) {
  const LIMIT_FREE = 2;
  const visibleData = isPro ? data : data.slice(0, LIMIT_FREE);
  const hiddenCount = Math.max(0, data.length - LIMIT_FREE);

  return (
    <Card className="flex h-full flex-col shadow-sm">
      <CardHeader className="flex shrink-0 flex-col justify-between">
        <CardTitle className="text-card-foreground font-semibold">
          Fuentes de Tráfico
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs">
          Muestra los sitios web, redes sociales o aplicaciones desde donde
          provienen tus visitas.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="custom-scrollbar overflow-y-auto">
          <div className="space-y-4">
            {visibleData.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <LinkIcon className="text-muted-foreground/30 h-8 w-8" />
                <p className="text-muted-foreground text-sm">
                  No se han detectado fuentes externas.
                </p>
              </div>
            ) : (
              visibleData.map((item) => (
                <ReferrerRow key={item.name} item={item} />
              ))
            )}
          </div>
        </div>

        {!isPro && hiddenCount > 0 && (
          <div className="self-center text-center">
            <p className="text-muted-foreground mb-3 text-xs font-medium">
              +{' '}
              {hiddenCount === 1
                ? `${hiddenCount} fuente adicional oculta`
                : `${hiddenCount} fuentes adicionales ocultas`}
            </p>
            <Button asChild size="sm" className="gap-2 shadow-lg">
              <Link href="/dashboard/billing">
                <Lock size={12} />
                Ver todas las fuentes
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
