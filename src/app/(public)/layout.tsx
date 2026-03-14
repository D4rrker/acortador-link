import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/src/app/globals.css';
import Header from '@/src/app/(public)/(landing)/header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Acortador de Enlaces Gratis y Analíticas en Tiempo Real',
  description:
    'Acorta tus links gratis y obtén estadísticas detalladas. Regístrate en LinkPro para gestionar tus URLs en tiempo real.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.variable} bg-gray-100 antialiased`}>
      <Header />
      {children}
    </div>
  );
}
