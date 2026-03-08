import { type LucideIcon, LinkIcon, BarChart3, Lock, Copy } from 'lucide-react';

export interface Advantage {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const advantage: Advantage[] = [
  {
    icon: LinkIcon,
    title: 'Enlaces cortos personalizados',
    description: 'Crea slugs memorables para tus marcas y campañas.',
  },
  {
    icon: BarChart3,
    title: 'Estadísticas de clics',
    description: 'País, dispositivo, hora y más datos clave en tiempo real.',
  },
  {
    icon: Lock,
    title: 'Dashboard privado',
    description: 'Todo tu historial y métricas solo para ti, 100% seguro.',
  },
  {
    icon: Copy,
    title: 'Copiar al instante',
    description:
      'Copia tu enlace corto con un clic y compártelo donde quieras.',
  },
];
