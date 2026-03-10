import Image from 'next/image';
import { MousePointer2, Globe, Smartphone, Clock } from 'lucide-react';
import AnalyticsCard from '@/src/app/(app)/analytics/_components/stats-cards/analytics-card';
import GrowthBadge from '@/src/app/(app)/analytics/_components/stats-cards/growth-badge';
import type { AnalyticsStats } from '@/src/app/(app)/analytics/_types/index';
import { useState } from 'react';

function CountryFlag({ code }: { code: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError || code === 'XX') {
    return <Globe className="h-3 w-4 text-gray-400" />;
  }

  return (
    <Image
      width={16}
      height={12}
      src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
      alt={code}
      className="h-3 w-4 object-cover"
      onError={() => setImgError(true)}
    />
  );
}

interface StatsCardsProps {
  stats: AnalyticsStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AnalyticsCard
        title="TOTAL CLICS"
        value={stats.totalClicks.toLocaleString()}
        icon={<MousePointer2 size={18} className="text-blue-500" />}
        subtext={<GrowthBadge growth={stats.growth} />}
      />

      <AnalyticsCard
        title="TOP PAÍS"
        value={stats.topCountry?.name || '-'}
        icon={<Globe size={18} className="text-gray-400" />}
        subtext={
          stats.topCountry ? (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CountryFlag
                key={stats.topCountry.code}
                code={stats.topCountry.code}
              />
              <span>{stats.topCountry.percent}% del tráfico</span>
            </div>
          ) : (
            <span className="text-xs text-gray-400">Sin datos suficientes</span>
          )
        }
      />

      <AnalyticsCard
        title="TOP DISPOSITIVO"
        value={stats.topDevice?.name || '-'}
        icon={<Smartphone size={18} className="text-gray-400" />}
        subtext={
          stats.topDevice ? (
            <span className="text-xs text-gray-500">
              {stats.topDevice.percent}% usa{' '}
              <span className="lowercase">{stats.topDevice.name}</span>
            </span>
          ) : null
        }
      />

      <AnalyticsCard
        title="ÚLTIMO CLIC"
        value={stats.latestClick || '-'}
        icon={<Clock size={18} className="text-gray-400" />}
        subtext={
          <span className="text-xs text-gray-400">
            {stats.latestClick
              ? 'Recién actualizado'
              : 'Sin actividad reciente'}
          </span>
        }
      />
    </div>
  );
}
