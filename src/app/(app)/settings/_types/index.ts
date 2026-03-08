import { LucideIcon } from 'lucide-react';

export type GetDataUser = {
  name: string;
  hiddenEmail: string;
  timezone: string;
  success: boolean;
};

export type ThemeList = 'light' | 'dark' | 'system';

export type ConstBtnTheme = {
  Icon: LucideIcon;
  themeLocal: ThemeList;
  name: string;
  defaultBg: string;
};

export interface BtnTheme {
  theme: string | undefined;
  setTheme: (option: ThemeList) => void;
  data: ConstBtnTheme;
}
