'use client';

import Header from '@/src/app/(app)/settings/_components/preferences-section/header-preferences';
import ContentPreferences from '@/src/app/(app)/settings/_components/preferences-section/content-preferences';
import { useTheme } from 'next-themes';
import { themes } from '@/src/app/(app)/settings/_const/index';

export default function PreferencesSection() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="rounded-xl border bg-white shadow-sm dark:bg-zinc-950">
      <Header />
      <div className="p-6">
        <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-gray-300">
          Tema de la interfaz
        </h3>

        <ContentPreferences themes={themes} setTheme={setTheme} theme={theme} />
      </div>
    </div>
  );
}
