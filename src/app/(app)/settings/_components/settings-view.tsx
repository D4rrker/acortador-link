// import ProfileSection from '@/src/app/(app)/settings/_components/profile-section/index';
import BillingSection from '@/src/app/(app)/settings/_components/billing-section/index';
// import PreferencesSection from '@/src/app/(app)/settings/_components/preferences-section';

export default function SettingsView() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Configuración
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Gestiona tus preferencias personales y de facturación
        </p>
      </div>

      <div className="space-y-6">
        {/* <ProfileSection /> */}
        <BillingSection />
        {/* <PreferencesSection /> */}
      </div>
    </div>
  );
}
