import {
  type LucideIcon,
  PanelLeft,
  Settings,
  ChartNoAxesCombined,
} from 'lucide-react';

export interface Path {
  name: string;
  path: string;
  title: string;
  icon: LucideIcon;
}

export const paths: Path[] = [
  {
    name: 'dashboard',
    path: '/dashboard',
    title: 'Mis Enlaces',
    icon: PanelLeft,
  },
  {
    name: 'analytics',
    path: '/analytics',
    title: 'Estadísticas',
    icon: ChartNoAxesCombined,
  },
  {
    name: 'settings',
    path: '/settings',
    title: 'Configuración',
    icon: Settings,
  },
];
