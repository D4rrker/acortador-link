import {
  getUserLinks,
  getGeoEvents,
} from '@/src/app/(app)/dashboard/_lib/queries';
import { processGeoData } from '@/src/app/(app)/dashboard/_utils/geo-helpers';
import DashboardView from '@/src/app/(app)/dashboard/_components/dashboard-view';

export default async function DashboardPage() {
  const links = await getUserLinks();

  const linkIds = links.map((link) => link.id);

  const rawGeoEvents = await getGeoEvents(linkIds);

  const geoData = processGeoData(rawGeoEvents);

  return <DashboardView links={links || []} geoData={geoData} />;
}
