import ProfileForm from '@/src/app/(app)/settings/_components/profile-section/profile-form';
import PasswordForm from '@/src/app/(app)/settings/_components/profile-section/password-form';
import DeleteAccountForm from '@/src/app/(app)/settings/_components/profile-section/delete-account-form';
import type { GetDataUser } from '@/src/app/(app)/settings/_types/index';

interface ProfileSectionProps {
  user: GetDataUser;
}

export default function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Perfil</h2>
          <p className="text-sm text-gray-500">
            Administra tu información personal y preferencias.
          </p>
        </div>
        <ProfileForm
          initialName={user.name}
          initialEmail={user.hiddenEmail}
          initialTimezone={user.timezone}
        />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Seguridad</h2>
          <p className="text-sm text-gray-500">
            Actualiza tu contraseña para mantener tu cuenta segura.
          </p>
        </div>
        <PasswordForm />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Zona de Peligro
          </h2>
          <p className="text-sm text-gray-500">
            Elimina tu cuenta y todos los enlaces asociados de forma permanente.
          </p>
        </div>
        <DeleteAccountForm />
      </section>
    </div>
  );
}
