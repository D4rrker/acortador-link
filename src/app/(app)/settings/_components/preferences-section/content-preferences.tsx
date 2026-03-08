'use client';

import ButtonTheme from '@/src/app/(app)/settings/_components/preferences-section/button-theme';
import { themeList } from '@/src/app/(app)/settings/_const/index';
import type { UseThemeProps } from 'next-themes';

export default function ContentPreferences({ theme, setTheme }: UseThemeProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {themeList.map((e) => (
        <ButtonTheme
          key={e.themeLocal}
          setTheme={setTheme}
          theme={theme}
          data={e}
        />
      ))}
    </div>
  );
}
