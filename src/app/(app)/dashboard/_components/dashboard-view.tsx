import LinksList from '@/src/app/(app)/dashboard/_components/links-list/index';
import GeoAnalysisView from '@/src/app/(app)/dashboard/_components/geo-analysis/index';
import CreateLinkForm from '@/src/app/(app)/dashboard/_components/create-link-form/index';
import { CountryData } from '@/src/app/(app)/dashboard/_hooks/useRealtimeGeo';

import type { ILinkData } from '@/src/app/(app)/dashboard/_types/types';

interface DashboardViewProps {
  links: ILinkData[];
  geoData: CountryData[];
}

export default function DashboardView({ links, geoData }: DashboardViewProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-6">
      <div className="flex shrink-0 flex-col gap-1 border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Crea, gestiona y analiza tus enlaces.
        </p>
      </div>

      <div className="flex h-auto w-full flex-col gap-6 xl:h-full xl:min-h-0 xl:flex-1">
        <div className="flex w-full shrink-0 flex-col gap-6 xl:flex-row">
          <div className="w-full flex-3">
            <CreateLinkForm />
          </div>
          <div className="w-full flex-2">
            <GeoAnalysisView initialData={geoData} />
          </div>
        </div>

        <div className="min-h-100 flex-1">
          <LinksList links={links || []} />
        </div>
      </div>
    </div>
  );
}
