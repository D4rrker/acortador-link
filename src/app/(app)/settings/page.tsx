import SettingsView from '@/src/app/(app)/settings/_components/settings-view';
import { getDataUser } from '@/src/app/(app)/settings/_lib/queries';

export default async function SettingsPage() {
  const userData = await getDataUser();

  return <SettingsView userData={userData} />;
}
