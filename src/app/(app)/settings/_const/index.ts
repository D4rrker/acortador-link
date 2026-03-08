import type {
  ConstBtnTheme,
  ThemeList,
} from '@/src/app/(app)/settings/_types/index';
import { Sun, Moon, Monitor } from 'lucide-react';

export const themeList: ConstBtnTheme[] = [
  { themeLocal: 'light', Icon: Sun, name: 'Claro', defaultBg: 'bg-gray-50' },
  { themeLocal: 'dark', Icon: Moon, name: 'Oscuro', defaultBg: 'bg-gray-700' },
  {
    themeLocal: 'system',
    Icon: Monitor,
    name: 'Sistema',
    defaultBg: 'bg-zinc-900',
  },
];

export const themes: ThemeList[] = ['light', 'dark', 'system'];
