import ProfileSection from '@/src/app/(app)/settings/_components/profile-section/index';
import type { GetDataUser } from '@/src/app/(app)/settings/_types/index';

interface SettingsViewProps {
  userData: GetDataUser;
}

export default function SettingsView({ userData }: SettingsViewProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Configuración
        </h1>
        <p className="text-sm text-gray-500">
          Gestiona tus preferencias personales y de facturación
        </p>
      </div>

      <div className="space-y-6">
        <ProfileSection user={userData} />
      </div>
    </div>
  );
}
